import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-income-expenses',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './incomeExpenses.component.html',
  styleUrl: './incomeExpenses.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IncomeExpensesComponent {
  @Input({ required: true })
  income?: number;

  @Input({ required: true })
  expenses?: number;
}
