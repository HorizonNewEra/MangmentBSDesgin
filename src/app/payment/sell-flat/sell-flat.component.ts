import { flat } from 'src/app/Interfaces/building-interfaces';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientEditAddData } from 'src/app/Interfaces/client-interfaces';
import { SellFlatView } from 'src/app/Interfaces/payment-interfaces';
import { ClientServiceService } from 'src/app/Service/client-service.service';
import { PaymentServiceService } from 'src/app/Service/payment-service.service';

@Component({
  selector: 'app-sell-flat',
  templateUrl: './sell-flat.component.html',
  styleUrls: ['./sell-flat.component.css']
})
export class SellFlatComponent {
apierror:string='';
    isloading: boolean = false;
      sellflatform: FormGroup = new FormGroup({
      clientId: new FormControl(null, [Validators.required, Validators.maxLength(14), Validators.minLength(14)]),
      paymentMethod: new FormControl(null, [Validators.required, Validators.maxLength(100), Validators.minLength(3)]),
      description: new FormControl(null),
      startPrice: new FormControl(null, [Validators.required,Validators.min(0.01)]),
      fullPrice: new FormControl(null, [Validators.required,Validators.min(0.01)]),
      fullMonths: new FormControl(null, [Validators.required,Validators.min(1)]),
      monthlyPrice: new FormControl(null, [Validators.required,Validators.min(0.01)]),
      collectingDate: new FormControl(null, [Validators.required]),
      everyManyMonth: new FormControl(null, [Validators.required, Validators.min(1)]),
    });
    sellflatformdata: SellFlatView =undefined!;
    flatid:number = 0;
    //clientsdata:ClientEditAddData[] = [];
    constructor(private _ActivatedRoute: ActivatedRoute,private _ClientService: ClientServiceService,private _Paymentservice: PaymentServiceService, private _Router: Router) { 
      this._ActivatedRoute.params.subscribe((prams)=>{this.flatid=prams['id']})
    //this.getAllClientsData();
    }
    /*getAllClientsData() {
        this._ClientService.GetAllClientsData().subscribe({
          next: (response) => {
              this.clientsdata = response;
          },
          error: (err:any) => {
            this.apierror = err.error.message;
          }
        });
    }*/
    Sellflat(dataform: FormGroup) {
        this.sellflatformdata = {
          id: this.flatid,
          clientId: dataform.value.clientId,
          paymentMethod: dataform.value.paymentMethod,
          description: dataform.value.description,
          startPrice: dataform.value.startPrice,
          fullPrice: dataform.value.fullPrice,
          fullMonths: dataform.value.fullMonths,
          monthlyPrice: dataform.value.monthlyPrice,
          collectingDate: dataform.value.collectingDate,
          everyManyMonth: dataform.value.everyManyMonth
        };
    
        this.isloading = true;
        if (dataform.valid) {
          this._Paymentservice.SellFlat(this.sellflatformdata).subscribe({
            next: (response) => {
              if (response.status === 200) {
                this._Router.navigate(['/paymentdetails', response.paymentId]);
                this.isloading = false;
              } else {
                this.apierror = "Failed to sell this flat. Please try again.";
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
