import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ArticleComponent } from './article.component';
import { ArticleResolverService } from './article-resolver.service';
import { SharedModule } from '../shared';
import { MarkdownPipe } from './markdown.pipe';
import { ArticleCommentComponent } from './article-comment.component';

const routes: Routes = [
  {
    path: 'article/:slug',
    component: ArticleComponent,
    resolve: {
      article: ArticleResolverService
    }
  }
]
@NgModule({
  declarations: [ArticleComponent, MarkdownPipe, ArticleCommentComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],

  exports: [RouterModule]
})
export class ArticleModule { }
