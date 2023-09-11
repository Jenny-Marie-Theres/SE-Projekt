import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-main',
  templateUrl: './admin-main.component.html',
  styleUrls: ['./admin-main.component.scss']
})
export class AdminMainComponent {
sushi = true;
order = false;

  onButtonClick(buttonType: string) {
    if (buttonType === 'sushi') {
      this.sushi = true;
      this.order = false;
    } else if (buttonType === 'order') {
      this.sushi = false;
      this.order = true;

    }
  }
}
