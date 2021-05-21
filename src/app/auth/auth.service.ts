import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment.prod';
import {SignUpForm} from './SignUpForm';
import {Observable} from 'rxjs';
const TOKEN_KEY = 'AuthToken';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //API LOCAL
  private signUpUrl = environment.URL_SEVER+'signup';
  constructor(private http: HttpClient) {
  }
  signUp(signUp: SignUpForm): Observable<any>{
    return this.http.post<any>(this.signUpUrl, signUp)
  }
}
