import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-tooltip',
  imports: [TranslatePipe],
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
