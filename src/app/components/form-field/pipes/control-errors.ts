import { MAX_DATE_TODAY } from '@validators/date-validators';

export type ControlErrors =
  | 'required'
  | 'pattern'
  | 'email'
  | 'minlength'
  | 'maxlength'
  | 'min'
  | 'max'
  | typeof MAX_DATE_TODAY;
