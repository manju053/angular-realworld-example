import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService, Article, User, ArticleService, CommentsService } from '../shared';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  article: Article;
  currentUser: User;
  canModify: boolean;
  isDeleting: boolean;
  comments: Comment[];
  commentControl = new FormControl();
  commentFormErrors = {};
  isSubmitting: boolean;

  constructor(private route: ActivatedRoute, private userService: UserService,
    private articleService: ArticleService, private router: Router,
    private commentsService: CommentsService) { }

  ngOnInit() {

    // prefetch article data 

    this.route.data.subscribe(
      (data: {article: Article}) => {
        this.article = data.article;

       // console.log(this.article.slug);
        this.populateComments();
      }
    );

    this.userService.currentUser.subscribe(
      (userData: User) => {
        this.currentUser = userData;
        this.canModify = (this.currentUser.username === this.article.author.username);
      }
    );
  }

  onToggleFavorite(favorited: boolean) {
    this.article.favorited = favorited;
    if(favorited) {
      this.article.favoritesCount++;
    } else {
      this.article.favoritesCount--;
    }
  }

  onToggleFollowing(following: boolean) {
    this.article.author.following = following;
  }

  deleteArticle() {
    this.isDeleting = true;
    this.articleService.destroy(this.article.slug)
      .subscribe(
        success => this.router.navigateByUrl('/')
      );
  }

  populateComments() {
    this.commentsService.getAll(this.article.slug)
      .subscribe(comments => {
       // console.log(comments);
        this.comments = comments;
      })
  }

  addComment() {
    this.isSubmitting = true;
    this.commentFormErrors = {};
    let commentBody = this.commentControl.value;
    this.commentsService.add(this.article.slug, commentBody)
      .subscribe(
        comment => {
          console.log(comment)
          this.isSubmitting = false;
          this.commentControl.reset();
          this.comments.unshift(comment);
        },

        errors => {
          this.isSubmitting = false;
          this.commentFormErrors = errors;
        }
      )
  }

  onDeleteComment(comment) {
    this.commentsService.destroy(this.article.slug, comment.id)
      .subscribe(
        success => {
          this.comments = this.comments.filter((item) => item !== comment);
        }
      )
  }

}
