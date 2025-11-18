import { Directive, InjectionToken } from '@angular/core';

export const APP_ERROR = new InjectionToken<ErrorDirective>('ErrorDirective');

@Directive({
  selector: 'app-error, [appError]',
  providers: [{ provide: APP_ERROR, useExisting: ErrorDirective }],
  host: {
    class: 'text-danger',
  },
})
export class ErrorDirective {}
