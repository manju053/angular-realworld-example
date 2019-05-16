import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ProfileService, UserService } from '../../services';
import { Router } from '@angular/router';
import { Profile } from '../../models';

@Component({
  selector: 'app-follow-button',
  templateUrl: './follow-button.component.html',
  styleUrls: ['./follow-button.component.css']
})
export class FollowButtonComponent implements OnInit {

  @Input() profile: Profile;

  @Output() onToggle = new EventEmitter<boolean>();
  isSubmitting: boolean;
  

  constructor(private profileService: ProfileService,
              private userService: UserService,
              private router: Router) { }

  ngOnInit() {
  }

  toggleFollowing() {

    this.isSubmitting = true;

    // check if user has logged in
    this.userService.isAuthenticated.subscribe(
      isAuthenticated => {
        if(!isAuthenticated) {
          this.router.navigateByUrl('/login');
          return;
        }


        // follow the user if not following

        if(!this.profile.following) {
          this.profileService.follow(this.profile.username).subscribe(
            data => {
              this.isSubmitting = false;
              this.onToggle.emit(true);
            },

            err => {
              this.isSubmitting = false;
            }
          );
        }
      }
    )
  }

}
