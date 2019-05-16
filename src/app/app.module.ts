import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HomeModule} from './home/home.module';
import { SharedModule, ApiService, UserService, User, JwtService, ProfileService, ArticleService, CommentsService} from './shared';
import { HeaderComponent} from './shared/layout/header.component';
import { FooterComponent } from './shared/layout/footer.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { AuthGuardService } from './auth/auth-guard.service';
import { SettingsModule } from './settings/settings.module';  
import { ProfileModule } from './profile/profile.module';
import { EditorModule } from './editor/editor.module';
import { ArticleModule } from './article/article.module';





// const rootRouting: ModuleWithProviders = RouterModule.forRoot([], {useHash: true});
const routes: Routes = [];




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    SharedModule,
    AuthModule,
    SettingsModule,
    ProfileModule,
    EditorModule,
    ArticleModule,
    RouterModule.forRoot(routes)
  ],
  providers: [ApiService, UserService, JwtService, AuthGuardService, ProfileService, ArticleService, CommentsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
