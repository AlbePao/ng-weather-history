import { Directive, InjectionToken } from '@angular/core';

export const APP_LABEL = new InjectionToken<LabelDirective>('LabelDirective');

@Directive({
  selector: 'app-label, [appLabel]',
  providers: [{ provide: APP_LABEL, useExisting: LabelDirective }],
})
export class LabelDirective {}
