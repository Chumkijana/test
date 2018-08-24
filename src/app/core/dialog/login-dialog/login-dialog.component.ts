import { Component, ViewEncapsulation, NgZone } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { FacebookService, InitParams, LoginResponse } from 'ngx-facebook';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../auth/shared/auth.service';
import { StatusService } from '../../status/status.service';

const googleClientId = environment.googleClientId;
const facebookAppId = environment.facebookAppId;
const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginDialogComponent {
  form: FormGroup;
  submitting = false;

  get email() { return this.form.get('email'); }
  get password() { return this.form.get('password'); }

  constructor(
    private authService: AuthService,
    private dialogRef: MatDialogRef<LoginDialogComponent>,
    private fbService: FacebookService,
    private statusService: StatusService,
    private zone: NgZone
  ) {
    this.form = new FormGroup({
      'email': new FormControl('', [
        Validators.required, Validators.pattern(emailRegex)
      ]),
      'password': new FormControl('', [
        Validators.required
      ])
    });
  }

  login(): void {
    this.submitting = true;

    this.authService
      .login(this.email.value, this.password.value)
      .subscribe(
        () => this.close(),
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

  facebookLogin(): void {
    this.submitting = true;

    const initParams: InitParams = {
      appId: facebookAppId,
      xfbml: true,
      version: 'v2.11'
    };

    this.fbService.init(initParams);

    this.fbService.login({ scope: 'public_profile,email' })
      .then((response: LoginResponse) => {
        this.fbService.api(response.authResponse.userID, 'get', { fields: 'id,name,email' })
          .then(res => {
            this.authService
              .facebookLogin(res['id'], res['email'])
              .subscribe(() => this.close());
          })
          .catch();
      })
      .catch((error: any) => console.error(error));
  }

  googleLogin(): void {
    this.submitting = true;

    window['gapi'].load('auth2', () => {
      const auth2 = window['gapi'].auth2.init({
        client_id: googleClientId
      });

      // Sign the user in, and then retrieve their ID.
      auth2.signIn().then(
        () => {
          const id = auth2.currentUser.get().getId();
          const email = auth2.currentUser.get().getBasicProfile().getEmail();

          this.authService
            .googleLogin(id, email)
            .subscribe(() => {
              this.zone.run(() => this.close());
            });
        },
        (error) => {
          window.alert(JSON.stringify(error));
        }
      );
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  later(): void {
    this.statusService.showUnsaved();
    this.close();
  }

  openRegister(): void {
    this.dialogRef.close(true);
  }
}
