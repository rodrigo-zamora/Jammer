import { Component, Input, OnInit } from '@angular/core';
import { ListService } from '../list.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogCreateListComponent } from '../dialog-create-list/dialog-create-list.component';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../confirm-dialog/confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogUpdateListComponent } from '../dialog-update-list/dialog-update-list.component';


@Component({
  selector: 'app-list-card',
  templateUrl: './list-card.component.html',
  styleUrls: ['./list-card.component.less']
})
export class ListCardComponent implements OnInit {

  @Input() list: any;

  constructor(private snackbar: MatSnackBar, public lists: ListService, public dialog: MatDialog) { }

  animal: string | undefined;
  name: string | undefined;

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogUpdateListComponent, {
      width: '550px',
      data: {name: this.name, animal: this.animal},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  ngOnInit(): void {
  }

  deleteList(listUUID: string) {
    const dialogData = new ConfirmDialogModel(
      "Eliminar lista",
      "¿Estás seguro de que quieres eliminar esta lista?",
      "Salir",
      "Eliminar"
    )

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '550px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.lists.deleteList(listUUID);
        this.snackbar.open('Lista eliminada', '', {
          duration: 2000
        });
      }
    });

  }

}
