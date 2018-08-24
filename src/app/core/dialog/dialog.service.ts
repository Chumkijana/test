import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { WelcomeDialogComponent } from './welcome-dialog/welcome-dialog.component';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { RegisterDialogComponent } from './register-dialog/register-dialog.component';
import { InviteDialogComponent } from './invite-dialog/invite-dialog.component';

import { ContactGroup } from '../../contact-groups/shared/contact-group.model';

@Injectable()
export class DialogService {
  constructor(
    private dialog: MatDialog
  ) { }

  confirm(name: string): MatDialogRef<ConfirmDialogComponent> {
    return this.dialog.open(ConfirmDialogComponent, {
        panelClass: 'confirm-dialog',
        data: { name }
      });
  }

  welcome(): void {
    this.dialog.open(WelcomeDialogComponent, {
      width: '100%',
      height: '100%',
      panelClass: 'welcome-dialog'
    });
  }

  login(): void {
    this.dialog.open(LoginDialogComponent, {
      panelClass: 'login-dialog'
    })
    .afterClosed()
    .subscribe((openRegister) => {
      if (openRegister) {
        this.register();
      }
    });
  }

  register(): void {
    this.dialog.open(RegisterDialogComponent, {
      panelClass: 'register-dialog'
    })
    .afterClosed()
    .subscribe((openLogin) => {
      if (openLogin) {
        this.login();
      }
    });
  }

  invite(contactGroup: ContactGroup): void {
    this.dialog.open(InviteDialogComponent, {
      panelClass: 'invite-dialog',
      data: { contactGroup: contactGroup }
    });
  }
}
