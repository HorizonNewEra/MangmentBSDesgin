import { Payment } from 'src/app/Interfaces/payment-interfaces';
import { PaymentServiceService } from 'src/app/Service/payment-service.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.css']
})
export class PaymentDetailsComponent implements OnInit {


  paymentId: number = 0;
  paymentdetails: Payment | undefined;
  isloding: boolean = true;
  apierror: string = '';
  constructor(private PaymentServiceService: PaymentServiceService, private _ActivatedRoute: ActivatedRoute) { }


  ngOnInit(): void {
    this._ActivatedRoute.params.subscribe((prams) => { this.paymentId = prams['id'] })
    this.getpayment();

  }
  getpayment() {
    this.PaymentServiceService.getPaymentdetails(this.paymentId).subscribe({
      next: (response: Payment) => {
        console.log(response);
        if (response === null) {
          this.apierror = 'payment not found';
          this.isloding = false;
          return;
        }
        this.paymentdetails = response;
        this.isloding = false;
      },
      error: (err: any) => {
        this.apierror = err.error.message;
        this.isloding = false;
      }
    });
  }
}



