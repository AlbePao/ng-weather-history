import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export const START_DATE_BEFORE_END_DATE = 'startDateBeforeEndDate';
export const MAX_DATE_TODAY = 'maxDateToday';

type DateRange = Record<'startDate' | 'endDate', AbstractControl<string | null>>;

export class DateValidators {
  /**
   * Validates that startDate is before endDate in a FormGroup.
   * @returns A ValidatorFn for use with FormGroup validators option.
   * @example
   * new FormGroup(
   *   { startDate: new FormControl(''), endDate: new FormControl('') },
   *   { validators: [DateValidators.startDateBeforeEndDate()] }
   * )
   */
  static startDateBeforeEndDate(): ValidatorFn {
    return (control: AbstractControl<DateRange>): ValidationErrors | null => {
      if (!(control instanceof FormGroup)) {
        return null;
      }

      const group = control as FormGroup<DateRange>;
      const startDate = group.controls.startDate.value;
      const endDate = group.controls.endDate.value;

      if (!startDate || !endDate) {
        return null;
      }

      const start = new Date(startDate);
      const end = new Date(endDate);

      if (start > end) {
        // Set error on endDate control as well for easier access in templates
        group.controls.endDate.setErrors({ [START_DATE_BEFORE_END_DATE]: true });

        // Return error for the FormGroup
        return { [START_DATE_BEFORE_END_DATE]: true };
      }

      return null;
    };
  }

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
