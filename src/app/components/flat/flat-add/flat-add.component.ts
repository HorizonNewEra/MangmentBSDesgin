import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddFlat } from 'src/app/Interfaces/flat-interfaces';
import { FlatServiceService } from 'src/app/Service/flat-service.service';

@Component({
  selector: 'app-flat-add',
  templateUrl: './flat-add.component.html',
  styleUrls: ['./flat-add.component.css']
})
export class FlatAddComponent {
apierror: string = '';
  isloading: boolean = false;
  buildingid:number=0;
  addflatform: FormGroup = new FormGroup({
    floor: new FormControl(null, [Validators.required, Validators.min(1)]),
    size: new FormControl(null, [Validators.required, Validators.min(0)]),
    flatNumber: new FormControl(null, [Validators.required, Validators.min(1)]),
    standerdPrice: new FormControl(null, [Validators.required, Validators.min(0)])
  });
  addflatformdata: AddFlat = undefined!;
  constructor(private _ActivatedRoute: ActivatedRoute,private _AuthService: FlatServiceService, private _Router: Router) { 
    this._ActivatedRoute.params.subscribe((prams)=>{this.buildingid=prams['id']})
  }
  Addflat(dataform: FormGroup) {
      this.addflatformdata = {
        buildingId: this.buildingid,
        flatNumber: dataform.value.flatNumber,
        standerdPrice: dataform.value.standerdPrice,
        floor: dataform.value.floor,
        size: dataform.value.size,
      };
  
      this.isloading = true;
      if (dataform.valid) {
        this._AuthService.AddFlat(this.addflatformdata).subscribe({
          next: (response) => {
            if (response.status === 200) {
              this._Router.navigate(['/buildingdetails', this.buildingid]);
              this.isloading = false;
            } else {
              this.apierror = "Failed to add flat. Please try again.";
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
