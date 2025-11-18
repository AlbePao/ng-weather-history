import { Directive, ElementRef, booleanAttribute, inject, input } from '@angular/core';

export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';

@Directive({
  host: {
    class: 'focus:ring-primary/40 focus:ring-4 focus:ring-offset-0 focus:outline-0',
    '[attr.disabled]': ' (!isAnchorTag && disabled()) || null',
  },
})
export class ButtonBase {
  private readonly _elementRef = inject<ElementRef<HTMLButtonElement>>(ElementRef);

  readonly size = input<ButtonSize>('md');
  readonly disabled = input(false, { transform: booleanAttribute });

  get hostElement(): HTMLButtonElement {
    return this._elementRef.nativeElement;
  }

  get isAnchorTag(): boolean {
    return this.hostElement.tagName.toLowerCase() === 'a';
  }

  get disabledClasses(): string {
    if (this.isAnchorTag) {
      return this.disabled() ? 'opacity-50 pointer-events-none' : '';
    }

    return 'disabled:cursor-default disabled:opacity-50 disabled:pointer-events-none';
  }
}
