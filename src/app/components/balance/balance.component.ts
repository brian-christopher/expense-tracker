import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-balance',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './balance.component.html',
  styleUrl: './balance.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BalanceComponent {
  @Input({ required: true })
  total?: number;
}
