import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-toolbar-order',
  templateUrl: './admin-toolbar-order.component.html',
  styleUrls: ['./admin-toolbar-order.component.scss']
})
export class AdminToolbarOrderComponent {
  selectedTab: string = 'Erhaltene Bestellungen'; // Initialer Tab

  emitButtonClick(buttonType: string): void {
    this.selectedTab = buttonType;
  }
}
