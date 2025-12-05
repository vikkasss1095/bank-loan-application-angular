import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LoanService } from '../../services/loan.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  http = inject(HttpClient);
  router = inject(Router);

  customerobj: any = {
    userName: "",
    emailId: "",
    fullName: "",
    password: ""
  };

  constructor(private loanService: LoanService) {}

  onRegister() {
    if (
      !this.customerobj.userName ||
      !this.customerobj.emailId ||
      !this.customerobj.fullName ||
      !this.customerobj.password
    ) {
      alert("Please fill all fields!");
      return;
    }

    this.loanService.addCustomer(this.customerobj).subscribe({
      next: (res) => {
        console.log("Customer Registered ✅", res);
        alert("Registration Successful!");
        this.router.navigate(['/login']); // Redirect to login
      },
      error: (err) => {
        console.error("Registration Error ❌", err);
        alert("Registration Failed!");
      }
    });
  }
}
