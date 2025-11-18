import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Colors } from '@interfaces/colors';

@Component({
  selector: 'app-card',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': '`border ${borderClass} rounded-sm block p-4`',
  },
})
export class CardComponent {
  readonly color = input<Colors>('gray');

  get borderClass(): string {
    const color = this.color();

    if (color === 'primary') {
      return 'border-primary';
    } else if (color === 'secondary') {
      return 'border-secondary';
    } else if (color === 'success') {
      return 'border-success';
    } else if (color === 'danger') {
      return 'border-danger';
    } else if (color === 'info') {
      return 'border-info';
    }

    return 'border-gray';
  }
}
