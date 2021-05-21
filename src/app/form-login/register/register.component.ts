import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {SignUpForm} from '../../auth/SignUpForm';
import {AuthService} from '../../auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);
  hide = true; //bat mo passwoord trên template
  form: any = {};
  signUpForm: SignUpForm;
  isUser = false;
  isSignUpFailed = false;
  errorMessage = 'Please Fill in the form register';
  error1: any = {
    message: "nouser"
  }
  error2: any = {
    message: "noemail"
  }
  success: any = {
    message: "yes"
  }
  constructor(private authService: AuthService,
              private rotuer: Router) {
  }

  ngOnInit(): void {
  }
onSubmit(){
    console.log('goi ham')
  console.log('signUpFrom',this.signUpForm)
    this.signUpForm = new SignUpForm(
      this.form.name,
      this.form.username,
      this.form.email,
      this.form.password
    )
  this.authService.signUp(this.signUpForm).subscribe(data =>{
    if(JSON.stringify(data)==JSON.stringify(this.error1)){
      this.errorMessage = 'Username already exists! Please try again!'
    }
    if(JSON.stringify(data)==JSON.stringify(this.error2)){
      this.errorMessage = 'This Email already exists! Please try again!'
    }
    if(JSON.stringify(data)==JSON.stringify(this.success)){
      this.errorMessage = 'Create successful account!! Please login!'
      alert(this.errorMessage);
    }
  })
}
}
