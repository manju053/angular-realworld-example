import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Article } from '../models';
import { UserService, ArticleService } from '../services';
import { Router } from '@angular/router';


@Component({
  selector: 'app-favorite-button',
  templateUrl: './favorite-button.component.html',
  styleUrls: ['./favorite-button.component.css']
})
export class FavoriteButtonComponent implements OnInit {

  @Input() article: Article;
  @Output() onToggle = new EventEmitter<boolean>();
  isSubmitting: boolean;

  constructor(private userService: UserService, private router: Router,
    private articleService: ArticleService) { }

  ngOnInit() {
  }

  toggleFavorite() {

    this.isSubmitting = true;
    this.userService.isAuthenticated
      .subscribe(
        (authenticated) => {
          if(!authenticated){
            this.router.navigateByUrl('/login');
            return;
          } 

          // favorite if its not favorited

          if(!this.article.favorited) {
            this.articleService.favorite(this.article.slug)
              .subscribe(
                data => {
                  this.isSubmitting = false;
                  this.onToggle.emit(false);
                },

                err => this.isSubmitting = false
              )
          } else {
            this.articleService.unfavorite(this.article.slug)
              .subscribe(
                data => {
                  this.isSubmitting = false;
                  this.onToggle.emit(false);
                },

                err => this.isSubmitting = false
              )
          }
        }
      )
  }
}
