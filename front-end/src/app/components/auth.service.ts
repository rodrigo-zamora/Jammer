import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  api = 'http://localhost:3000/auth/';
  //api = 'https://backend-jammer.herokuapp.com/auth/';

  authData$ = new Subject<any>();

  authData: any;

  constructor(public http: HttpClient) {
  }
  
  logout() {
    window.location.replace('http://localhost:3000/auth/logout');
  }

  verifyLogin() {
    console.log('Verifying login');
    this.http.get(this.api + 'verifyLogin', {
      withCredentials: true
    }).subscribe(
      (data: any) => {
        this.authData = data;
        this.authData$.next(this.authData);
      }
    );
  }

  getUserUUID() {
    return this.authData.UUID;
  }

  hasSubscription(): boolean {
    if (this.authData == null || this.authData.subscription == null || this.authData.subscription == undefined || this.authData.subscription == '') {
      return false;
    } else {
      return true;
    }
  }

  setSubscription() {
    this.authData.subscription = null;
    this.authData$.next(this.authData);
  }

  getSubscription() {
    return this.authData.subscription;
  }

  getUserFullName() {
    return this.authData.firstName + ' ' + this.authData.lastName;
  }

  getUserImage() {
    return this.authData.imageURL;
  }

  isLoggedIn() {
    if (this.authData == null) {
      return false;
    } else {
      return true;
    }
  }
}
