import { AbstractControl, ValidationErrors } from '@angular/forms';

export const MAX_DATE_TODAY = 'maxDateToday';

export class DateValidators {
  static maxDateToday(control: AbstractControl<string | null>): ValidationErrors | null {
    if (!control.value) {
      return null;
    }

    const inputDate = new Date(control.value);
    const today = new Date();

    if (inputDate > today) {
      return { [MAX_DATE_TODAY]: { value: control.value } };
    }

    return null;
  }
}
