import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { TransactionModel } from '../../models/transaction-model';

@Component({
  selector: 'app-transaction-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transactionList.component.html',
  styleUrl: './transactionList.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionListComponent {
  @Input({
    required: true,
  })
  transactions?: TransactionModel[];

  @Output()
  transactionDeleted = new EventEmitter<number>();

  deleteTransaction(id: number) {
    this.transactionDeleted.emit(id);
  }
}
