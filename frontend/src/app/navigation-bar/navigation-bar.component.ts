import { Component } from '@angular/core';
import {Router} from "@angular/router";
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent {
  constructor(private router: Router) { }
  logOut(){
    localStorage.removeItem('sushiOrders');
    localStorage.removeItem('token');
    localStorage.removeItem('totalPrice');
    this.router.navigateByUrl('')
  }
  toUserUpdate(){
    this.router.navigateByUrl('user/einstellungen')

}
  toOrder(){
    this.router.navigateByUrl('bestellen');
  }
  toFavoriteSushiUpdate(){
    this.router.navigateByUrl('user/favoritSushi');
  }
  checkToken(): boolean {
    const token = localStorage.getItem('token');
    if (!token) {
      return false; // Token nicht vorhanden
    }

    try {
      const tokenData: any = jwt_decode(token); // Token entschlüsseln

      // Überprüfen, ob die Rolle 'user' ist
      if (tokenData.role === 'user') {
        return true;
      }
    } catch (error) {
      console.error('Falsche Rolle', error);
    }

    return false;
  }
}
