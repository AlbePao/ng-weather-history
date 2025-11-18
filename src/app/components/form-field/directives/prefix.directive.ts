import { booleanAttribute, Directive, InjectionToken, input } from '@angular/core';

export const APP_PREFIX = new InjectionToken<PrefixDirective>('PrefixDirective');

@Directive({
  selector: '[appPrefix], [appIconPrefix], [appTextPrefix]',
  providers: [{ provide: APP_PREFIX, useExisting: PrefixDirective }],
})
export class PrefixDirective {
  readonly isText = input(false, { alias: 'appTextPrefix', transform: booleanAttribute });
}
