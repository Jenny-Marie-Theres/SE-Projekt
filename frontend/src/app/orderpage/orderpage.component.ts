import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-orderpage',
  templateUrl: './orderpage.component.html',
  styleUrls: ['./orderpage.component.scss'],

})
export class OrderpageComponent implements OnInit{
  showSushiComponent = true;
  showFinishedSushiComponent = false;
  showFavoritSushi: boolean = false;
  totalPrice = 0;

  ngOnInit(): void {
    const storedTotalPrice = localStorage.getItem('totalPrice');
    if (storedTotalPrice) {
      this.totalPrice = JSON.parse(storedTotalPrice);
    }

  }
  constructor(private router: Router) { }
  onButtonClick(buttonType: string) {
    if (buttonType === 'Individuell') {
      this.showSushiComponent = true;
      this.showFinishedSushiComponent = false;
      this.showFavoritSushi = false;
    } else if (buttonType === 'Sushi-Auswahl') {
      this.showSushiComponent = false;
      this.showFinishedSushiComponent = true;
      this.showFavoritSushi = false;
    }else if(buttonType === 'Favoriten') {
      this.showSushiComponent = false;
      this.showFinishedSushiComponent = false;
      this.showFavoritSushi = true;
    }
  }
  toShoppingCart(){
    this.router.navigateByUrl('warenkorb');
  }
}
