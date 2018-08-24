import { Component, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { AuthService } from '../../../auth/shared/auth.service';
import { StatusService } from '../../status/status.service';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterDialogComponent {
  form: FormGroup;
  submitting = false;

  get email() { return this.form.get('email'); }
  get password() { return this.form.get('password'); }

  constructor(
    private authService: AuthService,
    private dialogRef: MatDialogRef<RegisterDialogComponent>,
    private statusService: StatusService
  ) {
    this.form = new FormGroup({
      'email': new FormControl('', [
        Validators.required, Validators.pattern(EMAIL_REGEX)
      ]),
      'password': new FormControl('', [
        Validators.required, Validators.minLength(8)
      ])
    });
  }

  register(): void {
    if (this.form.invalid) {
      return;
    }

    this.submitting = true;

    this.authService
      .register(this.email.value, this.password.value)
      .subscribe(
        () => {
          this.close();
          this.statusService.showUnconfirmed();
        },
        err => {
          this.submitting = false;
          const errors = err.error.errors;
          Object.keys(errors).map(key => {
            this.form.controls[key].setErrors({ serverError: true });
            (<any>this.form.controls[key]).errorMessage = errors[key];
          });
        }
      );
  }

  close(): void {
    this.dialogRef.close();
  }

  later(): void {
    this.statusService.showUnsaved();
    this.close();
  }

  openLogin(): void {
    this.dialogRef.close(true);
  }
}
