import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ThanksDialogComponent} from "../thanks-dialog/thanks-dialog.component";
import {SushiOrder} from "../../models/sushi-order.model";
import {Order, Status} from "../../models/order.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import axios from "axios";
import {Router} from "@angular/router";

@Component({
  selector: 'app-get-address-dialog',
  templateUrl: './get-address-dialog.component.html',
  styleUrls: ['./get-address-dialog.component.scss']
})
export class GetAddressDialogComponent implements OnInit {
order: Order = {orderItems: [],status: Status.RECEIVED, totalPrice: 0,  address: {street:'',
    houseNumber: '',
    city: '',
    postalCode: ''}, lastName: ''}
  addressForm: FormGroup;
  ngOnInit(): void {
    const storedSushiOrders = localStorage.getItem('sushiOrders');
    if (storedSushiOrders) {
      this.order.orderItems= JSON.parse(storedSushiOrders);
    }
    const storedTotalPrice = localStorage.getItem('totalPrice');
    if (storedTotalPrice) {
      this.order.totalPrice = JSON.parse(storedTotalPrice);
    }
  }
  constructor(private router: Router,
    public dialogRef: MatDialogRef<GetAddressDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog,
    private fb: FormBuilder
  ) {this.addressForm = this.fb.group({
    lastName: ['', Validators.required],
    street: ['', Validators.required],
    houseNumber: ['', Validators.required],
    city: ['', Validators.required],
    postalCode: ['', Validators.required]});
  }
  onCancelClick(): void {
    this.dialogRef.close();
  }



  onOrderClick(): void {
    if (this.addressForm?.valid) {
      // orders objekt befüllen
      this.order.lastName = this.addressForm.get('lastName')?.value;
      this.order.address.city= this.addressForm.get('city')?.value;
      this.order.address.street= this.addressForm.get('street')?.value;
      this.order.address.postalCode= this.addressForm.get('postalCode')?.value;
      this.order.address.houseNumber= this.addressForm.get('houseNumber')?.value;
      console.log(this.order)
      axios.post('http://localhost:3000/order/create', this.order)
        .then(response => {
          console.log(response.data)
          this.dialog.open(ThanksDialogComponent);
          // localstorge für neue bestellung
          localStorage.removeItem('totalPrice');
          localStorage.removeItem('sushiOrders');
        })
        .catch(error => {
          // Fehler beim Aufrufen des Endpunkts
          console.error('Fehler bei der Registrierung:', error);
        });

    this.dialogRef.close(this.order.address);
    }
  }
}
