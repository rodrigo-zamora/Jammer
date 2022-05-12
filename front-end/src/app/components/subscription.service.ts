import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SubscriptionService {

  //api = 'https://backend-jammer.herokuapp.com/api/subscription/';
  api = 'https://backend-jammer.herokuapp.com/api/subscription/';

  constructor(private http: HttpClient) { }

  subscription$ = new Subject<any>();
  subscription: any;

  createSubscription(userUUID: string) {
    this.http.post(this.api + userUUID, {}).subscribe(data => {
      this.subscription = data;
      this.subscription$.next(this.subscription);
    });
  }

  deleteSubscription(userUUID: string) {
    this.http.delete(this.api + userUUID).subscribe(data => {
      this.subscription = data;
      this.subscription$.next(this.subscription);
    });
  }

}
