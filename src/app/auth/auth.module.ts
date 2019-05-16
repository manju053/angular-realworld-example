import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth/auth.component';
import { SharedModule } from '../shared';
import { Routes, RouterModule } from '@angular/router';
import { NoAuthGuardService } from './no-auth-guard.service';

const routes: Routes = [
  {
    path: 'login',
    component: AuthComponent,
    canActivate: [NoAuthGuardService]
  },

  {
    path: 'register',
    component: AuthComponent,
    canActivate: [NoAuthGuardService]
  }
]

@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],

  exports: [RouterModule],

  providers: [NoAuthGuardService]
})
export class AuthModule { }
