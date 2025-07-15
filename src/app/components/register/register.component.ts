import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { register } from 'src/app/Interfaces/user-interfaces';
import { UserServiceService } from 'src/app/Service/user-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  apierror:string='';
  isloading: boolean = false;
registerform: FormGroup = new FormGroup({
    id: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]{14}$/)]),
    userName: new FormControl(null, [Validators.required,Validators.minLength(6)]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{5,15}$/)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    phoneNumber: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
    address: new FormControl(null, [Validators.required,Validators.minLength(6)])
  });
  registerformdata: register =undefined!;
  constructor(private _AuthService: UserServiceService, private _Router: Router) { }

  submitRegister(dataform: FormGroup) {
    this.registerformdata = {
      id: dataform.value.id,
      userName: dataform.value.userName,
      password: dataform.value.password,
      email: dataform.value.email,
      phoneNumber: dataform.value.phoneNumber,
      address: dataform.value.address
    };

    this.isloading = true;
    if (dataform.valid) {
      this._AuthService.signup(this.registerformdata).subscribe({
        next: (response) => {
          localStorage.setItem('token', response.token);
          if (response.id !== null && response.id !== undefined && response.isActive === true) {
              this._Router.navigate(['/login']);
              this.isloading = false;
          }
        },
        error: (err:any) => {
          this.isloading = false;
          this.apierror=err.error.message;
        }
      })
    }
  }
}
