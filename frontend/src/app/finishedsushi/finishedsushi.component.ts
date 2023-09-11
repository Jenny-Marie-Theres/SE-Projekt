import {Component, OnInit} from '@angular/core';
import {FillingOption, Outside, Sauce, Sushi} from "../../models/sushi.model";
import {SushiOrder} from "../../models/sushi-order.model";
import {MatDialog, } from "@angular/material/dialog";
import {SushiCount} from "../../models/sushi-count.model";
import {DialogtemComponent} from "../dialogtem/dialogtem.component";
import axios from "axios";

@Component({
  selector: 'app-finishedsushi',
  templateUrl: './finishedsushi.component.html',
  styleUrls: ['./finishedsushi.component.scss']
})
export class FinishedsushiComponent implements OnInit {
  constructor(public dialog: MatDialog) {}
  sushiOrders: SushiOrder[] = [];
  sushiFin: SushiCount[] = [];
  prices: number[] = [];
  totalPrice = 0;
  searchTerm: string = '';
  filteredSushiList: SushiCount[] = []

  ngOnInit(): void {
// warenkorb laden
    const storedSushiOrders = localStorage.getItem('sushiOrders');
    if (storedSushiOrders) {
      this.sushiOrders = JSON.parse(storedSushiOrders);
    }
// fin sushis laden

        this.getFinSushi('admin@admin.de');


// Preis insgesamt laden
    const storedTotalPrice = localStorage.getItem('totalPrice');
    if (storedTotalPrice) {
      this.totalPrice = JSON.parse(storedTotalPrice);
    }
  }

  calculatePriceForSushiCount(sushiFin: SushiCount, index: number){
    const sushi = new Sushi(sushiFin.name, sushiFin.fillings, sushiFin.outside, sushiFin.sauce, sushiFin.fried)

    axios.post<number>('http://localhost:3000/sushi/price', sushi)
        .then(
            response =>  {

              this.prices[index] = response.data;

            })
        .catch(error => {
          console.error('Fehler beim Abrufen des Preises:', error);

        });
  }

  calculateTotalPrice(count: number, price: number){

    this.totalPrice = this.totalPrice + (count* price);
    localStorage.setItem('totalPrice', JSON.stringify(this.totalPrice));

  }

  getFinSushi(eMail: string){

    // endpoint user finden
    axios.get(`http://localhost:3000/admin/sushi/${eMail}`)
        .then(response => {

          const finSushis: Sushi[] = response.data;
          for (const sushi of finSushis) {
            const sushiCount = new SushiCount(
                sushi.name,
                sushi.fillings,
                sushi.outside,
                sushi.sauce,
                sushi.fried
            );
            this.sushiFin.push(sushiCount);
          }
          for (let i = 0; i < this.sushiFin.length; i++) {
            this.calculatePriceForSushiCount(this.sushiFin[i], i);
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });


  };
  addToOrder(sushiCount: SushiCount) {
    const sushi = new Sushi(sushiCount.name, sushiCount.fillings, sushiCount.outside, sushiCount.sauce, sushiCount.fried)
    const storedSushiOrders = localStorage.getItem('sushiOrders');
    if (storedSushiOrders) {
      this.sushiOrders = JSON.parse(storedSushiOrders);
    }
    const existingOrder = this.sushiOrders.find(order => order.sushi === sushi);

    if (existingOrder) {
      existingOrder.count = + sushiCount.count;
    } else {
      const newOrder = new SushiOrder(sushi, sushiCount.count);
      this.sushiOrders.push(newOrder);
    }
    localStorage.setItem('sushiOrders', JSON.stringify(this.sushiOrders));
    // totalCosten ergänzen:
    this.calculatePriceForSushi(sushi).then(price => {
      if (price) {
        this.calculateTotalPrice(sushiCount.count, price);
      }
    });
    this.dialog.open(DialogtemComponent,{ data: {title: "Erfolgreich hinzugefügt", content: "Sushi zum Warenkorb hinzugefügt"},});
  }
  calculatePriceForSushi(sushi: Sushi):Promise<number | undefined>{
    return axios.post<number>('http://localhost:3000/sushi/price', sushi)
        .then(
            response => response.data
        )
        .catch(error => {
          console.error('Fehler beim Abrufen des Preises:', error);
          return undefined;
        });
  }
  filterSushiList() {
    this.filteredSushiList = this.sushiFin.filter(sushi => {
      return sushi.name.toLowerCase().includes(this.searchTerm.toLowerCase());
    });
  }
}
