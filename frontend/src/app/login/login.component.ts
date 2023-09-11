import {Component, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms'
import {Router} from "@angular/router";
import axios from "axios";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent{

  loginForm: FormGroup;
  constructor(private router: Router,private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      eMail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required,  Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z\d]).{8,}$/),]],
    });
  }



  toOrder() {
    if (this.loginForm?.valid) {
      const signInDto = this.loginForm.value;

      axios.post('http://localhost:3000/auth/signIn', signInDto)
          .then(response => {
            const token = response.data;
            localStorage.setItem('token', token);
              if (token) {
                  const tokenParts = token.split('.');
                  if (tokenParts.length === 3) {
                      const payloadBase64 = tokenParts[1];
                      const payloadJson = atob(payloadBase64);
                      const payload = JSON.parse(payloadJson);
                      if (payload.role === 'user'){
                          this.router.navigateByUrl('bestellen');
                      }
                      else if(payload.role === 'admin'){
                          this.router.navigateByUrl('admin');
                      }
                      }
                  }

          })
          .catch(error => {
            console.error('Fehler beim Einloggen:', error);
          });
    }
  }
  toRegister(){
    this.router.navigateByUrl('registrieren');
  }
}
