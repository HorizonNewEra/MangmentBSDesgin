import { installment } from './Interfaces/flat-interfaces';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { BuildingTableComponent } from './components/building/building-table/building-table.component';
import { BuildingDetailsComponent } from './components/building/building-details/building-details.component';
import { BuildingEditComponent } from './components/building/building-edit/building-edit.component';
import { BuildingAddComponent } from './components/building/building-add/building-add.component';
import { UsersTableComponent } from './components/Users/users-table/users-table.component';
import { UsersAddComponent } from './components/Users/users-add/users-add.component';
import { UserDeleteComponent } from './components/Users/user-delete/user-delete.component';
import { UserEditComponent } from './components/Users/user-edit/user-edit.component';
import { UserDeletedTableComponent } from './components/Users/user-deleted-table/user-deleted-table.component';
import { FlatTableComponent } from './components/flat/flat-table/flat-table.component';
import { FlatAddComponent } from './components/flat/flat-add/flat-add.component';
import { FlatEditComponent } from './components/flat/flat-edit/flat-edit.component';
import { FlatDetailsComponent } from './components/flat/flat-details/flat-details.component';
import { ClientTableComponent } from './components/client/client-table/client-table.component';
import { ClientAddComponent } from './components/client/client-add/client-add.component';
import { ClientEditComponent } from './components/client/client-edit/client-edit.component';
import { ClientDetailsComponent } from './components/client/client-details/client-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { InstallmentDetailsComponent } from './payment/installment-details/installment-details.component';
import { PaymentDetailsComponent } from './payment/payment-details/payment-details.component';
import { PaymentTableComponent } from './payment/payment-table/payment-table.component';
import { SellFlatComponent } from './payment/sell-flat/sell-flat.component';
import { CommonModule } from '@angular/common';
import { AgendaComponent } from './components/agenda/agenda.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    NotfoundComponent,
    LoginComponent,
    RegisterComponent,
    BuildingTableComponent,
    BuildingDetailsComponent,
    BuildingEditComponent,
    BuildingAddComponent,
    UsersTableComponent,
    UsersAddComponent,
    UserDeleteComponent,
    UserEditComponent,
    UserDeletedTableComponent,
    FlatTableComponent,
    FlatAddComponent,
    FlatEditComponent,
    FlatDetailsComponent,
    ClientTableComponent,
    ClientAddComponent,
    ClientEditComponent,
    ClientDetailsComponent,
    InstallmentDetailsComponent,
    PaymentDetailsComponent,
    PaymentTableComponent,
    SellFlatComponent,
    FlatDetailsComponent,
    PaymentTableComponent,
    AgendaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
