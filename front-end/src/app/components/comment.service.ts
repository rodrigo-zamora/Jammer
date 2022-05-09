import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  api = 'https://backend-jammer.herokuapp.com/comments/';

  comments$ = new Subject<any>();

  comment: any;

  constructor(private http: HttpClient, private authService: AuthService) { }

  getComments(cuevanaUUID: string) {
    this.http.get((this.api + cuevanaUUID)).subscribe(data => {
      this.comment = data;
      this.comments$.next(this.comment);
    });
  }

  createComment(cuevanaUUID: string, comment: string) {
    let uuid = this.authService.getUserUUID();
    let fullName = this.authService.getUserFullName();
    let image = this.authService.getUserImage();
    this.http.post((this.api + cuevanaUUID), { text: comment, authorUUID: uuid, authorName: fullName, authorImage: image }).subscribe(data => {
      this.getComments(cuevanaUUID);
    });
  }
}
