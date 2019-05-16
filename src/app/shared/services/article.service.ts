import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Article, ArticleListConfig } from '../models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private apiService: ApiService) { }

  get(slug): Observable<Article> {
    return this.apiService.get('/articles/' +slug)
      .pipe(map(data => data.article));
  }

  save(article): Observable<Article> {
    if(article.slug) {
     return  this.apiService.put('/articles/'+ article.slug, {article: article})
        .pipe(map(data => data.article));
    } else {
      return this.apiService.post('/articles/', {article: article})
      .pipe(map(data => data.article))
    }
  }

  destroy(slug) {
    return this.apiService.delete('/articles/' + slug);
  }

  favorite(slug): Observable<Article> {
    return this.apiService.post('/articles/' + slug + '/favorite');
  }

  unfavorite(slug): Observable<Article> {
    return this.apiService.delete('/articles/' + slug + '/favorite');
  }

  query(config: ArticleListConfig): Observable<{articles: Article[], articlesCount: number}> {
    const params = {};
    console.log(config.filters.limit)
    Object.keys(config.filters).forEach( (key )=> {
      params[key] = config.filters[key];
    });

    let endPoint = '/articles' + ((config.type === 'feed') ? '/feed': '');
 //   console.log(endPoint);
    return this.apiService.get(endPoint, new HttpParams({ fromObject: params }))
      .pipe(map(data => data));
  }
}
