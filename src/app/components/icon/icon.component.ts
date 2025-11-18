import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';
import { Colors } from '@interfaces/colors';

export type IconColors = Colors | 'black';

@Component({
  selector: 'app-icon',
  template: `<ng-content />`,
  styleUrl: './icon.component.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': '`${iconColor} app-icon select-none relative`',
  },
})
export class IconComponent {
  readonly color = input<IconColors>();

  get iconColor(): string {
    const color = this.color();

    if (color === 'primary') {
      return 'text-primary';
    } else if (color === 'secondary') {
      return 'text-secondary';
    } else if (color === 'success') {
      return 'text-success';
    } else if (color === 'danger') {
      return 'text-danger';
    } else if (color === 'info') {
      return 'text-info';
    } else if (color === 'gray') {
      return 'text-gray';
    } else if (color === 'black') {
      return 'text-black';
    }

    return 'text-current';
  }
}
