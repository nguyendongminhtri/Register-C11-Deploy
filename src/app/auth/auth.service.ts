import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment.prod';
import {SignUpForm} from './SignUpForm';
import {Observable} from 'rxjs';
import {SignInForm} from './SignInForm';
import {JwtResponse} from './JwtResponse';
const httpOptions = {
  headers: new HttpHeaders({  'Content-Type': 'application/json' })
};
const TOKEN_KEY = 'AuthToken';
const NAME_KEY = 'AuthName';
const AUTHORITIES_KEY = 'AuthAuthorities';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //API SERVER
  private signUpAPI = environment.URL_SEVER+'signup';
  private signInAPI = environment.URL_SEVER+'signin';

  //API LOCAL
  // private signInAPI = 'http://localhost:8080/api/auth/signin';
  constructor(private http: HttpClient) {
  }
  signUp(signUp: SignUpForm): Observable<any>{
    return this.http.post<any>(this.signUpAPI, signUp)
  }
  signIn(signIn: SignInForm): Observable<JwtResponse>{
    console.log('goi ham nay')
    console.log(signIn)
    console.log(JwtResponse)
    console.log(httpOptions)
    console.log(this.http.post<JwtResponse>(this.signInAPI, signIn, httpOptions))

    return this.http.post<JwtResponse>(this.signInAPI, signIn, httpOptions)
  }
  // loggined(){
  //   const token = sessionStorage.getItem(TOKEN_KEY);
  //   const username = sessionStorage.getItem(NAME_KEY);
  //   const role = sessionStorage.getItem(AUTHORITIES_KEY);
  //   if (username && token && role) {
  //     return true;
  //   }
  //   return false;
  // }
}
