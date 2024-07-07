import { Component, computed, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { BalanceComponent } from './components/balance/balance.component';
import { IncomeExpensesComponent } from './components/incomeExpenses/incomeExpenses.component';
import { TransactionListComponent } from './components/transactionList/transactionList.component';
import { AddTransactionComponent } from './components/addTransaction/addTransaction.component';
import {
  TransactionDataModel,
  TransactionModel,
} from './models/transaction-model';
import { transition } from '@angular/animations';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [
    RouterOutlet,
    HeaderComponent,
    BalanceComponent,
    IncomeExpensesComponent,
    TransactionListComponent,
    AddTransactionComponent,
  ],
})
export class AppComponent implements OnInit {
  transactions = signal<TransactionModel[]>([]);

  constructor(private readonly toastService: ToastrService) {}

  ngOnInit(): void {
    const savedTransactions = JSON.parse(localStorage.getItem('transactions')!);
    if (savedTransactions) {
      this.transactions.set(savedTransactions);
    }
  }
  // Get Total
  total = computed(() => {
    return this.transactions().reduce((acc, transition) => {
      return acc + transition.amount;
    }, 0);
  });

  // Get income
  income = computed(() => {
    return this.transactions()
      .filter((t) => t.amount > 0)
      .reduce((acc, transition) => {
        return acc + transition.amount;
      }, 0);
  });

  // Get expenses
  expenses = computed(() => {
    return this.transactions()
      .filter((t) => t.amount < 0)
      .reduce((acc, transition) => {
        return acc + transition.amount;
      }, 0);
  });

  handleTransactionSubmitted(data: TransactionDataModel) {
    this.transactions.update((v) => [
      ...v,
      {
        id: this.generateUniqueId(),
        amount: data.amount,
        text: data.text,
      },
    ]);

    this.saveTransactionsToLocalStorage();
    this.toastService.success('Transaction added');
  }

  handleTransactionDeleted(id: number) {
    this.transactions.update((transactions) =>
      transactions.filter((transition) => transition.id !== id)
    );

    this.saveTransactionsToLocalStorage();
    this.toastService.success('Transaction deleted');
  }

  private generateUniqueId() {
    return Math.floor(Math.random() * 10000000);
  }

  private saveTransactionsToLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(this.transactions()));
  }
}
