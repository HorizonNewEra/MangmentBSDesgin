import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InstallmentDetails, PayInstallment } from 'src/app/Interfaces/installment-interfaces';
import { InstallmentServiceService } from 'src/app/Service/installment-service.service';

@Component({
  selector: 'app-installment-details',
  templateUrl: './installment-details.component.html',
  styleUrls: ['./installment-details.component.css']
})
export class InstallmentDetailsComponent implements OnInit {
  installmentId: number = 0;
  installmentdetails: InstallmentDetails | undefined;
  data:PayInstallment|undefined
  isloding: boolean = true;
  apierror: string = '';
  constructor(private _ActivatedRoute: ActivatedRoute, private _InstallmentgService: InstallmentServiceService) { }
  ngOnInit(): void {
    this._ActivatedRoute.params.subscribe((prams) => { this.installmentId = prams['id'] })
    this.getInstallmentDetails();
  }
  getInstallmentDetails() {
    this._InstallmentgService.getInstallmentDetails(this.installmentId).subscribe({
      next: (response: InstallmentDetails) => {
        if (response === null) {
          this.apierror = 'Installment not found';
          this.isloding = false;
          return;
        }
        this.installmentdetails = response;
        this.isloding = false;
      },
      error: (err: any) => {
        this.apierror = err.error.message;
        this.isloding = false;
      }
    });
  }
  payInstallment(idd:number) {
    this.data={id: idd}
    console.log(this.data)
    this._InstallmentgService.PayInstallment(idd).subscribe({
      next: (response: any) => {
        console.log(response)
        if (response.status === "200") {
          alert('تم دفع القسط')
          this.getInstallmentDetails();
        }
        else {
          alert('خطأ في الدفع, الرجاء المحاولة لاحقا');
        }
      },
      error: (err: any) => {
        console.log(err)
        this.apierror = err.error.message;
      }
    });
  }
}
