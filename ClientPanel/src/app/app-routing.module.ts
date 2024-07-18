import { auth } from 'firebase';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddClientComponent } from './components/add-client/add-client.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DetailsClientComponent } from './components/details-client/details-client.component';
import { EditClientComponent } from './components/edit-client/edit-client.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RegisterComponent } from './components/register/register.component';
import { SettingsComponent } from './components/settings/settings.component';
import { authGuardGuard } from './guards/auth-guard.guard'; // Adjust the path as needed

const routes: Routes = [
  {path : "" , component : DashboardComponent , canActivate : [authGuardGuard]},
  {path : "login" , component : LoginComponent},
  {path : "register" , component : RegisterComponent},
  {path : "client/add" , component : AddClientComponent, canActivate : [authGuardGuard]},
  {path : "client/edit/:id" , component : EditClientComponent, canActivate : [authGuardGuard]},
  {path : "client/:id" , component : DetailsClientComponent, canActivate : [authGuardGuard]},
  {path : "settings" , component :SettingsComponent, canActivate : [authGuardGuard]},
  {path : "**" , component : NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
