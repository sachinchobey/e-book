import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  public signupForm: FormGroup;
  public showPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  /*
    Method for user registration in e-book
  */

  public onSubmit() {
    if (this.signupForm.valid) {
      const { email } = this.signupForm.value;

      this.http.get<any[]>('http://localhost:3000/users').subscribe((users) => {
        const existingUser = users.find((user) => user.email === email);

        if (existingUser) {
          alert('This email is already registered. Please use another email.');
        } else {
          this.http
            .post('http://localhost:3000/users', this.signupForm.value)
            .subscribe(() => {
              alert('Account created successfully!');
              this.router.navigate(['/sign-in']);
            });
        }
      });
    } else {
      alert('Please fill in all required fields correctly.');
    }
  }

/*
   Method for password visibility toggle
*/

  public togglePassword() {
    this.showPassword = !this.showPassword;
  }

/*
 Navigate to sign-in page
*/

  public goToSignIn() {
    this.router.navigate(['/sign-in']);
  }
}
