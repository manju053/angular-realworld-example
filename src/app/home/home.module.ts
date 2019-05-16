import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared';


/*const homeRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: '',
    component: HomeComponent
  }
]);*/

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  }
]
@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],

  exports: [RouterModule]
})
export class HomeModule { }
