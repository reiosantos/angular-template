import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmModalComponent } from '@san/shared/components/confirmation-dialog/confirmation-dialog.component';
import { Subscription } from 'rxjs';
import { ComponentType } from '@angular/cdk/portal';
import { NavMenu } from '@san/shared/interfaces/nav-menu';
import { User } from '@san/shared/models/user';

@Component({
  selector: 'san-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, OnDestroy {
  public providerId: number;

  user: User = {};
  private logoutModalSub: Subscription;

  constructor(public dialog: MatDialog, private sanNavMenu: NavMenu) {}

  ngOnInit() {
    // TODO: this.user = this.auth.getCurrentUser();
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
    // TODO implement logout
  }

  showLogoutModal = () => {
    if (this.user) {
      const { firstName } = this.user;
      const dialogRef = this.dialog.open(ConfirmModalComponent, {
        width: '592px',
        backdropClass: 'modal-backdrop',
        panelClass: 'small-modal-panel-class',
        data: {
          displayText: `logout, ${firstName}`,
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

  handleAction() {
    const openModal = (modal: ComponentType<any>) => {
      this.dialog.open(modal, {
        minHeight: '568px',
        width: '592px',
        panelClass: 'add-cab-modal-panel-class',
        data: { providerId: this.providerId }
      });
    };
  }
}
