import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Profile } from '../models';
import { map } from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private apiService: ApiService) { }

  get(username: string): Observable<Profile> {
   // console.log(username);
    return this.apiService.get('/profiles/' + username)
      .pipe(
        map((data: {profile: Profile}) => data.profile)
      )
  }

  follow(username: string): Observable<Profile> {
    return this.apiService.post('/profiles/' + username + 'follow');
  }

  unfollow(username: string): Observable<Profile> {
    return this.apiService.delete('/profiles/' + username + 'follow')
  }
}
