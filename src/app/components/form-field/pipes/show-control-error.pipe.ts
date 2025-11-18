import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl, NgModel } from '@angular/forms';
import { isArray } from '@utils/isArray';
import { ControlErrors } from './control-errors';

@Pipe({
  name: 'showControlError',
  pure: false,
})
export class ShowControlErrorPipe implements PipeTransform {
  transform(control: AbstractControl | NgModel, errorTypes: ControlErrors | ControlErrors[]): boolean {
    const hasErrors = !!(control.dirty ?? control.touched) && !!control.errors;
    const hasOneOrMoreErrors = isArray(errorTypes)
      ? errorTypes.some((error) => !!control.errors?.[error])
      : !!control.errors?.[errorTypes];

    return hasErrors && hasOneOrMoreErrors;
  }
}
