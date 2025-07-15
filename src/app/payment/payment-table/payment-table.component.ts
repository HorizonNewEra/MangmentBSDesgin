import { PaymentServiceService } from 'src/app/Service/payment-service.service';
import { PaymentTable, PaymentTableView } from './../../Interfaces/payment-interfaces';
import { Payment } from 'src/app/Interfaces/payment-interfaces';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TableViewParams } from 'src/app/Interfaces/helpers';

@Component({
  selector: 'app-payment-table',
  templateUrl: './payment-table.component.html',
  styleUrls: ['./payment-table.component.css']
})
export class PaymentTableComponent {
  isloding:boolean=true;
  paymentdata:PaymentTable | undefined
  Payments:PaymentTableView[] = [];
 
  params:TableViewParams={
    pageSize: 0, pageIndex: 0, Search: '', Sort: '',
  }
  Hasdata: boolean = false;
  apierror: string = '';
  constructor(private PaymentService: PaymentServiceService) {}

  ngOnInit() {
    this.getBuildingTableView();
  }
  getBuildingTableView() {
    this.PaymentService.getPaymentTableView(this.params).subscribe({
      next: (response) => {
        this.paymentdata = response;
        if (response.data.length > 0) {
          this.Payments = response.data;
          this.Hasdata = true;
        }
        this.isloding = false;
      },
      error: (err) => {
        this.apierror = err.error.message;
        this.isloding = false;
      }
    });
  }

        
}
