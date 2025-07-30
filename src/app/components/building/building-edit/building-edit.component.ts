import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Editbuilding } from 'src/app/Interfaces/building-interfaces';
import { BuildingServiceService } from 'src/app/Service/building-service.service';

@Component({
  selector: 'app-building-edit',
  templateUrl: './building-edit.component.html',
  styleUrls: ['./building-edit.component.css']
})
export class BuildingEditComponent {
apierror:string='';
  isloading: boolean = false;
editbuildingform: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.maxLength(100), Validators.minLength(3)]),
    location: new FormControl(null, [Validators.maxLength(300), Validators.minLength(3)]),
  });
  editbuildingformdata: Editbuilding =undefined!;
  constructor(private _ActivatedRoute: ActivatedRoute,private _AuthService: BuildingServiceService, private _Router: Router) { 
this._ActivatedRoute.params.subscribe((prams)=>{this.editbuildingformdata.id=prams['id']})
  }
  
  editbuilding(dataform: FormGroup) {
      this.editbuildingformdata = {
        name: dataform.value.name,
        location: dataform.value.location,
        id: this.editbuildingformdata.id
      };
  
      this.isloading = true;
      if (dataform.valid) {
        this._AuthService.EditBuilding(this.editbuildingformdata).subscribe({
          next: (response) => {
            if (response.status ==="200") {
              this._Router.navigate(['/building']);
              this.isloading = false;
            } else {
              this.apierror = "Failed to edit building. Please try again.";
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
