import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Loan {
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
  loanDetails: { bankName: string; loanAmount: string | number; emi: string | number }[];
  status: string;
  remarks: string;
  showMore?: boolean; // for UI toggle
}

@Injectable({
  providedIn: 'root'
})
export class LoanService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  // Customers
  addCustomer(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/customers`, data);
  }

  getCustomers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/customers`);
  }

  // Loans
  addLoan(data: Loan): Observable<any> {
    return this.http.post(`${this.baseUrl}/loans`, data);
  }

  getLoans(): Observable<Loan[]> {
    return this.http.get<Loan[]>(`${this.baseUrl}/loans`);
  }

  updateLoan(id: string | number, data: Loan): Observable<any> {
    return this.http.put(`${this.baseUrl}/loans/${id}`, data);
  }

  deleteLoan(id: string | number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/loans/${id}`);
  }
}
