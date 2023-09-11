import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {SushiOrder} from "../../models/sushi-order.model";
import {SushiCount} from "../../models/sushi-count.model";
import {FillingOption, Outside, Sauce, Sushi} from "../../models/sushi.model";
import {DialogtemComponent} from "../dialogtem/dialogtem.component";
import axios from "axios";


@Component({
  selector: 'app-favoritsushi',
  templateUrl: './favoritsushi.component.html',
  styleUrls: ['./favoritsushi.component.scss']
})
export class FavoritsushiComponent implements OnInit {
  sushiOrders: SushiOrder[] = [];
  sushiFav: SushiCount[] = [];
  prices: number[] = [];
  totalPrice = 0;
  searchTerm: string = '';
  filteredSushiList: SushiCount[] = [];
  ngOnInit(): void {
// warenkorb laden
    const storedSushiOrders = localStorage.getItem('sushiOrders');
    if (storedSushiOrders) {
      this.sushiOrders = JSON.parse(storedSushiOrders);
    }
// fav sushis laden
    const token = localStorage.getItem('token');
    if (token) {
      const tokenParts = token.split('.');
      if (tokenParts.length === 3) {
        const payloadBase64 = tokenParts[1];
        const payloadJson = atob(payloadBase64);
        const payload = JSON.parse(payloadJson);
          const eMail = payload.eMail;
          this.getFavSushi(eMail);
      } else {
          console.error('Invalid JWT format');
      }
    }

// Preis insgesamt laden
    const storedTotalPrice = localStorage.getItem('totalPrice');
    if (storedTotalPrice) {
      this.totalPrice = JSON.parse(storedTotalPrice);
    }


  }
  constructor(public dialog: MatDialog) {}

  calculatePriceForSushiCount(sushiFav: SushiCount, index: number){
    const sushi = new Sushi(sushiFav.name, sushiFav.fillings, sushiFav.outside, sushiFav.sauce, sushiFav.fried)

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

  getFavSushi(eMail: string){

    // endpoint user finden
    axios.get(`http://localhost:3000/user/sushi/${eMail}`)
      .then(response => {

          const favoriteSushis: Sushi[] = response.data;
          for (const sushi of favoriteSushis) {
              const sushiCount = new SushiCount(
                  sushi.name,
                  sushi.fillings,
                  sushi.outside,
                  sushi.sauce,
                  sushi.fried
              );
              this.sushiFav.push(sushiCount);
          }
        for (let i = 0; i < this.sushiFav.length; i++) {
          this.calculatePriceForSushiCount(this.sushiFav[i], i);
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
    this.filteredSushiList = this.sushiFav.filter(sushi => {
      return sushi.name.toLowerCase().includes(this.searchTerm.toLowerCase());
    });
  }
}
