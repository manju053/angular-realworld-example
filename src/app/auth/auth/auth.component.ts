import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService, Errors } from 'src/app/shared';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  authType: string = '';
  title: string = '';
  isSubmitting: boolean = false;
  authForm: FormGroup;
  errors: Errors = new Errors();

  constructor(private route: ActivatedRoute,
              private fb: FormBuilder,
              private userService: UserService,
              private router: Router
              ) { 
      
    this.authForm = this.fb.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required]
    })
    }

  ngOnInit() {
    this.route.url.subscribe(data => {
      this.authType = data[data.length - 1].path;
      this.title = (this.authType === 'login') ? 'Sign In' : 'Sign Up';
      if (this.authType === 'register') {
        this.authForm.addControl('username', new FormControl('', Validators.required));
      }
    })
  }

 /* submitForm() {
    this.isSubmitting = true;
    let credentials = this.authForm.value;
    console.log(credentials);
    this.userService.attemptAuth(this.authType, credentials)
    .subscribe(
      data => this.router.navigateByUrl('/'),
      error => {
        console.log(error)
        this.errors = error;
        this.isSubmitting = false;
       // console.log('In Auth: '+this.errors.errors)
      }
    )
  }*/

  submitForm() {
    this.isSubmitting = true;
    this.errors = {errors: {}};

    const credentials = this.authForm.value;
    this.userService
    .attemptAuth(this.authType, credentials)
    .subscribe(
      data => this.router.navigateByUrl('/'),
      err => {
        this.errors = err;
        this.isSubmitting = false;
      }
    );
  }

}
