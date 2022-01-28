import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayComponent } from './play.component';
import { PlayResolver } from './play.resolver';

const routes: Routes = [
  {
    path: '',
    component: PlayComponent,
    resolve: [
      PlayResolver
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayRoutingModule { }
