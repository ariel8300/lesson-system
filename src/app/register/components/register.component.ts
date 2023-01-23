import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(20),
    ]),
    passwordConfirm: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(20),
    ]),
  });

  constructor() {
    this.registerForm.addValidators(
      this.createCompareValidator(
        this.registerForm.get('password') as AbstractControl,
        this.registerForm.get('passwordConfirm') as AbstractControl
      )
    );
  }

  onSubmit() {
    console.log(this.registerForm.value);
  }

  createCompareValidator(
    pw: AbstractControl,
    pwConfirm: AbstractControl
  ): ValidatorFn {
    return () => {
      if (pw.value !== pwConfirm.value) {
        return { match_error: 'Passwords do not match' };
      }

      return null;
    };
  }
}
