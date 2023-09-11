import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {SushiOrder} from "../../models/sushi-order.model";
import {SushiCount} from "../../models/sushi-count.model";
import {FillingOption, Outside, Sauce, Sushi} from "../../models/sushi.model";
import {DialogtemComponent} from "../dialogtem/dialogtem.component";
import {UpdateSushiDialogComponent} from "../update-sushi-dialog/update-sushi-dialog.component";
import {Router} from "@angular/router";
import {CreateSushiAdminUserComponent} from "../create-sushi-admin-user/create-sushi-admin-user.component";
import axios from "axios";

@Component({
  selector: 'app-update-favorit-sushi',
  templateUrl: './update-favorit-sushi.component.html',
  styleUrls: ['./update-favorit-sushi.component.scss']
})
export class UpdateFavoritSushiComponent  implements OnInit{
  constructor(public dialog: MatDialog, private router: Router) {}
  searchTerm: string = '';
  filteredSushiList: Sushi[] = [];
  sushiFav: Sushi[] = [];
  prices: number[] = [];
  eMail: string = '';
  role: string = '';
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
      this.getFavSushi(this.eMail);
    } else {
      console.error('Invalid JWT format');
    }
  }
}
  getFavSushi(eMail: string) {

    // endpoint user finden
    axios.get(`http://localhost:3000/user/sushi/${eMail}`)
      .then(response => {

        this.sushiFav= response.data;

        // Preis berechnen
        for (let i = 0; i < this.sushiFav.length; i++) {

          this.calculatePriceForSushi(this.sushiFav[i], i);
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
    axios.delete('http://localhost:3000/user/sushi/delete/' +sushi.name + '/'+ this.eMail)
        .then((response) => {
          this.dialog.open(DialogtemComponent,{ data: {title: "Sushi gelöscht", content: "Das Sushi wurde erflogreich aus Ihrer Favoritenliste gelöscht"},});
          // Hier können Sie weitere Aktionen ausführen, wenn die Löschung erfolgreich war
        })
        .catch((error) => {
          console.error('Fehler beim Löschen des Sushis:', error);
          // Hier können Sie Fehlerbehandlungsmaßnahmen ergreifen
        });

  }

  filterSushiList() {
    this.filteredSushiList = this.sushiFav.filter(sushi => {
      return sushi.name.toLowerCase().includes(this.searchTerm.toLowerCase());
    });
  }
}
