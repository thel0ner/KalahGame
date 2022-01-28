import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { CanactivateGuard } from './canactivate.guard';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    canActivate: [CanactivateGuard],
    children: [
      {
        path: 'signin',
        loadChildren: () => import('./signin/signin.module').then(m => m.SigninModule),
      },
      {
        path: 'signup',
        loadChildren: () => import('./signup/signup.module').then(m => m.SignupModule),
      },
      {
        path: '',
        redirectTo: 'signin',
        pathMatch: 'all',
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
