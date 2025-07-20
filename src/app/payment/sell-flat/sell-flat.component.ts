import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SellFlatView } from 'src/app/Interfaces/payment-interfaces';
import { ClientServiceService } from 'src/app/Service/client-service.service';
import { PaymentServiceService } from 'src/app/Service/payment-service.service';

@Component({
  selector: 'app-sell-flat',
  templateUrl: './sell-flat.component.html',
  styleUrls: ['./sell-flat.component.css']
})
export class SellFlatComponent {
  apierror: string = '';
  isloading: boolean = false;
  sellflatform: FormGroup = new FormGroup({
    clientId: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]{14}$/)]),
    paymentMethod: new FormControl(null, [Validators.required, Validators.maxLength(100), Validators.minLength(3)]),
    description: new FormControl(null),
    startPrice: new FormControl(null, [Validators.required, Validators.min(0.01)]),
    fullPrice: new FormControl(null, [Validators.required, Validators.min(0.01)]),
    fullMonths: new FormControl(null, [Validators.required, Validators.min(1)]),
    monthlyPrice: new FormControl(null, [Validators.required, Validators.min(0.01)]),
    collectingDate: new FormControl(null, [Validators.required]),
    everyManyMonth: new FormControl(null, [Validators.required, Validators.min(1)]),
  });
  sellflatformdata: SellFlatView = undefined!;
  flatId: number = 0;
  constructor(private _ActivatedRoute: ActivatedRoute, private _ClientService: ClientServiceService, private _Paymentservice: PaymentServiceService, private _Router: Router) {
    this._ActivatedRoute.params.subscribe((prams) => { this.flatId = prams['id'] })
  }
  Sellflat(dataform: FormGroup) {
    this.sellflatformdata = {
      flatId: this.flatId,
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
          if (response.status === "200") {
            this.isloading = false;
            this._Router.navigate(['/payment']);
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
