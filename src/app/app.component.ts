import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '@components/button';
import { CardComponent } from '@components/card';
import { FormFieldModule } from '@components/form-field';
import { InputDirective } from '@components/input';
import { ToastService } from '@components/toast';
import { COUNTRY_CODES } from '@constants/country-codes';

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule, CardComponent, FormFieldModule, InputDirective, ButtonComponent],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private readonly _fb = inject(FormBuilder);
  private readonly _toastService = inject(ToastService);

  protected readonly countryCodes = COUNTRY_CODES;

  form = this._fb.group({
    address: this._fb.control<string>('', Validators.required),
    city: this._fb.control<string>('', Validators.required),
    countryCode: this._fb.control<string>('', Validators.required),
  });

  submit(): void {
    if (!this.form.valid) {
      this._toastService.show({
        color: 'danger',
        message: 'Please, fill the required fields',
        icon: 'warning',
      });
      return;
    }
  }
}
