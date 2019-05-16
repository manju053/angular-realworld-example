import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared';
import { HomeAuthResolverService } from './home-auth-resolver.service';


/*const homeRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: '',
    component: HomeComponent
  }
]);*/

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    resolve: {
      isAuthenticated: HomeAuthResolverService
    }
  }
]
@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],

  exports: [RouterModule],
  providers: [HomeAuthResolverService]
})
export class HomeModule { }
