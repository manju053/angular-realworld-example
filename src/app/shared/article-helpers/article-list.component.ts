import { Component, OnInit, Input } from '@angular/core';
import { ArticleListConfig, Article } from '../models';
import { ArticleService } from '../services';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {

  query: ArticleListConfig;
  currentPage: number = 1;
  loading: boolean;
  results: Article[];
  totalPages: Array<number> = [1];

  @Input() limit: number;
  @Input() 
    set config(config: ArticleListConfig) {
      this.query = config;
      this.currentPage = 1;
      this.runQuery();
    }

  constructor(private articleService: ArticleService
    ) { }

  ngOnInit() {
  }


  runQuery() {
    this.loading = true;
    this.results = [];

    if(this.limit) {
      this.query.filters.limit = this.limit;
      this.query.filters.offset = this.limit * (this.currentPage - 1);
    }

    this.articleService.query(this.query)
      .subscribe(
        data => {

          //console.log(data);
          this.loading = false;
          this.results = data.articles;
          console.log(data.articles);
          this.totalPages = Array.from(new Array(Math.ceil(data.articlesCount / this.limit)), (val,index) => index + 1);
        }
      )
  }

  setPageTo(pageNumber: number) {
    this.currentPage = pageNumber;
    this.runQuery();
  }

}
