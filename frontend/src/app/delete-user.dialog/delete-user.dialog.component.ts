import {Component, Inject} from '@angular/core';
import {User} from "../../models/user.model";
import {Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import axios from "axios";

@Component({
  selector: 'app-delete-user.dialog',
  templateUrl: './delete-user.dialog.component.html',
  styleUrls: ['./delete-user.dialog.component.scss']
})
export class DeleteUserDialogComponent {
  user;
  constructor(
    public dialogRef: MatDialogRef<DeleteUserDialogComponent>,
    private router: Router ,@Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.user = { ...data };
  }
deleteUser(){
  axios.delete('http://localhost:3000/user/delete/'+this.user.eMail)
      .then((response) => {
        console.log('User erfolgreich gelöscht:', response.data);
        this.router.navigateByUrl('');
        this.dialogRef.close('deleted');
      })
      .catch((error) => {
        console.error('Fehler beim Löschen des Users:', error);
      });


}
}
