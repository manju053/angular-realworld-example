import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService, User, Profile } from 'src/app/shared';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile: Profile;
  currentUser: User;
  isUser: boolean;

  constructor(private route: ActivatedRoute,
    private userService: UserService) { }

  ngOnInit() {

   this.route.data.subscribe(
      (data: {profile: Profile}) => {
        this.profile = data.profile;
      }
    ); 

    this.userService.currentUser.subscribe(
      (userData) => {
        this.currentUser = userData;
        this.isUser = (this.currentUser.username === this.profile.username );
      }
    )
  }

  onToggleFollowing(following: boolean) {
    this.profile.following = following;
  }

}
