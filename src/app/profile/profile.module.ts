import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { Routes, RouterModule } from '@angular/router';
import { ProfileResolverService } from './profile-resolver.service';
import { SharedModule } from '../shared';
import { ProfileArticlesComponent } from './profile-articles.component';
import { ProfileFavoritesComponent } from './profile-favorites.component';

const routes: Routes = [
  {
    path: 'profile/:username',
    component: ProfileComponent,
    resolve: {
      profile: ProfileResolverService
    },

    children: [
      {
        path: '',
        component: ProfileArticlesComponent
      },

      {
        path: 'favorites',
        component: ProfileFavoritesComponent
      }
    ]
  }
]

@NgModule({
  declarations: [ProfileComponent, ProfileArticlesComponent, ProfileFavoritesComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  providers: [ProfileResolverService]
})
export class ProfileModule { }
