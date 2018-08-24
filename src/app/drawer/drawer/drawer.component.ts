import { Component, OnInit } from '@angular/core';
import { DrawerService } from '../drawer.service';
import { AuthService } from '../../auth/shared/auth.service';
import { DialogService } from '../../core/dialog/dialog.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AccountService } from '../../accounts/shared/account.service';
import { Account } from '../../accounts/shared/account.model';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss']
})
export class DrawerComponent implements OnInit {

  account: Account;

  private $account: Subscription;
  public signoutshow:boolean = false;
  public buttonName:any = 'arrow_drop_down';

  constructor(
    public authService: AuthService,
    public dialogService: DialogService,
    public drawerService: DrawerService,
    private router: Router,
    private accountService: AccountService
  ) {
  }

  ngOnInit(): void {
    this.$account = this.accountService.account$.subscribe(account => this.account = account);

    this.accountService.loadAccountInfo().subscribe();
  }

  logout(): void {
    this.authService
      .logout()
      .subscribe(
        () => {
          this.router.navigate(['']);
        }
      );
  }

  toggle() {
    this.signoutshow = !this.signoutshow;

    // CHANGE THE NAME OF THE BUTTON.
    if(this.signoutshow)  
      this.buttonName = "arrow_drop_up";
    else
      this.buttonName = "arrow_drop_down";
  }

}
