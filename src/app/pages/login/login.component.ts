import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LoanService } from '../../services/loan.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  router = inject(Router);

  loginForm: FormGroup = new FormGroup({
    userName: new FormControl(""),
    password: new FormControl("")
  });

  constructor(private loanService: LoanService) {}

  onLogin() {
    const { userName, password } = this.loginForm.value;

    if (!userName || !password) {
      alert("Please fill all fields!");
      return;
    }

    // JSON server ke customers data se login check
    this.loanService.getCustomers().subscribe(customers => {
      const user = customers.find(
        (c: any) => c.userName === userName && c.password === password
      );

      if (user) {
        // Login successful → store session
        sessionStorage.setItem('bankUser', JSON.stringify(user));

        // Redirect to New Loan Form page
        this.router.navigate(['/newLoanForm']);
      } else {
        alert("Invalid Username or Password!");
      }
    });
  }
}
