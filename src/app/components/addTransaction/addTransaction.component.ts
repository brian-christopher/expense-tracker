import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TransactionDataModel } from '../../models/transaction-model';

@Component({
  selector: 'app-add-transaction',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './addTransaction.component.html',
  styleUrl: './addTransaction.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddTransactionComponent {
  text = new FormControl('', {
    validators: [Validators.required],
  });
  amount = new FormControl(0, {
    validators: [Validators.required],
  });

  @Output()
  transactionSubmitted = new EventEmitter<TransactionDataModel>();

  constructor(private readonly toastService: ToastrService) {}

  onSubmit() {
    if (this.text.invalid || this.amount.invalid) {
      this.toastService.error('Both fields be filled');
      return;
    }

    const transactionData: TransactionDataModel = {
      text: this.text.value!,
      amount: this.amount.value!,
    };

    this.text.setValue('');
    this.amount.setValue(0);

    this.transactionSubmitted.emit(transactionData);
  }
}
