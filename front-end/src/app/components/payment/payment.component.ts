import { Component, OnInit } from '@angular/core';
import { SubscriptionService } from '../subscription.service';
import { AuthService } from '../auth.service';
import { ReplaySubject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})


export class PaymentComponent implements OnInit {

  nextPayment = moment().add(1, 'month').format('DD/MM/YYYY');

  subscription: any;

  destroyed = new ReplaySubject<void>(1);

  constructor(private snackbar: MatSnackBar, private router: Router, public subscriptionService : SubscriptionService, private authService: AuthService) { }


  ngOnInit(): void {

  }
  
  paySubscription() {
    let userUUID = this.authService.getUserUUID();
    this.subscriptionService.createSubscription(userUUID);
    this.subscriptionService.subscription$.pipe(takeUntil(this.destroyed)).subscribe((subscription) => {
      this.subscription = subscription;
      this.snackbar.open('Suscripción realizada correctamente ', '', {
        duration: 4000
      });
      this.router.navigate(['/']);
    });
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }

}
