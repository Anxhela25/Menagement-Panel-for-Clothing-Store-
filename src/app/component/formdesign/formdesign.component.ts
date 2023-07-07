import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  AsyncValidatorFn,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { Observable, delay, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { UsersService } from 'src/app/component/formdesign/service/users.service';
import { UsersModel } from 'src/app/component/formdesign/entity/Users.model';

export function emailValidator(): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const email = control.value;

    // Mock example: Validate email format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@faishon.com$/;
    const isValidFormat = emailRegex.test(email);

    // Return the validation result as an Observable
    if (isValidFormat) {
      return of(null);
    } else {
      return of({ invalidEmail: true });
    }
  };
}

export function phoneNumberValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const phoneNumber = control.value;
    const phoneRegex = /^[6]{1}[7-9]{1}[0-9]{7}$/;

    if (phoneNumber && !phoneRegex.test(phoneNumber)) {
      return { invalidPhoneNumber: true };
    }

    return null;
  };
}
export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.value;

    if (!password) {
      // Return null if the password is null or undefined
      return null;
    }

    // Password strength criteria
    const minLength = 10;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*()\-=_+[\]{}|\\;:'",.<>/?]+/.test(
      password
    );

    // Check if the password meets the criteria
    const isLongEnough = password.length >= minLength;
    const hasAllCriteria =
      hasUppercase && hasLowercase && hasNumber && hasSpecialChar;

    // Return the validation result
    if (isLongEnough && hasAllCriteria) {
      return null; // No errors
    } else {
      return { weakPassword: true }; // Weak password error
    }
  };
}

@Component({
  selector: 'app-formdesign',
  templateUrl: './formdesign.component.html',
  styleUrls: ['./formdesign.component.css'],
})
export class FormdesignComponent implements OnInit {
  termlist = ['30 days', '90 days', '1 year', '2 year', 'Always'];
  termList = ['Admin', 'User'];
  users: UsersModel[] = [];
  id: number | undefined;
  showPassword: boolean = false;

  constructor(
    private builder: FormBuilder,
    private usersService: UsersService,
    private snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {}

  getusers() {
    this.usersService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }
  customerform = this.builder.group({
    name: this.builder.control('', Validators.required),
    lastname: this.builder.control('', Validators.required),
    email: [
      '',
      Validators.compose([Validators.required]),
      emailValidator() as AsyncValidatorFn,
      ,
    ],
    password: ['', [Validators.required, passwordValidator()]],
    phoneNumber: [
      '',
      Validators.compose([Validators.required, phoneNumberValidator()]),
    ],

    address: this.builder.control('', Validators.required),
    term: this.builder.control('', Validators.required),
    role: this.builder.control('', Validators.required),
    dob: this.builder.control(null),
    gender: this.builder.control(''),
    status: this.builder.control('', Validators.required),
  });

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  SaveCustomer() {
    // Check if the form is valid
    if (this.customerform.valid) {
      const userData = this.customerform.value;
      let name = this.customerform.value.name;
      let lastname = this.customerform.value.lastname;
      let phonenumber = Number(this.customerform.value.phoneNumber);
      let email = this.customerform.value.email;
      let address = this.customerform.value.address;
      let dob = this.customerform.value.dob;
      let term = this.customerform.value.term;
      let gender = this.customerform.value.gender;
      let status = this.customerform.value.status;
      let password = this.customerform.value.password;
      let role = this.customerform.value.role;

      if (
        name &&
        lastname &&
        phonenumber &&
        email &&
        term &&
        dob &&
        address &&
        gender &&
        status &&
        password &&
        role
      ) {
        this.usersService
          .createUsers({
            name,
            lastname,
            phonenumber,
            email,
            address,
            term,
            dob,
            gender,
            status,
            password,
            role,
          })
          .subscribe((user) => {
            this.users.push(user);
            this.clearform();
            this.snackBar.open('User saved successfully!', 'Close', {
              duration: 3000,
            });
          });
      } else {
        this.snackBar.open('Please fill in all required fields.', 'Close', {
          duration: 3000,
        });
      }
    } else {
      // Handle form errors or display an error message
      this.snackBar.open(
        'Oops! There are some errors in the form. Please check your entries and try again.',
        'Close',
        {
          duration: 3000,
        }
      );
    }
  }

  clearform() {
    this.customerform.reset();

    // Reset form control validity and remove red color
    Object.keys(this.customerform.controls).forEach((key) => {
      const control = this.customerform.get(key);
      control?.setErrors(null);
    });
  }
}
