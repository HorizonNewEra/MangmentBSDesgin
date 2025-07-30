import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Addbuilding } from 'src/app/Interfaces/building-interfaces';
import { BuildingServiceService } from 'src/app/Service/building-service.service';

@Component({
  selector: 'app-building-add',
  templateUrl: './building-add.component.html',
  styleUrls: ['./building-add.component.css']
})
export class BuildingAddComponent {
  apierror: string = '';
  isloading: boolean = false;
  addbuildingform: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.maxLength(50), Validators.minLength(3)]),
    location: new FormControl(null, [Validators.required, Validators.maxLength(300), Validators.minLength(3)]),
    size: new FormControl(null, [Validators.required, Validators.min(1)]),
    landPrice: new FormControl(null, [Validators.required, Validators.min(0)]),
    constractionFees: new FormControl(null, [Validators.required, Validators.min(0)]),
    description: new FormControl(null)
  });
  addbuildingformdata: Addbuilding = undefined!;
  constructor(private _AuthService: BuildingServiceService, private _Router: Router) { }

  Addbuilding(dataform: FormGroup) {
    this.addbuildingformdata = {
      name: dataform.value.name,
      location: dataform.value.location,
      size: dataform.value.size,
      landPrice: dataform.value.landPrice,
      constractionFees: dataform.value.constractionFees,
      description: dataform.value.description
    };

    this.isloading = true;
    if (dataform.valid) {
      console.log(this.addbuildingformdata);
      this._AuthService.AddBuilding(this.addbuildingformdata).subscribe({
        next: (response) => {
          console.log(response);
          if (response.status === "200") {
            this._Router.navigate(['/building']);
            this.isloading = false;
          } else {
            this.apierror = "Failed to add building. Please try again.";
            this.isloading = false;
          }
        },
        error: (err: any) => {
          this.isloading = false;
          this.apierror = err.error.message;
        }
      })
    }
  }
}
