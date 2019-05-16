import { Component, OnInit } from '@angular/core';
import { User, UserService } from '../shared';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  user: User = new User();
  isSubmitting: boolean = false;
  errors: Object = {};
  settingsForm: FormGroup;

  constructor(private router: Router,
    private fb: FormBuilder,
    private userService: UserService) {

      this.settingsForm = fb.group({
        image: '',
        username: '',
        bio: '',
        email: '',
        password: ''
      })
     }

  ngOnInit() {
    <any>Object.assign(this.user, this.userService.getCurrentUser());
    this.settingsForm.patchValue(this.user);
  }

  logout() {
    this.userService.purgeAuth();
    this.router.navigateByUrl('/');
  }

  submitForm() {
    this.isSubmitting = true;

    //update the model this.user

    this.updateUser(this.settingsForm.value);

    this.userService.update(this.user)
      .subscribe(
        userData => {
          this.router.navigateByUrl('/profile/' + userData.username)
        },

        err => {
          this.errors = err;
          this.isSubmitting = false;
        }
      );
  }

  updateUser(values: Object) {
    <any>Object.assign(this.user, values);
  }

}
