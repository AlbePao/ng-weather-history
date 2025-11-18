import { booleanAttribute, Directive, InjectionToken, input } from '@angular/core';

export const APP_SUFFIX = new InjectionToken<SuffixDirective>('SuffixDirective');

@Directive({
  selector: '[appSuffix], [appIconSuffix], [appTextSuffix]',
  providers: [{ provide: APP_SUFFIX, useExisting: SuffixDirective }],
})
export class SuffixDirective {
  readonly isText = input(false, { alias: 'appTextSuffix', transform: booleanAttribute });
}
