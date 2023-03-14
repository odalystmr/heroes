import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "../heroes/components/home/home.component";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {UserHasLoggedInGuard} from "../core/guards/user-has-logged-in.guard";

const routes: Routes = [
  {
    path:'',
    children:[
      {
        path:'login',
        component: LoginComponent
      },
      {
        path:'register',
        component: RegisterComponent
      }
    ]
  },
  {
    path:'',
    component: HomeComponent,
    canActivate:[UserHasLoggedInGuard],
    children:[
      {
        path:'profile',
        component: RegisterComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
