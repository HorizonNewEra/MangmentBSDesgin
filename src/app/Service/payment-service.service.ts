import { AgendaView, HomeTableView, Payment, PaymentTable, SellFlatView } from 'src/app/Interfaces/payment-interfaces';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { TableViewParams } from '../Interfaces/helpers';

@Injectable({
  providedIn: 'root'
})
export class PaymentServiceService {
  BaseUrl: string = 'http://localhost:2020';
  header = new HttpHeaders({ 'Content-Type': 'application/json', 'accept': '*/*', 'Authorization': `Bearer ${localStorage.getItem('usertoken')}` });
  constructor(private _HttpClient: HttpClient) { }
  GetDateTime(): Observable<any> {
    return this._HttpClient.get<any>(`${this.BaseUrl}/api/Home/GetDateTimeView`, { headers: this.header });
  }
  GetHomeTableView(): Observable<HomeTableView> {
    return this._HttpClient.get<HomeTableView>(`${this.BaseUrl}/api/Home/GetHomeDetails`, { headers: this.header });
  }
  getPaymentdetails(PaymentId: number): Observable<Payment> {
    return this._HttpClient.get<Payment>(`${this.BaseUrl}/api/Payment/GetPaymentDetails/${PaymentId}`, { headers: this.header });
  }
  getPaymentTableView(view: TableViewParams): Observable<PaymentTable> {
    return this._HttpClient.get<PaymentTable>(`${this.BaseUrl}/api/Payment/GetAllPaymentTableView`, {
      headers: this.header,
      params: {
        pageSize: view.pageSize.toString(),
        pageIndex: view.pageIndex.toString(),
        Search: view.Search,
        Sort: view.Sort
      },

    });
  }
  GetAgenda(month:number,year:number): Observable<AgendaView> {
    return this._HttpClient.get<AgendaView>(`${this.BaseUrl}/api/Home/GetAgenda`, { headers: this.header,params: { month: month,year:year } });
  }
  SellFlat(data: SellFlatView): Observable<any> {
    return this._HttpClient.post<any>(`${this.BaseUrl}/api/Payment/SellFlatPayment`, data, { headers: this.header });
  }
}
