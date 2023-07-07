import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../service/authservice/auth.service';
import { log } from 'console';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm!: FormGroup;
  showPassword: boolean = false;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.authService.loggedIn.subscribe((loggedIn) => {
      if (!loggedIn) {
        // User logged out, navigate to the login page
        this.router.navigate(['/login']);
      }
    });
  }
  login() {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('username')?.value;
      const password = this.loginForm.get('password')?.value;

      this.authService.login(email, password).subscribe((loggedIn) => {
        if (loggedIn) {
          // Successful login, navigate to MenubarComponent
          this.authService.findUser(email).subscribe((user: any) => {
            this.authService.setRole(user[0].role);
          });
          this.router.navigate(['/menubar']);
        } else {
          // Invalid login credentials, show error message
          this.snackBar.open('Invalid email or password', 'Close', {
            duration: 2000,
          });
        }

        // Reset the form
        this.loginForm.reset();
      });
    } else {
      this.snackBar.open('Please fill in all required fields', 'Close', {
        duration: 2000,
      });
    }
  }
}
