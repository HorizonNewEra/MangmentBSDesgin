import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientServiceService } from 'src/app/Service/client-service.service';
import { ClientEditAddData } from 'src/app/Interfaces/client-interfaces';


@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.css']
})
export class ClientEditComponent {
  apierror: string = '';
  isloading: boolean = false;
  editclientform: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.maxLength(400), Validators.minLength(3)]),
    phoneNumber: new FormControl(null, [Validators.maxLength(11), Validators.minLength(11)]),
    address: new FormControl(null, [Validators.maxLength(700), Validators.minLength(10)]),
  });
  clientId: string = '';
  editclientformdata: ClientEditAddData = undefined!;
  constructor(private _ActivatedRoute: ActivatedRoute, private _AuthService: ClientServiceService, private _Router: Router) {
    this._ActivatedRoute.params.subscribe((prams) => { this.clientId = prams['id'] })
  }

  editclient(dataform: FormGroup) {
    this.editclientformdata = {
      name: dataform.value.name,
      address: dataform.value.address,
      id: this.clientId,
      phoneNumber: dataform.value.phoneNumber
    };

    this.isloading = true;
    if (dataform.valid) {
      this._AuthService.ClientEdit(this.editclientformdata).subscribe({
        next: (response) => {
          console.log(response);
          if (response.status === "200") {
            this._Router.navigate(['/client']);
            this.isloading = false;
          } else {
            this.apierror = response.message;
            this.isloading = false;
          }
        },
        error: (err: any) => {
          this.isloading = false;
          this.apierror = err.error.message;
          if (err.error.errors) {
            this.apierror +='\n'+ Object.values(err.error.errors).flat().join(', ');
          }
        }
      })
    }
  }
}
