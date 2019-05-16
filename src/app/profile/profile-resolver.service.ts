import { Injectable } from '@angular/core';
import { ProfileService, Profile } from '../shared';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileResolverService implements Resolve<Profile>{

  constructor(private profileSevice: ProfileService,
        private router: Router) { }

  resolve(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<any> {
     // console.log(route.data);
      return this.profileSevice.get(route.params['username'])
      .pipe(
        catchError(err => this.router.navigateByUrl('/'))
      )
        
    }
}
