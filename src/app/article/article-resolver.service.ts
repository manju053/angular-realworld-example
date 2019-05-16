import { Injectable } from '@angular/core';
import { ArticleService, Article } from '../shared';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArticleResolverService implements Resolve<Article> {

  constructor(private articleService: ArticleService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.articleService.get(route.params['slug'])
      .pipe(
        catchError(err => this.router.navigateByUrl('/'))
      );
  }
}
