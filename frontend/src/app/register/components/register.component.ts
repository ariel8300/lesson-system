import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/common/types';
import Swal from 'sweetalert2';
import { RegisterService } from '../services/register.service';

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

  constructor(
    private registerService: RegisterService,
    private router: Router
  ) {
    this.registerForm.addValidators(
      this.createCompareValidator(
        this.registerForm.get('password') as AbstractControl,
        this.registerForm.get('passwordConfirm') as AbstractControl
      )
    );
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const user: User = {
        email: this.registerForm.value.email as string,
        password: this.registerForm.value.password as string,
      };

      this.registerService.register(user).subscribe((res: any) => {
        if (res.success) {
          Swal.fire({
            title: 'Success!',
            text: 'You have successfully registered!',
            icon: 'success',
            showConfirmButton: false,
            timer: 2000,
          }).then(() => {
            this.router.navigate(['/login']);
          });
        } else {
          Swal.fire({
            title: 'Oh no!',
            text: res.message,
            icon: 'error',
            showConfirmButton: true,
          });
        }
      });
    }
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
