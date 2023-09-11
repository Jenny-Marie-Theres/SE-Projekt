import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";

import {FillingOption, Outside, Sauce, Sushi} from "../../models/sushi.model";
import {DialogtemComponent} from "../dialogtem/dialogtem.component";
import {UpdateSushiDialogComponent} from "../update-sushi-dialog/update-sushi-dialog.component";
import {CreateSushiAdminUserComponent} from "../create-sushi-admin-user/create-sushi-admin-user.component";
import axios from "axios";

@Component({
  selector: 'app-admin-sushi',
  templateUrl: './admin-sushi.component.html',
  styleUrls: ['./admin-sushi.component.scss']
})
export class AdminSushiComponent implements OnInit {
  searchTerm: string = '';
  filteredSushiList: Sushi[] = [];
  sushi: Sushi[] = [];
  prices: number[] = [];
  eMail: string = '';
  role: string = '';
  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    // fav sushis laden
    const token = localStorage.getItem('token');
    if (token) {
      const tokenParts = token.split('.');
      if (tokenParts.length === 3) {
        const payloadBase64 = tokenParts[1];
        const payloadJson = atob(payloadBase64);
        const payload = JSON.parse(payloadJson);
        this.eMail = payload.eMail;
        this.role = payload.role;
        // endpint aufrfen
        this.getSushi(this.eMail);
      } else {
        console.error('Invalid JWT format');
      }
    }
  }

  getSushi(eMail: string) {

    // endpoint user finden
    axios.get(`http://localhost:3000/admin/sushi/${eMail}`)
        .then(response => {

          this.sushi= response.data;

          // Preis berechnen
          for (let i = 0; i < this.sushi.length; i++) {

            this.calculatePriceForSushi(this.sushi[i], i);
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
  }

  calculatePriceForSushi(sushi: Sushi, index: number){
    axios.post<number>('http://localhost:3000/sushi/price', sushi)
        .then(
            response =>  {

              this.prices[index] = response.data;

            })
        .catch(error => {
          console.error('Fehler beim Abrufen des Preises:', error);
          undefined;
        });
  }
  updateSushi(sushi: Sushi) {
    const data = {
      sushi: sushi,
      email: this.eMail,
      role: this.role
    };
    this.dialog.open(UpdateSushiDialogComponent,{ data: data});
  }
  createSushi(){
    this.dialog.open(CreateSushiAdminUserComponent);
  }
  deleteFavSushi(sushi: Sushi){
    axios.delete('http://localhost:3000/admin/sushi/delete/' +sushi.name + '/'+ this.eMail)
        .then((response) => {
          this.dialog.open(DialogtemComponent,{ data: {title: "Sushi gelöscht", content: "Das Sushi wurde erflogreich gelöscht"},});
          // Hier können Sie weitere Aktionen ausführen, wenn die Löschung erfolgreich war
        })
        .catch((error) => {
          console.error('Fehler beim Löschen des Sushis:', error);
          // Hier können Sie Fehlerbehandlungsmaßnahmen ergreifen
        });

  }

  filterSushiList() {
    this.filteredSushiList = this.sushi.filter(sushi => {
      return sushi.name.toLowerCase().includes(this.searchTerm.toLowerCase());
    });
  }

}
