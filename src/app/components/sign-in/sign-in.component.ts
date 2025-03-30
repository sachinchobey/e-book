import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  public loginForm: FormGroup;
  public showPassword: boolean = false;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  public onSubmit() {
    if (this.loginForm.valid) {
      this.http.get<any[]>('http://localhost:3000/users').subscribe(users => {
        const user = users.find(u => u.email === this.loginForm.value.email && u.password === this.loginForm.value.password);
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          // alert("Successfully logged in!");
          this.router.navigate(['/dashboard']);
        } else {
          alert('Invalid credentials. Please try again.');
        }
      });
    }
  }

  public togglePassword() {
    this.showPassword = !this.showPassword;
  }

  public goToSignUp() {
    this.router.navigate(['/sign-up']);
  }
}
