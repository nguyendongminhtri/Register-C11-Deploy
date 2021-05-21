import { Injectable } from '@angular/core';
const TOKEN_KEY = 'AuthToken';
const AVATAR_KEY = 'AuthAvatar';
const AUTHORITIES_KEY = 'AuthAuthorities';
const NAME_KEY = 'AuthName';
@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  private roles: Array<string> = [];
  constructor() { }
  public setToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }
  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }
  public setAvatar(avatar: string){
    window.sessionStorage.removeItem(AVATAR_KEY);
    window.sessionStorage.setItem(AVATAR_KEY, avatar);
  }
  public getAvatar(): string {
    return window.sessionStorage.getItem(AVATAR_KEY);
  }
  public getAuthorities(): string[] {
    this.roles = [];
    if(sessionStorage.getItem(TOKEN_KEY)){
      JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY)).forEach(athority =>{
        this.roles.push(athority.authority)
      })
    }
    return this.roles;
  }
  public setName(name: string){
    window.sessionStorage.removeItem(NAME_KEY);
    window.sessionStorage.setItem(NAME_KEY,name);
  }
  public getName(): string{
    return window.sessionStorage.getItem(NAME_KEY);
  }
}
