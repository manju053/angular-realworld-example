import { Component, OnInit } from '@angular/core';
import { UserService } from '../services';
import { User } from '../models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  currentUser: User;
  constructor(private userService: UserService) { }
  

  ngOnInit() {
    this.userService.currentUser.subscribe(
      user => this.currentUser = user
    )
  }

}
