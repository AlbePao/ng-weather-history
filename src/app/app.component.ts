import { AsyncPipe, JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '@components/button';
import { CardComponent } from '@components/card';
import { FormFieldModule } from '@components/form-field';
import { InputDirective } from '@components/input';
import { SpinnerComponent } from '@components/spinner';
import { ToastService } from '@components/toast';
import { COUNTRY_CODES } from '@constants/country-codes';
import { GeocodingDataParams } from '@interfaces/geocoding';
import { GeocodingService } from '@services/geocoding.service';
import { catchError, map, merge, of, shareReplay, Subject, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [
    ReactiveFormsModule,
    AsyncPipe,
    SpinnerComponent,
    CardComponent,
    FormFieldModule,
    InputDirective,
    ButtonComponent,
    JsonPipe,
  ],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private readonly _fb = inject(FormBuilder);
  private readonly _toastService = inject(ToastService);
  private readonly _geoCodingService = inject(GeocodingService);

  protected readonly countryCodes = COUNTRY_CODES;

  form = this._fb.group({
    address: this._fb.nonNullable.control<string>('', Validators.required),
    city: this._fb.nonNullable.control<string>('', Validators.required),
    countrycode: this._fb.nonNullable.control<string>('', Validators.required),
  });

  private readonly _submitHandler$ = new Subject<GeocodingDataParams>();

  geocodingCoordinates$ = this._submitHandler$.pipe(
    switchMap((params) =>
      this._geoCodingService.getCoordinatesFromAddress(params).pipe(
        tap({
          next: (coords) => {
            if (!coords) {
              this._toastService.show({
                color: 'info',
                message: 'No location were found with the information you provided',
              });
            }
          },
          error: () =>
            this._toastService.show({
              color: 'danger',
              message: 'There was an error with your request, try again',
              icon: 'warning',
            }),
        }),
        catchError(() => of(null)),
      ),
    ),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  isLoading$ = merge(
    // When user clicks on search button, map the emission to true to show the spinner
    this._submitHandler$.pipe(map(() => true)),
    // When geocodingCoordinates$ emits a value, map it to false to hide the spinner
    this.geocodingCoordinates$.pipe(map(() => false)),
  );

  submit(): void {
    if (!this.form.valid) {
      this._toastService.show({
        color: 'danger',
        message: 'Please, fill the required fields',
        icon: 'warning',
      });
      return;
    }

    // We use form.getRawValue() instead of form.value because the latter show type errors because FormBuilder wraps form controls keys inside a Partial
    this._submitHandler$.next(this.form.getRawValue());
  }
}
