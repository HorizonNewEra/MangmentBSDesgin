import { PaymentDetailsComponent } from './payment/payment-details/payment-details.component';
import { buildingdetail, Addbuilding } from './Interfaces/building-interfaces';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { BuildingTableComponent } from './components/building/building-table/building-table.component';
import { UsersTableComponent } from './components/Users/users-table/users-table.component';
import { ClientTableComponent } from './components/client/client-table/client-table.component';
import { authGuard } from './guards/auth.guard';
import { BuildingDetailsComponent } from './components/building/building-details/building-details.component';
import { BuildingAddComponent } from './components/building/building-add/building-add.component';
import { FlatDetailsComponent } from './components/flat/flat-details/flat-details.component';
import { FlatAddComponent } from './components/flat/flat-add/flat-add.component';
import { FlatEditComponent } from './components/flat/flat-edit/flat-edit.component';
import { InstallmentDetailsComponent } from './payment/installment-details/installment-details.component';
import { PaymentTableComponent } from './payment/payment-table/payment-table.component';
import { AgendaComponent } from './components/agenda/agenda.component';
import { ClientDetailsComponent } from './components/client/client-details/client-details.component';
import { ClientAddComponent } from './components/client/client-add/client-add.component';
import { ClientEditComponent } from './components/client/client-edit/client-edit.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home',canActivate:[authGuard], component: HomeComponent, title: 'Home'},
  {path: 'agenda',canActivate:[authGuard], component: AgendaComponent, title: 'Agenda'},
  {path: 'login', component: LoginComponent, title: 'Login'},
  {path: 'register', component: RegisterComponent, title: 'Register'},
  {path: 'building',canActivate:[authGuard], component: BuildingTableComponent, title: 'Building'},
  {path: 'buildingdetails/:id',canActivate:[authGuard], component: BuildingDetailsComponent, title: 'Building Details'},
  {path: 'flatdetails/:id',canActivate:[authGuard], component: FlatDetailsComponent, title: 'Flat Details'},
  {path: 'addflat/:id',canActivate:[authGuard], component: FlatAddComponent, title: 'Add Flat'},
  {path: 'editflat/:bid/:id',canActivate:[authGuard], component: FlatEditComponent, title: 'Edit Flat'},
  {path: 'installmentdetails/:id',canActivate:[authGuard], component: InstallmentDetailsComponent, title: 'Installment Details'},
  {path: 'addbuilding',canActivate:[authGuard], component: BuildingAddComponent, title: 'Add Building'},
  {path: 'paymentdetails/:id',canActivate:[authGuard], component: PaymentDetailsComponent, title: 'PaymentDetails'},
  {path: 'payment',canActivate:[authGuard], component: PaymentTableComponent, title: 'Payment'},
  {path: 'client',canActivate:[authGuard], component: ClientTableComponent, title: 'Client'},
  {path: 'clientdetails/:id',canActivate:[authGuard], component: ClientDetailsComponent, title: 'Client-details'},
  {path: 'clientadd/:id',canActivate:[authGuard], component: ClientAddComponent, title: 'Client-Add'},
  {path: 'clientedit/:id',canActivate:[authGuard], component: ClientEditComponent, title: 'Client-Edit'},
  {path: 'user',canActivate:[authGuard], component: UsersTableComponent, title: 'Users'},
  {path: '**', component: NotfoundComponent, title: 'NotFound'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
