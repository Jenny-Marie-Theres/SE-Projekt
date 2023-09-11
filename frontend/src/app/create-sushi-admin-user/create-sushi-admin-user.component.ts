import {Component, OnInit} from '@angular/core';
import {FillingOption, Outside, Sauce, Sushi} from "../../models/sushi.model";
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {SushiOrder} from "../../models/sushi-order.model";
import axios from "axios";
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-create-sushi-admin-user',
  templateUrl: './create-sushi-admin-user.component.html',
  styleUrls: ['./create-sushi-admin-user.component.scss']
})
export class CreateSushiAdminUserComponent implements OnInit{
  // for Price
  sushiPricesSauce: { [sauceOption: string]: number } = {};
  sushiPricesOutside: { [outsideOption: string]: number } = {};
  sushiPricesFilling: { [outsideOption: string]: number } = {};

  // for sushi save
  selectedFillings: FillingOption[] = [];
  selectedOutside: Outside= Outside.NONE;
  selectedSauce: Sauce  = Sauce.NONE;
  selectedFried: boolean  = false;
  sushiName: string = '';


  sushiOrders: SushiOrder[] = [];

  outsideFormGroup = this._formBuilder.group({
    selectedOutside: [null, Validators.required],
  });
  sauceFormGroup = this._formBuilder.group({
    selectedSauce: [null, Validators.required],
  });

  friedFormGroup = this._formBuilder.group({
    fried: [null, Validators.required],
  });
  sushiFormGroup: FormGroup;

  outsideOptions = Object.values(Outside);
  fillingOptions = Object.values(FillingOption);
  sauceOptions = Object.values(Sauce);



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

  }
  constructor(private _formBuilder: FormBuilder, public dialog: MatDialog, public dialogRef: MatDialogRef<CreateSushiAdminUserComponent>, private snackBar: MatSnackBar) {
     this.sushiFormGroup = new FormGroup({
       'sushiName': new FormControl('', {
         validators: [Validators.required],
         asyncValidators: [this.checkUniqueName.bind(this)], // Async-Validator für Eindeutigkeitsprüfung
         updateOn: 'blur' // Prüfen Sie die Eindeutigkeit beim Verlassen des Feldes
       }),
     });
  }
  checkUniqueName(control: AbstractControl): Promise<ValidationErrors | null> {
    const sushiName = control.value;

    return new Promise((resolve, reject) => {
      if (sushiName) {
        axios
          .get<number>('http://localhost:3000/sushi/uniqueName/' + sushiName)
          .then((response) => {
            const isUnique = response.data;
            if (isUnique) {
              // this.showNotification('Der Name ist nicht eindeutig. Bitte wählen Sie einen anderen Namen.');
              resolve(null); // Name ist eindeutig, keine Fehler
            } else {
              resolve({ notUnique: true }); // Name ist nicht eindeutig, Fehler melden
            }
          })
          .catch((error) => {
            console.error('Fehler beim Überprüfen der Eindeutigkeit des Namens:', error);
            resolve(null);
          });
      } else {
        resolve(null);
      }
    });
  }

  calculatePriceFilling(fillingOption: string) {
    const sushi: Sushi = {
      name: '',
      fillings: [fillingOption as FillingOption],
      outside: Outside.NONE,
      sauce: Sauce.NONE,
      fried: false,
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
      name: '',
      fillings: [FillingOption.NONE],
      outside: outsideOption as Outside,
      sauce: Sauce.NONE,
      fried: false,
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

  saveSushiName() {
    let isUnique: boolean;
    if (this.sushiFormGroup.valid) {
            this.sushiName = this.sushiFormGroup.get('sushiName')?.value;
    }
  }


  saveSushi(){

      const sushi: Sushi = {
        name: this.sushiName,
        fillings: this.selectedFillings,
        outside: this.selectedOutside,
        sauce: this.selectedSauce,
        fried: this.selectedFried,
      };

    const token = localStorage.getItem('token');
    if (token) {
      const tokenParts = token.split('.');
      if (tokenParts.length === 3) {
        const payloadBase64 = tokenParts[1];
        const payloadJson = atob(payloadBase64);
        const payload = JSON.parse(payloadJson);
        const eMail = payload.eMail;
        const role = payload.role;
        if(role === 'user') {
          axios.post<number>('http://localhost:3000/user/sushi/' + eMail, sushi)
              .then()
              .catch(error => {
                console.error('Fehler speichern vom Sushi:', error);

              });
        }
        else if(role === 'admin'){
          axios.post<number>('http://localhost:3000/admin/sushi/' + eMail, sushi)
              .then()
              .catch(error => {
                console.error('Fehler speichern vom Sushi:', error);

              });
        }
    }
      else {
      console.error('Invalid JWT format');
    }
      }
    this.dialogRef.close();
    }
onCancelClick(): void {
  this.dialogRef.close();
}
}

