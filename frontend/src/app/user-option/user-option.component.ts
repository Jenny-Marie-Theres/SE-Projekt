import {Component, OnInit} from '@angular/core';

import {DialogtemComponent} from "../dialogtem/dialogtem.component";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DeleteUserDialogComponent} from "../delete-user.dialog/delete-user.dialog.component";
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import axios from "axios";
import {User} from "../../models/user.model";


@Component({
  selector: 'app-user-option',
  templateUrl: './user-option.component.html',
  styleUrls: ['./user-option.component.scss']
})
export class UserOptionComponent implements OnInit{
  updateForm: FormGroup;
  user: User = new User('', '', {street: '', city: '', houseNumber: '', postalCode: ''},'','', [])
oldEmail: string = '';
  ngOnInit() {
    // token holen und damit auch nutzer
    const token = localStorage.getItem('token');
    if (token) {
      const tokenParts = token.split('.');
      if (tokenParts.length === 3) {
        const payloadBase64 = tokenParts[1];
        const payloadJson = atob(payloadBase64);
        const payload = JSON.parse(payloadJson);
        const eMail = payload.eMail;
        this.oldEmail = eMail;
        this.getUser(eMail);
      } else {
        console.error('Invalid JWT format');
      }
    }
  }

  constructor( public dialog: MatDialog,private fb: FormBuilder) {
    this.updateForm = this.fb.group({
      firstName: [this.user.firstName, Validators.required],
      lastName: [this.user.lastName, Validators.required],
      street: [this.user.address.street, Validators.required],
      houseNumber: [this.user.address.houseNumber, Validators.required],
      city: [this.user.address.city, Validators.required],
      postalCode: [this.user.address.postalCode, Validators.required],
      eMail: [this.user.eMail,{ validators: [Validators.required, Validators.email],
        asyncValidators: [this.checkUniqueEMail.bind(this)], // Async-Validator für Eindeutigkeitsprüfung
        updateOn: 'blur' // Prüfen Sie die Eindeutigkeit beim Verlassen des Feldes
  }
  ],
      password: ['', [Validators.required,  Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z\d]).{8,}$/),]],
      passwordRe: ['', Validators.required],
    },{
      validators: this.passwordsMatchValidator

    });
  }
  passwordsMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const passwordRe = control.get('passwordRe');

    if (password && passwordRe && password.value !== passwordRe.value) {
      passwordRe.setErrors({ passwordsMismatch: true });
      return { passwordsMismatch: true };
    } else {
      // passwordRe.setErrors(null);
      return null;
    }
  }

 getUser(eMail : string){
   axios.get('http://localhost:3000/user/email/' + eMail)
       .then(
           response =>  {

             this.user = response.data;
             this.updateForm.patchValue({
               firstName: this.user.firstName,
               lastName: this.user.lastName,
               street: this.user.address.street,
               houseNumber: this.user.address.houseNumber,
               city: this.user.address.city,
               postalCode: this.user.address.postalCode,
               eMail: this.user.eMail,
             });

           })
       .catch(error => {
         console.error('Fehler beim Abrufen der Daten:', error);

       });
 }


  save(): void {

    if(this.updateForm?.valid) {
      if (this.updateForm.get('firstName')?.dirty) {
        this.user.firstName = this.updateForm.get('firstName')?.value;
      }

      if (this.updateForm.get('lastName')?.dirty) {
        this.user.lastName = this.updateForm.get('lastName')?.value;
      }

      if (this.updateForm.get('street')?.dirty) {
        this.user.address.street = this.updateForm.get('street')?.value;
      }

      if (this.updateForm.get('houseNumber')?.dirty) {
        this.user.address.houseNumber = this.updateForm.get('houseNumber')?.value;
      }

      if (this.updateForm.get('city')?.dirty) {
        this.user.address.city = this.updateForm.get('city')?.value;
      }

      if (this.updateForm.get('postalCode')?.dirty) {
        this.user.address.postalCode = this.updateForm.get('postalCode')?.value;
      }

      if (this.updateForm.get('eMail')?.dirty) {
        this.user.eMail = this.updateForm.get('eMail')?.value;
      }
      this.user.password = this.updateForm.get('password')?.value;
        console.log(this.user)
      axios.put('http://localhost:3000/user/update/'+this.oldEmail, this.user)
          .then(response => {

              axios.get('http://localhost:3000/auth/newToken/'+this.user.eMail)
                  .then((response) => {
                      const newToken = response.data;
                      localStorage.setItem('token', newToken);
                      console.log('Neues Token erhalten:', newToken);
                  })
                  .catch((error) => {
                      console.error('Fehler beim Aktualisieren des Tokens:', error);
                  });
          })
          .catch(error => {
            console.error('Fehler beim Aktualisieren der Daten:', error);
          });
        this.dialog.open(DialogtemComponent, {data: {title: "Änderungen gespeichert", content: "Ihre Daten wurden erfolgreich geändert"},});
    }
  }
  checkUniqueEMail(control: AbstractControl): Promise<ValidationErrors | null> {
    const eMail = control.value;
    if( this.oldEmail === this.updateForm.get('eMail')?.value){
      return Promise.resolve(null);
    }
    else {
      return new Promise((resolve, reject) => {
        if (eMail) {
          axios
              .get<number>('http://localhost:3000/user/uniqueEMail/' + eMail)
              .then((response) => {
                const isUnique = response.data;
                if (isUnique) {
                  this.user.eMail = this.updateForm.get('eMail')?.value;
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
  delete(){
    this.dialog.open(DeleteUserDialogComponent, {data: this.user});
  }
}
