import { login } from './../../Interfaces/user-interfaces';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/Service/user-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  apierror: string = '';
  isloading: boolean = false;
  loginform: FormGroup = new FormGroup({
    userName: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{5,15}$/)]),
  });
  loginformdata: login = undefined!;
  constructor(private _AuthService: UserServiceService, private _Router: Router) { }

  submitlogin(dataform: FormGroup) {
    this.loginformdata = {
      userName: dataform.value.userName,
      password: dataform.value.password
    };

    this.isloading = true;
    if (dataform.valid) {
      this._AuthService.login(this.loginformdata).subscribe({
        next: (response) => {
          localStorage.setItem('usertoken', response.token);
          if (response.isActive) {
            this._Router.navigate(['/home']);
            this._AuthService.decodeusertoken();
            this.isloading = false;
          }
        },
        error: (err: any) => {
          console.log(err);
          this.isloading = false;
          this.apierror = err.error.message;
        }
      })
    }
  }
}
