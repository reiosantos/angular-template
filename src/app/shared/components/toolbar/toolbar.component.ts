import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmModalComponent } from '@san/shared/components/confirmation-dialog/confirmation-dialog.component';
import { Subscription } from 'rxjs';
import { NavMenu } from '@san/shared/interfaces/nav-menu';
import { User } from '@san/shared/models/user';
import { Store } from '@ngrx/store';
import { StoreSelectors, StoreState } from '@san/store';
import { Storage } from '@san/shared/interfaces/storage';
import { WINDOW } from '@san/core/providers/injetion-tokens';

@Component({
  selector: 'san-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, OnDestroy {
  user: User = {};
  private logoutModalSub: Subscription;

  constructor(
    public dialog: MatDialog,
    public sanNavMenu: NavMenu,
    public store: Store<StoreState>,
    public storage: Storage,
    @Inject(WINDOW) private win: any
  ) {}

  ngOnInit() {
    this.store.select(StoreSelectors.selectAuthUser).subscribe(user => (this.user = user));
  }

  ngOnDestroy(): void {
    if (this.logoutModalSub) {
      this.logoutModalSub.unsubscribe();
    }
  }

  toggleSideNav = () => {
    this.sanNavMenu.toggle();
  };

  logout() {
    this.storage.clear();
    this.win.location.reload();
  }

  showLogoutModal = () => {
    if (this.user) {
      const { firstName } = this.user;
      const dialogRef = this.dialog.open(ConfirmModalComponent, {
        width: '592px',
        backdropClass: 'modal-backdrop',
        panelClass: 'small-modal-panel-class',
        data: {
          displayText: `logout, ${firstName || ''}`,
          confirmText: 'logout'
        }
      });
      dialogRef.componentInstance.executeFunction.subscribe((confirmed: boolean) => {
        if (confirmed) {
          this.logout();
        }
      });
    }
  };
}
