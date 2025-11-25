import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '@components/button';
import { CardComponent } from '@components/card';
import { DownloadWeatherHistoryComponent } from '@components/download-weather-history';
import { FormFieldModule } from '@components/form-field';
import { InputDirective } from '@components/input';
import { SpinnerComponent } from '@components/spinner';
import { ToastService } from '@components/toast';
import { WeatherHistoryChartsComponent } from '@components/weather-history-charts';
import { COUNTRY_CODES } from '@constants/country-codes';
import { GeocodingDataParams } from '@interfaces/geocoding';
import { GeocodingService } from '@services/geocoding.service';
import { WeatherHistoryService } from '@services/weather-history.service';
import { DateValidators } from '@validators/date-validators';
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
    WeatherHistoryChartsComponent,
    DownloadWeatherHistoryComponent,
  ],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'flex grow flex-col',
  },
})
export class AppComponent {
  private readonly _fb = inject(FormBuilder);
  private readonly _toastService = inject(ToastService);
  private readonly _geocodingService = inject(GeocodingService);
  private readonly _weatherHistoryService = inject(WeatherHistoryService);

  protected readonly countryCodes = COUNTRY_CODES;

  form = this._fb.group(
    {
      address: this._fb.nonNullable.control<string>('', Validators.required),
      city: this._fb.nonNullable.control<string>('', Validators.required),
      countryCode: this._fb.nonNullable.control<string>('', Validators.required),
      startDate: this._fb.nonNullable.control<string>('', Validators.required),
      endDate: this._fb.nonNullable.control<string>('', [Validators.required, DateValidators.maxDateToday]),
    },
    {
      validators: [DateValidators.startDateBeforeEndDate()],
    },
  );

  get currentYear(): string | null {
    const { startDate, endDate } = this.form.getRawValue();

    if (!this.form.valid || !startDate || !endDate) {
      return null;
    }

    const startYear = new Date(startDate).getFullYear().toString();
    const endYear = new Date(endDate).getFullYear().toString();

    // Result is the same year if start and end date are in the same year, otherwise return end year
    return startYear === endYear ? startYear : endYear;
  }

  private readonly _submitHandler$ = new Subject<GeocodingDataParams>();

  geocodingCoordinates$ = this._submitHandler$.pipe(
    switchMap((params) =>
      this._geocodingService.getCoordinatesFromAddress(params).pipe(
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
              message: 'There was an error fetching address coordinates, try again',
              icon: 'warning',
            }),
        }),
        // Even on error, we want to continue the stream with a null value to prevent breaking the chain and allow weatherHistoryData$ to handle the null case
        catchError(() => of(null)),
      ),
    ),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  weatherHistoryData$ = this.geocodingCoordinates$.pipe(
    switchMap((coords) => {
      if (coords) {
        const { lat, lng } = coords;
        const { startDate, endDate } = this.form.getRawValue();

        return this._weatherHistoryService
          .getWeatherHistoryData({ latitude: lat, longitude: lng, start_date: startDate, end_date: endDate })
          .pipe(
            tap({
              error: () =>
                this._toastService.show({
                  color: 'danger',
                  message: 'There was an error fetching weather history data, try again',
                  icon: 'warning',
                }),
            }),
            // Even on error, we want to continue the stream with a null value to prevent breaking the chain and allow the UI to handle the null case by hiding the loading spinner
            catchError(() => of(null)),
          );
      }

      // If coords is null, return an observable emitting null to indicate no data to allow the UI to hide the loading spinner
      return of(null);
    }),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  isLoading$ = merge(
    // When user clicks on search button, map the emission to true to show the spinner
    this._submitHandler$.pipe(map(() => true)),
    // When weatherHistoryData$ emits a value, map it to false to hide the spinner
    this.weatherHistoryData$.pipe(map(() => false)),
  );

  submit(): void {
    if (!this.form.valid) {
      // Form is invalid, show error toast and prevent submission
      this._toastService.show({
        color: 'danger',
        message: 'Please, fix invalid form fields',
        icon: 'warning',
      });
      return;
    }

    // We use form.getRawValue() instead of form.value because the latter show type errors because FormBuilder wraps form controls keys inside a Partial utility type
    this._submitHandler$.next({
      address: this.form.getRawValue().address,
      city: this.form.getRawValue().city,
      countrycode: this.form.getRawValue().countryCode,
    });
  }
}
