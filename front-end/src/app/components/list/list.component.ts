import { Component, OnInit } from '@angular/core';
import { ReplaySubject, takeUntil } from 'rxjs';
import { movie } from '../movies.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ListService } from '../list.service';
import { CommentService } from '../comment.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogModel, ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})
export class ListComponent implements OnInit {

  listItem: any;
  commentItems: any;

  destroyed = new ReplaySubject<void>(1);

  constructor(
    public dialog: MatDialog,
    private snackbar: MatSnackBar,
    public listService: ListService,
    private router: Router,
    public comments: CommentService,
    private route: ActivatedRoute) {

    route.params.subscribe(params => {
      var url = this.router.url;
      var uuid = url.split('/')[2];

      this.listService.getMoviesFromList(uuid);
      this.listService.listMovies$.pipe(takeUntil(this.destroyed)).subscribe((movies) => {
        this.listItem = movies;
        console.log(this.listItem);
        console.log(this.listItem.length);
        for (let i = 0; i < this.listItem.length; i++) {
          console.log(this.listItem[i].uuid);
          this.comments.getComments(this.listItem[i].cuevanaUUID);
          this.comments.comments$.pipe(takeUntil(this.destroyed)).subscribe((comments) => {
            console.log(comments);
            this.commentItems = comments;
            console.log(this.commentItems);
          });
        }
      });
    });
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }

  deleteFromList(movieUUID: string) {
    const dialogData = new ConfirmDialogModel(
      "Eliminar de lista",
      "¿Estás seguro de que quieres eliminar esta película de la lista?",
      "Salir",
      "Eliminar"
    );

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '550px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        var url = this.router.url;
        var uuid = url.split('/')[2];

        this.listService.deleteFromList(uuid, movieUUID);
        this.snackbar.open('Película eliminada de la lista', '', {
          duration: 2000
        });
      }
    });
  }

}
