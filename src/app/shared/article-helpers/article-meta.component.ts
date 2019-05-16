import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../models';

@Component({
  selector: 'app-article-meta',
  templateUrl: './article-meta.component.html',
  styleUrls: ['./article-meta.component.css']
})
export class ArticleMetaComponent implements OnInit {


  @Input() article: Article;
  constructor() { }

  ngOnInit() {
  }

}
