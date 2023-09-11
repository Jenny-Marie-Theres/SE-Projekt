import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input'
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import { StartComponent } from './start/start.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { OrderpageComponent } from './orderpage/orderpage.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { NavigationBarOrderComponent } from './navigation-bar-order/navigation-bar-order.component';
import { FinishedsushiComponent } from './finishedsushi/finishedsushi.component';
import { FavoritsushiComponent } from './favoritsushi/favoritsushi.component';
import { MatDialogModule } from '@angular/material/dialog';
import { UpdateFavoritSushiComponent } from './update-favorit-sushi/update-favorit-sushi.component';
import { DialogtemComponent } from './dialogtem/dialogtem.component';
import { UpdateSushiDialogComponent } from './update-sushi-dialog/update-sushi-dialog.component';
import {MatSelectModule} from "@angular/material/select";
import {MatCheckboxModule} from '@angular/material/checkbox';
import { UserOptionComponent } from './user-option/user-option.component';
import { DeleteUserDialogComponent } from './delete-user.dialog/delete-user.dialog.component';
import { AdminOrderComponent } from './admin-order/admin-order.component';
import { AdminSushiComponent } from './admin-sushi/admin-sushi.component';
import { AdminMainComponent } from './admin-main/admin-main.component';
import { AdminToolbarComponent } from './admin-toolbar/admin-toolbar.component';
import { AdminToolbarOrderComponent } from './admin-toolbar-order/admin-toolbar-order.component';
import { UpdateOrderDialogComponent } from './update-order-dialog/update-order-dialog.component';
import { CreateSushiComponent } from './create-sushi/create-sushi.component';
import {MatListModule} from "@angular/material/list";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatTabsModule} from "@angular/material/tabs";
import {MatStepperModule} from "@angular/material/stepper";
import {MatRadioModule} from "@angular/material/radio";
import { CreateSushiAdminUserComponent } from './create-sushi-admin-user/create-sushi-admin-user.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ThanksDialogComponent } from './thanks-dialog/thanks-dialog.component';
import { GetAddressDialogComponent } from './get-address-dialog/get-address-dialog.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    StartComponent,
    OrderpageComponent,
    NavigationBarComponent,
    NavigationBarOrderComponent,
    FinishedsushiComponent,
    FavoritsushiComponent,
    UpdateFavoritSushiComponent,
    DialogtemComponent,
    UpdateSushiDialogComponent,
    UserOptionComponent,
    DeleteUserDialogComponent,
    AdminOrderComponent,
    AdminSushiComponent,
    AdminMainComponent,
    AdminToolbarComponent,
    AdminToolbarOrderComponent,
    UpdateOrderDialogComponent,
    CreateSushiComponent,
    CreateSushiAdminUserComponent,
    ShoppingCartComponent,
    ThanksDialogComponent,
    GetAddressDialogComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatToolbarModule,
    FormsModule,
    MatDialogModule,
    MatSelectModule,
    MatCheckboxModule,
    MatListModule,
    MatProgressBarModule,
    MatTabsModule,
    MatStepperModule,
    MatRadioModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
