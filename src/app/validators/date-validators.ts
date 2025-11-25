import { AbstractControl, ValidationErrors } from '@angular/forms';

export const MAX_DATE_TODAY = 'maxDateToday';

export class DateValidators {
  /**
   * Validates that a date value is not in the future (must be today or earlier).
   * @param control - The form control to validate
   * @returns Validation errors or null
   * @example
   * new FormControl('', [Validators.required, DateValidators.maxDateToday])
   */
  static maxDateToday(control: AbstractControl<string | null>): ValidationErrors | null {
    if (!control.value) {
      return null;
    }

    const inputDate = new Date(control.value);
    const today = new Date();

    // Reset time to compare only dates
    today.setHours(0, 0, 0, 0);
    inputDate.setHours(0, 0, 0, 0);

    if (inputDate > today) {
      return { [MAX_DATE_TODAY]: true };
    }

    return null;
  }
}
