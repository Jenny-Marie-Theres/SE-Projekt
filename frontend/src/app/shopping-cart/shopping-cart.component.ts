import {Component, OnInit} from '@angular/core';
import {SushiCount} from "../../models/sushi-count.model";
import {FillingOption, Outside, Sauce, Sushi} from "../../models/sushi.model";
import {OrderpageComponent} from "../orderpage/orderpage.component";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {GetAddressDialogComponent} from "../get-address-dialog/get-address-dialog.component";
import {SushiOrder} from "../../models/sushi-order.model";
import axios from "axios";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  sushiOrders: SushiOrder[] = [];
  prices: number[] = [];
  totalPrice = 0;


  ngOnInit(): void {
    const storedSushiOrders = localStorage.getItem('sushiOrders');
    if (storedSushiOrders) {
      this.sushiOrders = JSON.parse(storedSushiOrders);
    }
    const storedTotalPrice = localStorage.getItem('totalPrice');
    if (storedTotalPrice) {
      this.totalPrice = JSON.parse(storedTotalPrice);
    }
    for (let i = 0; i < this.sushiOrders.length; i++) {
      this.calculatePriceForSushi(this.sushiOrders[i], i);
    }
  }
  constructor(private router: Router, public dialog: MatDialog) { }
  calculatePriceForSushi(sushiOrder: SushiOrder, index: number){
     axios.post<number>('http://localhost:3000/sushi/price', sushiOrder.sushi)
        .then(
            response =>  {

              this.prices[index] = response.data;
            })
        .catch(error => {
          console.error('Fehler beim Abrufen des Preises:', error);

        });
  }


  toAddress(){
    this.dialog.open(GetAddressDialogComponent);
  }
  toOrder(){
    this.router.navigateByUrl('bestellen');
  }

}
