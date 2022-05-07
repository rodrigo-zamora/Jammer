import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  api = 'https://backend-jammer.herokuapp.com/comments/';

  comments$ = new Subject<any>();

  comment: any;

  constructor(private http: HttpClient) { }

  getComments(cuevanaUUID: string) {
    this.http.get((this.api + cuevanaUUID)).subscribe(data => {
      this.comment = data;
      this.comments$.next(this.comment);
    });
  }

  createComment(cuevanaUUID: string, comment: string) {
    let uuid = localStorage.getItem('UUID');
    this.http.post((this.api + cuevanaUUID), { text: comment, authorUUID: uuid }).subscribe(data => {
      this.getComments(cuevanaUUID);
    });
  }
}
