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

const routes: Routes = [
  {path : "" , component : DashboardComponent},
  {path : "login" , component : LoginComponent},
  {path : "register" , component : RegisterComponent},
  {path : "client/add" , component : AddClientComponent},
  {path : "client/edit:id" , component : EditClientComponent},
  {path : "client/:id" , component : DetailsClientComponent},
  {path : "settings" , component :SettingsComponent},
  {path : "**" , component : NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
