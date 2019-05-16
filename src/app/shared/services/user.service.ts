import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import {distinctUntilChanged, map} from 'rxjs/operators';
import { User } from '../models';
import { JwtService } from './jwt.service';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  private currentUserSubject = new BehaviorSubject<User>(new User());
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());
  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(private _http: HttpClient,
    private apiService: ApiService,
    private jwtService: JwtService) { }


  /*attemptAuth(type, credentials): Observable<User> {
    let route = (type === 'login') ? '/login': '';
    return this.apiService.post('/users' + route, {user: credentials})
    .pipe(
      map(
        data => {
          this.setAuth(data.user);
          return data;
        }
      )
    );
  }*/

  //Verify JWT in localStorage with server & load user's info
  // this should run at the startup

  populate() {
    // If JWT detected, attempt to get & store user's info

    if(this.jwtService.getToken()) {
      this.apiService.get('/user')
      .subscribe(
        data => this.setAuth(data.user),
        err => this.purgeAuth()
      )
    } else {
      this.purgeAuth()
    }
  }

  purgeAuth() {
    this.jwtService.destroyToken();
    this.isAuthenticatedSubject.next(false);
    this.currentUserSubject.next(new User());
  }

  attemptAuth(type, credentials): Observable<User> {
    const route = (type === 'login') ? '/login' : '';
    return this.apiService.post('/users' + route, {user: credentials})
      .pipe(
        map(
         data => {
              this.setAuth(data.user);
              return data;
      }
    ));
  }

  update(user): Observable<User> {
    return this.apiService.put('/user', { user })
    .pipe(
      map(data => {
        this.currentUserSubject.next(data.user);
        return data.user
      })
    )
  }

  setAuth(user: User) {
    this.jwtService.saveToken(user.token);
    this.currentUserSubject.next(user);
    this.isAuthenticatedSubject.next(true);
  }

  getCurrentUser(): User {
    return this.currentUserSubject.value;
  }
  

}
