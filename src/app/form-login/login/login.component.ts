import { Component, OnInit } from '@angular/core';
import {SignInForm} from '../../auth/SignInForm';
import {AuthService} from '../../auth/auth.service';
import {TokenStorageService} from '../../auth/token-storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  returnUrl: '/user';
  hide = true;
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = 'Login failled! Please Check username or Password';
  roles: string[] = [];
  name: String;
  signInForm: SignInForm;
  constructor(private authSerive: AuthService,
              private tokenService: TokenStorageService,
              private router: Router) { }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenService.getAuthorities();
      this.name = this.tokenService.getName()
    }
  }

  onSubmit() {
    console.log(this.form);

    this.signInForm = new SignInForm(
      this.form.username,
      this.form.password);

    this.authSerive.signIn(this.signInForm).subscribe(
      data => {
        console.log("data login", data)
        this.tokenService.setToken(data.token);
        this.tokenService.setName(data.name);
        this.tokenService.saveAuthorities(data.roles);
        // this.tokenService.setAvatar(data.avatar);
        // this.tokenStorage.saveUserId(data.id)
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenService.getAuthorities()
        alert('Login success!!')
        window.location.reload()
        // var userId: number = +this.tokenStorage.getUserId();
        // this.router.navigate(['/user'])


        // this.route.navigate(['/user']);
        // console.log("chinh1"+this.route + "url"+this.route.url)
        // this.reloadPage();
        // if (this.route.url === '/login') {
        // this.route.navigate(['/user']);
        // this.reloadPage();
        // } else {

        // }
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        // this.isLoggedIn = true;
        // this.isLoggedIn = false;
        this.isLoginFailed = true;
        alert('Login Failed!!! Please login again! ');

      }
    );
  }


}
