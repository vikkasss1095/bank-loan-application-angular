import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LoanService } from '../../services/loan.service';

@Component({
  selector: 'app-new-loan-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './new-loan-form.component.html',
  styleUrls: ['./new-loan-form.component.scss']
})
export class NewLoanFormComponent {
  constructor(private loanService: LoanService, private router: Router) {}

  loanData: any = {
    fullName: '',
    email: '',
    phoneNumber: '',
    dob: '',
    panCard: '',
    annualIncome: '',
    employmentStatus: '',
    creditScore: '',
    assets: '',
    city: '',
    state: '',
    zipCode: '',
    address: '',
    loanDetails: [],
    status: 'Pending',
    remarks: ''
  };

  loanDetails = [{ bankName: '', loanAmount: '', emi: '' }];

  addLoanDetail(): void {
    this.loanDetails.push({ bankName: '', loanAmount: '', emi: '' });
  }

  removeLoanDetail(index: number): void {
    this.loanDetails.splice(index, 1);
  }

  onSubmit(): void {
    this.loanData.loanDetails = this.loanDetails;

    // Basic validation
    if (!this.loanData.fullName || !this.loanData.email || !this.loanData.phoneNumber) {
      alert('⚠️ Fill all mandatory fields!');
      return;
    }

    for (let loan of this.loanDetails) {
      if (!loan.bankName || !loan.loanAmount || !loan.emi) {
        alert('⚠️ Fill all loan details!');
        return;
      }
    }

    this.loanService.addLoan(this.loanData).subscribe({
      next: () => {
        alert('✅ Loan Application Submitted!');
        this.resetForm();
        this.router.navigate(['/banker-list']);
      },
      error: (err) => {
        console.error('Error:', err);
        alert('❌ Failed to submit.');
      }
    });
  }

  resetForm(): void {
    this.loanData = {
      fullName: '',
      email: '',
      phoneNumber: '',
      dob: '',
      panCard: '',
      annualIncome: '',
      employmentStatus: '',
      creditScore: '',
      assets: '',
      city: '',
      state: '',
      zipCode: '',
      address: '',
      loanDetails: [],
      status: 'Pending',
      remarks: ''
    };
    this.loanDetails = [{ bankName: '', loanAmount: '', emi: '' }];
  }
}
