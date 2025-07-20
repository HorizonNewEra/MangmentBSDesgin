import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientEditAddData } from 'src/app/Interfaces/client-interfaces';
import { ClientServiceService } from 'src/app/Service/client-service.service';

@Component({
  selector: 'app-client-add',
  templateUrl: './client-add.component.html',
  styleUrls: ['./client-add.component.css']
})
export class ClientAddComponent {
apierror:string='';
    isloading: boolean = false;
  addclientform: FormGroup = new FormGroup({
      id: new FormControl(null, [Validators.pattern(/^[0-9]{14}$/),Validators.required]),
      name: new FormControl(null, [Validators.maxLength(400), Validators.minLength(3),Validators.required]),
      phoneNumber: new FormControl(null, [Validators.maxLength(11), Validators.minLength(11),Validators.required]),
      address: new FormControl(null, [Validators.maxLength(700), Validators.minLength(10),Validators.required])
    });
    addclientformdata: ClientEditAddData =undefined!;
    constructor(private _AuthService: ClientServiceService, private _Router: Router) { 
    }
    
    addclient(dataform: FormGroup) {
        this.addclientformdata = {
          name: dataform.value.name,
          address: dataform.value.address,
          id: dataform.value.id,
          phoneNumber: dataform.value.phoneNumber
        };
    
        this.isloading = true;
        if (dataform.valid) {
          this._AuthService.ClientEdit(this.addclientformdata).subscribe({
            next: (response) => {
              if (response.status === 200) {
                this._Router.navigate(['/client']);
                this.isloading = false;
              } else {
                this.apierror = "Failed to add Client. Please try again.";
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
