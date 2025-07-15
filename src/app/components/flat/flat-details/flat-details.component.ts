import { installment } from './../../../Interfaces/flat-interfaces';
import { FlatServiceService } from 'src/app/Service/flat-service.service';
import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FlatDetails } from 'src/app/Interfaces/flat-interfaces';

@Component({
  selector: 'app-flat-details',
  templateUrl: './flat-details.component.html',
  styleUrls: ['./flat-details.component.css']
})
export class FlatDetailsComponent implements OnInit {


   flatId : number= 0;

   flatdetails: FlatDetails | undefined;
   isloding: boolean = true;
   apierror: string = '';
   installments: installment[] = [];
   contractImages: string[] = [];
   constructor(private _ActivatedRoute: ActivatedRoute, private _BuildingService: FlatServiceService) { }
   ngOnInit(): void {
       this._ActivatedRoute.params.subscribe((prams)=>{this.flatId=prams['id']})
       this.getbuildingdetails();
      }
      getbuildingdetails() {
          this._BuildingService.getFlatDetails(this.flatId).subscribe({
              next: (response:any) => {
                  if (response === null) {
                      this.apierror = 'Flat not found';
                      this.isloding = false;
                      return;
                  }
                  this.flatdetails = response;
                  this.installments = response.installments;
                  this.contractImages = response.flatContractImages;
                  this.isloding = false;
              },
              error: (err:any) => {
                  this.apierror = err.error.message;
                  this.isloding = false;
              }
          });
      }



}





