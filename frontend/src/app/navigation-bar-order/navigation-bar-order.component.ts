import {Component, EventEmitter, Input, Output} from '@angular/core';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-navigation-bar-order',
  templateUrl: './navigation-bar-order.component.html',
  styleUrls: ['./navigation-bar-order.component.scss']
})
export class NavigationBarOrderComponent {
  @Output() buttonClick = new EventEmitter<string>();

  emitButtonClick(buttonType: string) {
    this.buttonClick.emit(buttonType);
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
