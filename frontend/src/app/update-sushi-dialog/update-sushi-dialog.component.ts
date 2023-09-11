import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FillingOption, Outside, Sauce, Sushi} from "../../models/sushi.model";
import {DialogtemComponent} from "../dialogtem/dialogtem.component";
import axios from "axios";
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";

@Component({
  selector: 'app-update-sushi-dialog',
  templateUrl: './update-sushi-dialog.component.html',
  styleUrls: ['./update-sushi-dialog.component.scss']
})
export class UpdateSushiDialogComponent {
  sushi: Sushi;
  fillingOptions = Object.values(FillingOption);
  outsideOptions = Object.values(Outside);
  sauceOptions = Object.values(Sauce);
  sushiOldName;
  eMail:string;
  newSushiName:string = '';
  role: string;

    nameFormGroup : FormGroup;
  constructor( public dialog: MatDialog, public dialogRef: MatDialogRef<UpdateSushiDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: any) {
    this.sushi = { ...data.sushi };
      this.eMail = data.email;
      this.sushiOldName = this.sushi.name;
      this.role = data.role;

      this.nameFormGroup = new FormGroup({
          'sushiName': new FormControl(this.sushi.name, {
              validators: [Validators.required],
              asyncValidators: [this.checkUniqueName.bind(this)], // Async-Validator für Eindeutigkeitsprüfung
              updateOn: 'blur' // Prüfen Sie die Eindeutigkeit beim Verlassen des Feldes
          }),
      });
  }



checkUniqueName(control: AbstractControl): Promise<ValidationErrors | null> {
    const sushiName = control.value;
if( this.sushiOldName === sushiName){
    return Promise.resolve(null);
}
else {
    return new Promise((resolve, reject) => {
        if (sushiName) {
            axios
                .get<number>('http://localhost:3000/sushi/uniqueName/' + sushiName)
                .then((response) => {
                    const isUnique = response.data;
                    if (isUnique) {
                        this.newSushiName = sushiName;
                        resolve(null); // Name ist eindeutig, keine Fehler
                    } else {
                        resolve({notUnique: true}); // Name ist nicht eindeutig, Fehler melden
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
}
onSaveClick(): void {

      if(this.nameFormGroup.valid){
        if(this.nameFormGroup.get('sushiName')?.value !== this.sushiOldName) {
            this.sushi.name = this.newSushiName;
        }
        if(this.role === 'user') {
            axios.put('http://localhost:3000/user/sushi/change/' + this.sushiOldName + '/' + this.eMail, this.sushi)
                .then(response => {
                    console.log('Sushi erfolgreich aktualisiert:', response.data);
                    this.dialog.open(DialogtemComponent, {data: {title: "Sushi aktualisiert", content: "Ihre Änderungen wurden erfolgreich gespeichert"},});
                })
                .catch(error => {
                    console.error('Fehler beim Aktualisieren des Sushis:', error);
                });
        }
        else if(this.role === 'admin'){

            axios.put('http://localhost:3000/admin/sushi/change/' + this.sushiOldName + '/' + this.eMail, this.sushi)
                .then(response => {
                    console.log('Sushi erfolgreich aktualisiert:', response.data);
                    this.dialog.open(DialogtemComponent, {data: {title: "Sushi aktualisiert", content: "Ihre Änderungen wurden erfolgreich gespeichert"},});
                })
                .catch(error => {
                    console.error('Fehler beim Aktualisieren des Sushis:', error);
                });

        }
          this.dialogRef.close();
      }

  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
