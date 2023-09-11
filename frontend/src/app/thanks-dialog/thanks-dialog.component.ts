import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-thanks-dialog',
  templateUrl: './thanks-dialog.component.html',
  styleUrls: ['./thanks-dialog.component.scss']
})
export class ThanksDialogComponent {
  constructor(private router: Router, public dialogRef: MatDialogRef<ThanksDialogComponent>) { }
  Close(){
    this.router.navigateByUrl('bestellen');
    this.dialogRef.close();
  }
}
