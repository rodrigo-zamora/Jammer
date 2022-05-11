import { Component, Input, OnInit } from '@angular/core';
import { MoviesService, movie } from '../movies.service';
import { ReplaySubject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { CommentService } from '../comment.service';
import { ListService } from '../list.service';
import { AuthService } from '../auth.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../confirm-dialog/confirm-dialog.component';
import { EditCommentsComponent } from '../edit-comments/edit-comments.component';

@Component({
  selector: 'app-movie-data',
  templateUrl: './movie-data.component.html',
  styleUrls: ['./movie-data.component.less']
})
export class MovieDataComponent implements OnInit {

  @Input() movie: movie | undefined;

  uLists: any;

  animal: string | undefined;
  name: string | undefined;

  movies: any;
  comments: any;

  destroyed = new ReplaySubject<void>(1);

  constructor(
    public dialog: MatDialog,
    private snackbar: MatSnackBar,
    public pelis: MoviesService,
    public commentService: CommentService,
    private router: Router,
    public lists: ListService,
    private authService: AuthService) { }

    openDialog(commentUUID: string): void {
      const dialogRef = this.dialog.open(EditCommentsComponent, {
        width: '550px',
        data: {UUID: commentUUID},
      });
  
      dialogRef.afterClosed().subscribe(result => {
        this.animal = result;
      });
    }

  addToList(listUUID : string, cuevanaUUID : string | undefined) {
    let userUUID = this.authService.getUserUUID();
    this.lists.addMovieToList(listUUID, cuevanaUUID, userUUID);
  }

  displayLists() {
    this.lists.getLists();
    this.lists.userLists$.pipe(takeUntil(this.destroyed)).subscribe((list) => {
      this.uLists = list.lists;
      this.uLists.splice(0, 1);
    });
  }

  ngOnInit(): void {

    var url = this.router.url;
    var uuid = url.split('/')[2];
    var name = url.split('/')[3];

    this.getComments()

    this.pelis.getMovieDetails(uuid + '/' + name);
    this.pelis.movieDetails$.pipe(takeUntil(this.destroyed)).subscribe((movie) => {
      this.movies = movie[0];
    });
  }

  getComments() {
    var url = this.router.url;
    var uuid = url.split('/')[2];
    var name = url.split('/')[3];
    this.commentService.getComments(uuid + '/' + name);
    this.commentService.comments$.pipe(takeUntil(this.destroyed)).subscribe((comments) => {
      this.comments = comments;
      console.log(this.comments);
    });
  }

  addToHistory(uuid: any) {
    let userUUID = this.authService.getUserUUID();
    this.lists.addMovieToHistory(uuid, userUUID);
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }

  getAuthorImage() {
    return this.authService.getUserImage();
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  getActors() {
    return this.movies.cast.map((actor: { name: any; }) => actor.name).join(', ');
  }

  canCRUD(uuid: any): boolean {
    return this.authService.getUserUUID() === uuid;
  }

  deleteComment(uuid: any) {
    const dialogData = new ConfirmDialogModel(
      'Eliminar comentario',
      '¿Estás seguro de que quieres eliminar este comentario?',
      'Cancelar',
      'Eliminar'
    );

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.commentService.deleteComment(uuid);

        this.snackbar.open('Comentario eliminado', '', {
          duration: 2000
        });

        setTimeout(() => {
          this.getComments();
        }, 500);

      }
    });

  }

  editComment() {
    
  }

}
