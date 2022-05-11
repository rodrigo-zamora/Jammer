import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketService } from './components/socket.service';

interface Comment {
  comment: string;
  from: "out" | "in";
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {

  constructor(private readonly socketService: SocketService) {}

  title = 'front-end';

  movieComments: Comment[] = [];
  movieComment: string = '';

  onSendComment() {
    this.socketService.sendMovieComment(this.movieComment);
  }

  ngOnInit(): void{
    this.socketService.getMovieComments().subscribe({
      next: (comment: string) => {
        console.log(comment);
      }
    })
  }

  ngOnDestroy(): void {

  }
}
