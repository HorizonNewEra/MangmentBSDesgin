import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EditFlat } from 'src/app/Interfaces/flat-interfaces';
import { FlatServiceService } from 'src/app/Service/flat-service.service';

@Component({
  selector: 'app-flat-edit',
  templateUrl: './flat-edit.component.html',
  styleUrls: ['./flat-edit.component.css']
})
export class FlatEditComponent {
  apierror: string = '';
  isloading: boolean = false;
  buildingid:number=0;
  flatid:number=0;
  editflatform: FormGroup = new FormGroup({
    floor: new FormControl(null, [Validators.min(1)]),
    size: new FormControl(null, [Validators.min(0)]),
    flatNumber: new FormControl(null, [Validators.min(1)]),
    standerdPrice: new FormControl(null, [Validators.min(0)])
  });
  editflatformdata: EditFlat = undefined!;
  constructor(private _ActivatedRoute: ActivatedRoute,private _AuthService: FlatServiceService, private _Router: Router) { 
    this._ActivatedRoute.params.subscribe((prams)=>{this.buildingid=prams['bid']})
    this._ActivatedRoute.params.subscribe((prams)=>{this.flatid=prams['id']})
  }
  Addflat(dataform: FormGroup) {
      this.editflatformdata = {
        id: this.flatid,
        buildingId: this.buildingid,
        flatNumber: dataform.value.flatNumber,
        standerdPrice: dataform.value.standerdPrice,
        floor: dataform.value.floor,
        size: dataform.value.size,
      };
  
      this.isloading = true;
      if (dataform.valid) {
        this._AuthService.EditFlat(this.editflatformdata).subscribe({
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
