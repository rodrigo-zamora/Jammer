import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.less']
})
export class SubscriptionComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

  hasSubscription(): boolean {
    return this.authService.hasSubscription();
  }

}
