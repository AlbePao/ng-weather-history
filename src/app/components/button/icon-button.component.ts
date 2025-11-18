import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ButtonBase } from './button-base';

export type IconButtonAppearance = 'primary' | 'secondary' | 'outline' | 'base';

@Component({
  selector: 'button[app-icon-button], a[app-icon-button]',
  template: `<ng-content select="app-icon" />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]':
      '`inline-flex relative align-bottom font-semibold min-w-max items-center justify-center w-auto no-underline select-none text-center rounded-sm ${appearanceClasses} ${sizeClasses} ${disabledClasses}`',
  },
})
export class IconButtonComponent extends ButtonBase {
  readonly appearance = input<IconButtonAppearance>('base');

  get appearanceClasses(): string {
    const appearance = this.appearance();

    if (appearance === 'outline') {
      return 'text-black box-border border border-solid border-gray hover:border-primary disabled:bg-gray-lighter';
    } else if (appearance === 'secondary') {
      return 'text-primary bg-primary-lighter hover:text-white hover:bg-primary-dark';
    } else if (appearance === 'primary') {
      return 'text-white bg-primary hover:bg-primary-dark';
    }

    return 'text-base';
  }

  get sizeClasses(): string {
    const size = this.size();

    if (size === 'xs') {
      return 'h-6 p-0.5 text-sm';
    } else if (size === 'sm') {
      return 'h-8 p-1 text-sm';
    } else if (size === 'md') {
      return 'h-10 p-2 text-sm';
    }

    return 'h-12 p-3 text-base';
  }
}
