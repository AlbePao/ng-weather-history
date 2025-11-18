import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'tooltipClass',
  },
})
export class TooltipComponent {
  tooltipText: string[] = [];
  tooltipClass = '';
}
