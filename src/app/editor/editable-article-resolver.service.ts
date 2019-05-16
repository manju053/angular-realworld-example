import { Injectable } from '@angular/core';
import { ArticleService, UserService, Article } from '../shared';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditableArticleResolverService implements Resolve<Article>{

  constructor(private articleService: ArticleService,
              private userService: UserService,
              private router: Router) { }

  resolve(route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<any> {
        return this.articleService.get(route.params['slug'])
          .pipe(
            map(article => {
              if(this.userService.getCurrentUser().username === article.author.username) {
                return article;
              } else {
                this.router.navigateByUrl('/')
              }
            }),

            catchError(err => this.router.navigateByUrl('/'))
          )
      }
}
