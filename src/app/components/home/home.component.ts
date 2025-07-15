import { Component, OnInit } from '@angular/core';
import { HomeTableView } from 'src/app/Interfaces/payment-interfaces';
import { PaymentServiceService } from 'src/app/Service/payment-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  homeTableView: HomeTableView | undefined;
  date:string='';
  constructor(private _PaymentService: PaymentServiceService) { }
  async ngOnInit() {
    this.getDate();
  }
 getDate() {
   this._PaymentService.GetDateTime().subscribe({
      next: (response) => {
        this.date= response.date;
        console.log(response.date);
        this.getHomeTableView(this.date);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
 getHomeTableView(Datey: string) {
    if (!Datey) {
      console.error('Date is not set, cannot fetch home table view.');
      return;
    }
    console.log('Fetching home table view for date:', Datey);
    this._PaymentService.GetHomeTableView(Datey).subscribe({
      next: (response) => {
        if (response) {
          console.log(response);
          this.homeTableView = response;
        }
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
