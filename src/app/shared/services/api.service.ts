import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError, map} from 'rxjs/operators';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http: HttpClient
    , private jwtService: JwtService) { }

  private setHeaders(): HttpHeaders {
    let headersConfig = {
      'content-type': 'application/json',
      'accept': 'application/json'
    };

    if(this.jwtService.getToken()) {
      headersConfig['Authorization'] = `Token ${this.jwtService.getToken()}`;
    }
    return new HttpHeaders(headersConfig);
  }

  private formatErrors(error: HttpErrorResponse) {
    return throwError(error.error);
  }

post(path: string, body: Object = {}): Observable<any> {
  console.log(JSON.stringify(body));
  return this._http.post(
    `${environment.api_url}${path}`,
    JSON.stringify(body), {headers: this.setHeaders()}
  ).pipe(catchError(this.formatErrors));
}

get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
  //console.log(params);
  return this._http.get(`${environment.api_url}${path}`, { headers: this.setHeaders() , params } )
  .pipe(
    catchError(this.formatErrors)
    )
  }

put(path: string, body: Object={}): Observable<any> {
  return this._http.put(`${environment.api_url}${path}`, JSON.stringify(body), {headers: this.setHeaders()})
          .pipe(catchError(this.formatErrors))
} 

delete(path: string): Observable<any> {
  return this._http.delete(`${environment.api_url}${path}`, {headers: this.setHeaders()})
  .pipe(
    catchError(this.formatErrors)
  )
}
}
