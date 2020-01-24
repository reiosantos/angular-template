import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import {
  ConfirmModalComponent
} from '@san/shared/components/confirmation-dialog/confirmation-dialog.component';
import { Subscription } from 'rxjs';
import { ComponentType } from '@angular/cdk/portal';
import { SanNavMenu } from '@san/shared/interfaces/san-nav-menu';
import { SanUser } from '@san/shared/models/san-user';

@Component({
  selector: 'san-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, OnDestroy {

  public providerId: number;

  user: SanUser = {};
  private logoutModalSub: Subscription;

  constructor(
    public dialog: MatDialog,
    private sanNavMenu: SanNavMenu
  ) {
  }

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
      const firstName = this.user.firstName;
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
        minHeight: '568px', width: '592px', panelClass: 'add-cab-modal-panel-class',
        data: { providerId: this.providerId }
      });
    };
  }

}
