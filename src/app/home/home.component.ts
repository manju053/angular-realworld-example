import { Component, OnInit } from '@angular/core';
import { UserService, TagsService, ArticleListConfig } from '../shared';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  authenticated: boolean;
  tags: [string];
  tagsLoaded: boolean;
  listConfig: ArticleListConfig = new ArticleListConfig();

  constructor(private userService: UserService, 
    private tagsService: TagsService,
    private router: Router) { }

  ngOnInit() {
    this.userService.isAuthenticated.subscribe(
      (authenticated) => {
        if(authenticated) {
          this.authenticated = authenticated;
          this.setListTo('feed');
        } else {
          this.setListTo('all');
        }
      }
    );

      this.tagsService.getAll().subscribe(
        (tags) => {
          this.tags = tags;
          this.tagsLoaded = true;
        }
      )
  }
  setListTo(type: string, filters: Object = {}) {
    if(type === 'feed' && !this.authenticated) {
      this.router.navigateByUrl('/login');
      return
    }

    this.listConfig = {type: type, filters: filters}
  }

  

}
