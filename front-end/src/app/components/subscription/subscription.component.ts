import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { SubscriptionService } from '../subscription.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogModel, ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.less']
})
export class SubscriptionComponent implements OnInit {

  result: string = '';

  constructor(public dialog: MatDialog, private snackbar: MatSnackBar, private router: Router, public authService: AuthService, public subscriptionService: SubscriptionService) { }

  ngOnInit(): void {

  }

  hasSubscription(): boolean {
    return this.authService.hasSubscription();
  }

  deleteSubscription() {
    const message = '¿Está seguro que desea cancelar su suscripción?';
    const dialogData = new ConfirmDialogModel("Cancelar suscripción", message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let subscription = this.authService.getSubscription();
        this.authService.setSubscription();
        this.subscriptionService.deleteSubscription(subscription);
        this.snackbar.open('Suscripción cancelada correctamente ', '', {
          duration: 4000
        });
      }
    });

  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

}