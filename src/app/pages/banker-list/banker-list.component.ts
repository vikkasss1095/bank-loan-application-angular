import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoanService } from '../../services/loan.service';

interface LoanDetail {
  bankName: string;
  loanAmount: string | number;
  emi: string | number;
}

interface Loan {
  id: string | number;
  fullName: string;
  email: string;
  phoneNumber: string;
  dob: string;
  panCard: string;
  annualIncome: number;
  employmentStatus: string;
  creditScore: number;
  assets: string;
  city: string;
  state: string;
  zipCode: string;
  address: string;
  loanDetails: LoanDetail[];
  status: string;
  remarks: string;
  showMore?: boolean;
}

@Component({
  selector: 'app-banker-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './banker-list.component.html',
  styleUrls: ['./banker-list.component.scss']
})
export class BankerListComponent implements OnInit {
  // Admin login
  username: string = '';
  password: string = '';
  loginError: string = '';
  isLoggedIn: boolean = false;

  // Dashboard data
  loans: Loan[] = [];

  constructor(private loanService: LoanService) {}

  ngOnInit(): void {}

  login(): void {
    if (this.username === 'vikas' && this.password === 'vikas123') {
      this.isLoggedIn = true;
      this.fetchLoans();
    } else {
      this.loginError = '❌ Invalid username or password';
    }
  }

  fetchLoans(): void {
    this.loanService.getLoans().subscribe({
      next: (res: Loan[]) => {
        this.loans = res.map(loan => ({ ...loan, showMore: false }));
      },
      error: err => console.error('Error fetching loans:', err)
    });
  }

  toggleViewMore(loan: Loan): void {
    loan.showMore = !loan.showMore;
  }

  updateStatus(loan: Loan, status: string): void {
    const reason = prompt(`Enter reason for ${status}:`);
    if (!reason) return;

    const updatedLoan: Loan = { ...loan, status, remarks: reason };
    this.loanService.updateLoan(loan.id, updatedLoan).subscribe({
      next: () => this.fetchLoans(),
      error: err => console.error(err)
    });
  }

  deleteLoan(id: string | number): void {
    if (!confirm('Are you sure to delete this loan?')) return;
    this.loanService.deleteLoan(id).subscribe({
      next: () => this.fetchLoans(),
      error: err => console.error(err)
    });
  }

  logout(): void {
  if(confirm('Are you sure you want to logout?')) {
    this.isLoggedIn = false; // Login form show karega
    this.username = '';
    this.password = '';
    this.loginError = '';
  }
}

}
