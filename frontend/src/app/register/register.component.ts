import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {User} from "../../models/user.model";
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import {Sushi} from "../../models/sushi.model";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  favoriteSushi: Sushi[] = []
  registrationForm: FormGroup;

  constructor(private router: Router, private fb: FormBuilder) {
    this.registrationForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    street: ['', Validators.required],
    houseNumber: ['', Validators.required],
    city: ['', Validators.required],
    postalCode: ['', Validators.required],
    eMail: ['', [Validators.required, Validators.email]],
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
  toOrder(){
    if (this.registrationForm?.valid) {


        const user= this.registrationForm.value;

      const address = {
            street: user.street,
            houseNumber: user.houseNumber,
            city: user.city,
            postalCode: user.postalCode
        };
        const newUser = new User(
          user.firstName,
          user.lastName,
            address,
          user.eMail,
          user.password,
          this.favoriteSushi
        );

        axios.post('http://localhost:3000/auth/register/user', newUser)
          .then(response => {
            const token = response.data;
            localStorage.setItem('token', token);
            this.router.navigateByUrl('bestellen');
          })
          .catch(error => {
            // Fehler beim Aufrufen des Endpunkts
            console.error('Fehler bei der Registrierung:', error);
          });


    }


  }

  toLogin(){
    this.router.navigateByUrl('login');
  }
}
