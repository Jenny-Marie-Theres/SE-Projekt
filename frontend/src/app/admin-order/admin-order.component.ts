import { Component } from '@angular/core';
import {Order, Status} from "../../models/order.model";
import {MatDialog} from "@angular/material/dialog";
import {DialogtemComponent} from "../dialogtem/dialogtem.component";
import {UpdateSushiDialogComponent} from "../update-sushi-dialog/update-sushi-dialog.component";
import {UpdateOrderDialogComponent} from "../update-order-dialog/update-order-dialog.component";
import axios from "axios";

@Component({
  selector: 'app-admin-order',
  templateUrl: './admin-order.component.html',
  styleUrls: ['./admin-order.component.scss']
})
export class AdminOrderComponent {
  orders: Order[] = [];
  constructor(public dialog: MatDialog) {}

  emitButtonClick(buttonType: string) {
    if (buttonType === 'Erhaltene Bestellungen') {
      this.getOrdersForReceived();
    } else if (buttonType === 'Bestellung in Bearbeitung') {
      this.getOrdersForInProgress();
    } else if (buttonType === 'Alle Bestellungen') {
      this.getOrdersForAll();
    }
  }
  deleteOrder(order: Order){
   const orderId: any = order
    axios.delete('http://localhost:3000/order/delete/'+ orderId._id)
      .then((response) => {
        this.dialog.open(DialogtemComponent,{ data: {title: "Bestellung gelöscht", content: "Die Bestellung wurde gelöscht"},});
        // Fügen Sie hier Ihren Code für die Verarbeitung der Antwort ein
      })
      .catch((error) => {
        console.error('Fehler beim Löschen:', error);
        // Fügen Sie hier Ihren Code für die Fehlerbehandlung ein
      });

  }
  updateOrder(order: Order) {
    this.dialog.open(UpdateOrderDialogComponent,{ data: order});
  }

  getOrdersForReceived() {
    axios.get('http://localhost:3000/order/received')
      .then(response => {

        this.orders = response.data;

        // Preis berechnen
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  getOrdersForInProgress() {

    axios.get('http://localhost:3000/order/in-process')
      .then(response => {

        this.orders = response.data;

        // Preis berechnen
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  getOrdersForAll() {

    axios.get('http://localhost:3000/order/all')
      .then(response => {

        this.orders = response.data;

        // Preis berechnen
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

}
