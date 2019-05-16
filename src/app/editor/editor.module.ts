import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { EditorComponent } from './editor.component';
import { AuthGuardService } from '../auth/auth-guard.service';
import { EditableArticleResolverService } from './editable-article-resolver.service';
import { SharedModule } from '../shared';

const routes: Routes = [
  {
    path: 'editor',
    component: EditorComponent,
    canActivate: [AuthGuardService]
  },

  {
    path: 'editor/:slug',
    component: EditorComponent,
    canActivate: [AuthGuardService],
    resolve: {
      article: EditableArticleResolverService
    }
  }
]

@NgModule({
  declarations: [EditorComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],

  exports: [RouterModule]
})
export class EditorModule { }
