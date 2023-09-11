import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {FillingOption, Outside, Sauce, Sushi} from "../../models/sushi.model";
import {SushiOrder} from "../../models/sushi-order.model";
import {DialogtemComponent} from "../dialogtem/dialogtem.component";
import {MatDialog} from "@angular/material/dialog";
import axios from "axios";


@Component({
  selector: 'app-create-sushi',
  templateUrl: './create-sushi.component.html',
  styleUrls: ['./create-sushi.component.scss']
})
export class CreateSushiComponent implements OnInit{
  // for Price
  sushiPricesSauce: { [sauceOption: string]: number } = {};
  sushiPricesOutside: { [outsideOption: string]: number } = {};
  sushiPricesFilling: { [outsideOption: string]: number } = {};

  // for sushi save
  selectedFillings: FillingOption[] = [];
  selectedOutside: Outside= Outside.NONE;
  selectedSauce: Sauce  = Sauce.NONE;
  selectedFried: boolean  = false;

  //for order
  count: number = 0;
  totalPrice = 0;

  outsideFormGroup = this._formBuilder.group({
    selectedOutside: [null, Validators.required],
  });
  sauceFormGroup = this._formBuilder.group({
    selectedSauce: [null, Validators.required],
  });

  friedFormGroup = this._formBuilder.group({
    fried: [null, Validators.required],
  });

  outsideOptions = Object.values(Outside);
  fillingOptions = Object.values(FillingOption);
  sauceOptions = Object.values(Sauce);
  constructor(private _formBuilder: FormBuilder, public dialog: MatDialog) {}
  ngOnInit(): void {
    for (const fillingOption of this.fillingOptions) {
      this.calculatePriceFilling(fillingOption);
    }
    for (const sauceOption of this.sauceOptions) {
      this.calculatePriceSauce(sauceOption);
    }
    for (const outsideOption of this.outsideOptions) {
      this.calculatePriceOutside(outsideOption);
    }
    const storedTotalPrice = localStorage.getItem('totalPrice');
    if (storedTotalPrice) {
      this.totalPrice = JSON.parse(storedTotalPrice);
    }
  }

  sushiOrders: SushiOrder[] = [];

  addToOrder( count: number) {
    const sushi: Sushi = {
      name: '',
      fillings: this.selectedFillings,
      outside: this.selectedOutside,
      sauce: this.selectedSauce,
      fried: this.selectedFried,
    };
    const storedSushiOrders = localStorage.getItem('sushiOrders');
    if (storedSushiOrders) {
      this.sushiOrders = JSON.parse(storedSushiOrders);
    }
    const existingOrder = this.sushiOrders.find(order => order.sushi === sushi);

    if (existingOrder) {
      existingOrder.count = + count;
    } else {
      const newOrder = new SushiOrder(sushi, count);
      this.sushiOrders.push(newOrder);
    }
    localStorage.setItem('sushiOrders', JSON.stringify(this.sushiOrders));

    // totalCosten ergänzen:
    this.calculatePriceForSushi(sushi).then(price => {
      if (price) {
        this.calculateTotalPrice(count, price);
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
  calculateTotalPrice(count: number, price: number){

    this.totalPrice = this.totalPrice + (count* price);
    console.log("#####"+ this.totalPrice);
    localStorage.setItem('totalPrice', JSON.stringify(this.totalPrice));

  }
  calculatePriceFilling(fillingOption: string) {
    const sushi: Sushi = {
      name: '', // Setze den Sushi-Namen entsprechend
      fillings: [fillingOption as FillingOption], // Setze die Füllungen entsprechend
      outside: Outside.NONE, // Setze die Ummantelung entsprechend
      sauce: Sauce.NONE, // Setze die Sauce entsprechend
      fried: false, // Setze die gebratene Option entsprechend
    };
    axios.post<number>('http://localhost:3000/sushi/price', sushi)
        .then(response => {
          this.sushiPricesFilling[fillingOption] = response.data;
        })
        .catch(error => {
          console.error('Fehler beim Abrufen des Preises:', error);
        });
  }

  calculatePriceOutside(outsideOption: string) {
    const sushi: Sushi = {
      name: '', // Setze den Sushi-Namen entsprechend
      fillings: [FillingOption.NONE], // Setze die Füllungen entsprechend
      outside: outsideOption as Outside, // Setze die Ummantelung entsprechend
      sauce: Sauce.NONE, // Setze die Sauce entsprechend
      fried: false, // Setze die gebratene Option entsprechend
    };

    axios.post<number>('http://localhost:3000/sushi/price', sushi)
        .then(response => {
          this.sushiPricesOutside[outsideOption] = response.data;
        })
        .catch(error => {
          console.error('Fehler beim Abrufen des Preises:', error);
        });
  }

  calculatePriceSauce(sauceOption: string) {
    const sushi: Sushi = {
      name: '', // Setze den Sushi-Namen entsprechend
      fillings: [FillingOption.NONE], // Setze die Füllungen entsprechend
      outside: Outside.NONE, // Setze die Ummantelung entsprechend
      sauce: sauceOption as Sauce, // Setze die Sauce entsprechend
      fried: false, // Setze die gebratene Option entsprechend
    };
    axios.post<number>('http://localhost:3000/sushi/price', sushi)
        .then(response => {
          this.sushiPricesSauce[sauceOption] = response.data;
        })
        .catch(error => {
          console.error('Fehler beim Abrufen des Preises:', error);
        });
  }

  addToSelectedFillings(filling: string) {
    const fillingOption = filling as FillingOption;

    // Prüfen, ob die Füllung bereits ausgewählt wurde
    const index = this.selectedFillings.indexOf(fillingOption);

    if (index !== -1) {
      // Wenn die Füllung bereits ausgewählt wurde, entfernen Sie sie aus der Liste
      this.selectedFillings.splice(index, 1);
    } else {
      // Andernfalls fügen Sie sie zur Liste der ausgewählten Füllungen hinzu
      this.selectedFillings.push(fillingOption);
    }
  }

  addToSelectedOutside(outside: string) {
   this.selectedOutside = outside as Outside;
  }

  addToSelectedSauce(sauce: string) {
    this.selectedSauce = sauce as Sauce;
  }

  addToSelectedFried(fried: boolean) {

     this.selectedFried = fried;
  }
}
