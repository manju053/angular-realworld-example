import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService, Comment } from '../shared';

@Component({
  selector: 'app-article-comment',
  templateUrl: './article-comment.component.html',
  styleUrls: ['./article-comment.component.css']
})
export class ArticleCommentComponent implements OnInit {

  @Input() comment: Comment;
  @Output() deleteComment = new EventEmitter<boolean>();
  canModify: boolean;

  constructor(private userService: UserService) { }

  ngOnInit() {

    this.userService.currentUser.subscribe(
      userData => {
        this.canModify = (userData.username === this.comment.author.username);
      }
    );
  }

  deleteClicked() {
    this.deleteComment.emit(true);
  }

}
