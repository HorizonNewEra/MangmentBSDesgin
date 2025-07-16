import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { buildingdetail, flat } from 'src/app/Interfaces/building-interfaces';
import { BuildingServiceService } from 'src/app/Service/building-service.service';

@Component({
  selector: 'app-building-details',
  templateUrl: './building-details.component.html',
  styleUrls: ['./building-details.component.css']
})
export class BuildingDetailsComponent implements OnInit {
    buildingid:number=0;
    buildingdetails: buildingdetail | undefined;
    isloding: boolean = true;
    apierror: string = '';
    flats: flat[] = [];
    buildingContractImages: string[] = [];
    contractImages: string[] = [];
    constructor(private _ActivatedRoute: ActivatedRoute, private _BuildingService: BuildingServiceService) { }
    ngOnInit(): void {
      this._ActivatedRoute.params.subscribe((prams)=>{this.buildingid=prams['id']})
      this.getbuildingdetails();
    }
    getbuildingdetails() {
        this._BuildingService.GetBuildingDetails(this.buildingid).subscribe({
            next: (response) => {
                if (response === null) {
                    this.apierror = 'Building not found';
                    this.isloding = false;
                    return;
                }
                this.buildingdetails = response;
                this.flats = response.flats;
                this.buildingContractImages = response.buildingContractImages;
                this.isloding = false;
            },
            error: (err) => {
                this.apierror = err.error.message;
                this.isloding = false;
            }
        });
    }
      openImage(index: number) {
    this.contractImages = this.flats[index].flatContractImages;
  }
}
