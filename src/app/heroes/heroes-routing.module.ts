import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailComponent } from './components/detail/detail.component';
import { HomeComponent } from './components/home/home.component';
import { ListComponent } from './components/list/list.component';
import { NewComponent } from './components/new/new.component';
import { SearchComponent } from './components/search/search.component';
import {UserHasLoggedInGuard} from "../core/guards/user-has-logged-in.guard";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate:[UserHasLoggedInGuard],
    children: [
      {
        path: 'list',
        component: ListComponent
      },
      {
        path: 'search',
        component: SearchComponent
      },
      {
        path: 'new',
        component: NewComponent
      },
      {
        path: 'edit/:id',
        component: NewComponent
      },
      {
        path: ':id',
        component: DetailComponent
      },
      {
        path: '**',
        redirectTo: 'list'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeroesRoutingModule { }
