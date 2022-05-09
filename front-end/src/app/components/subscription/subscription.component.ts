import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { SubscriptionService } from '../subscription.service';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.less']
})
export class SubscriptionComponent implements OnInit {

  constructor(private router: Router, public authService: AuthService, public subscriptionService: SubscriptionService) { }

  ngOnInit(): void {
  }

  hasSubscription(): boolean {
    return this.authService.hasSubscription();
  }

  deleteSubscription() {
    let subscription = this.authService.getSubscription();
    this.authService.setSubscription();
    this.subscriptionService.deleteSubscription(subscription);
    this.router.navigate(['/']);
  }

}
