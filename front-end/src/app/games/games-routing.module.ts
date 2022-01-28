import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GamesComponent } from './games.component';
import { GamesGuard } from './games.guard';

const routes: Routes = [
  {
    path: '',
    component: GamesComponent,
    canActivate: [GamesGuard],
    children:[
      {
        path: 'list',
        loadChildren: () => import('./list/list.module').then(m => m.ListModule),
      },
      {
        path: 'play/:id',
        loadChildren: () => import('./play/play.module').then(m => m.PlayModule),
      },
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GamesRoutingModule { }
