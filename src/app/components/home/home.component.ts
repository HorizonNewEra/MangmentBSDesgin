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
    this.getHomeTableView();
  }
 getHomeTableView() {
    this._PaymentService.GetHomeTableView().subscribe({
      next: (response) => {
        if (response) {
          this.homeTableView = response;
        }
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
