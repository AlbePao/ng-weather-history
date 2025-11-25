import { MAX_DATE_TODAY, START_DATE_BEFORE_END_DATE } from '@validators/date-validators';

export type ControlErrors =
  | 'required'
  | 'pattern'
  | 'email'
  | 'minlength'
  | 'maxlength'
  | 'min'
  | 'max'
  | typeof START_DATE_BEFORE_END_DATE
  | typeof MAX_DATE_TODAY;
