import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ButtonBase } from './button-base';

export type ButtonAppearance = 'primary' | 'secondary' | 'outline' | 'link' | 'danger' | 'success';

@Component({
  selector: 'button[app-button], a[app-button]',
  templateUrl: './button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]':
      '`inline-flex flex-row flex-nowrap min-w-max items-center justify-center relative w-auto font-semibold no-underline select-none text-center ${appearanceClasses} ${sizeClasses} ${disabledClasses}`',
  },
})
export class ButtonComponent extends ButtonBase {
  readonly appearance = input<ButtonAppearance>('primary');

  get appearanceClasses(): string {
    const appearance = this.appearance();

    if (appearance === 'link') {
      return 'text-primary';
    } else if (appearance === 'outline') {
      return 'text-primary box-border border border-solid border-gray hover:border-primary disabled:bg-gray-lighter';
    } else if (appearance === 'secondary') {
      return 'text-primary bg-primary-lighter hover:text-white hover:bg-primary-dark';
    } else if (appearance === 'danger') {
      return 'text-danger bg-danger-lighter hover:text-white hover:bg-danger-dark';
    } else if (appearance === 'success') {
      return 'text-success bg-success-lighter hover:text-white hover:bg-success-dark';
    }

    return 'text-white bg-primary hover:bg-primary-dark';
  }

  get sizeClasses(): string {
    const size = this.size();

    if (size === 'xs') {
      return 'rounded-sm h-6 p-0.5 text-sm gap-1';
    } else if (size === 'sm') {
      return 'rounded-sm h-8 p-1 text-sm gap-1';
    } else if (size === 'md') {
      return 'rounded-sm h-10 p-3 text-sm gap-2';
    }

    return 'rounded-sm h-12 p-3 text-base gap-2';
  }
}
