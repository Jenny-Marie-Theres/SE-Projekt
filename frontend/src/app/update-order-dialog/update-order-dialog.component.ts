import {Component, Inject} from '@angular/core';
import {Order, Status} from "../../models/order.model";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DialogtemComponent} from "../dialogtem/dialogtem.component";
import axios from "axios";

@Component({
  selector: 'app-update-order-dialog',
  templateUrl: './update-order-dialog.component.html',
  styleUrls: ['./update-order-dialog.component.scss']
})
export class UpdateOrderDialogComponent {
  order: Order;
  statusarr = Object.values(Status);
  constructor( public dialog: MatDialog, public dialogRef: MatDialogRef<UpdateOrderDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: any) {
    this.order = { ...data };
  }
  onSaveClick(): void {
    axios.put('http://localhost:3000/order/update-status/' + this.order.status, this.order)
      .then((response) => {
        console.log('Erfolgreich aktualisiert:', response.data);
        this.dialog.open(DialogtemComponent,{ data: {title: "Bestellung aktualisiert", content: "Ihre Änderungen wurden erfolgreich gespeichert"},});
        this.dialogRef.close();
      })
      .catch((error) => {
        console.error('Fehler beim Aktualisieren:', error);
      });

  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
