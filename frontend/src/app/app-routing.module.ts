import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {StartComponent} from "./start/start.component";
import {OrderpageComponent} from "./orderpage/orderpage.component";
import {FavoritsushiComponent} from "./favoritsushi/favoritsushi.component";
import {UpdateFavoritSushiComponent} from "./update-favorit-sushi/update-favorit-sushi.component";
import {UserOptionComponent} from "./user-option/user-option.component";
import {AdminMainComponent} from "./admin-main/admin-main.component";
import {ShoppingCartComponent} from "./shopping-cart/shopping-cart.component";


const routes: Routes = [
  { path: '',
    component: StartComponent },
  { path: 'login',
    component: LoginComponent },
  { path: 'registrieren',
    component: RegisterComponent },
  { path: 'bestellen',
    component: OrderpageComponent },
  { path: 'user/einstellungen',
    component: UserOptionComponent },
  { path: 'user/favoritSushi',
    component: UpdateFavoritSushiComponent },
  { path: 'admin',
    component: AdminMainComponent },
  { path: 'warenkorb',
    component: ShoppingCartComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
