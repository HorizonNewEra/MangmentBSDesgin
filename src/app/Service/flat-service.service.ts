import { SellFlat } from './../Interfaces/flat-interfaces';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddFlat, EditFlat } from '../Interfaces/flat-interfaces';
import { Observable } from 'rxjs';
import { FlatDetails } from '../Interfaces/flat-interfaces'; // تأكد من وجود FlatDetails في هذا المسار أو عدله حسب الحاجة

@Injectable({
  providedIn: 'root'
})
export class FlatServiceService {
  BaseUrl: string = 'http://mangmentbs.runasp.net';
  header = new HttpHeaders({ 'Content-Type': 'application/json', 'accept': '*/*', 'Authorization': `Bearer ${localStorage.getItem('usertoken')}` });
  constructor(private _HttpClient: HttpClient) { }
  AddFlat(data: AddFlat): Observable<any> {
    return this._HttpClient.post(`${this.BaseUrl}/api/Flat/AddFlat`, data, { headers: this.header });
  }
    EditFlat(data: EditFlat): Observable<any> {
    return this._HttpClient.post(`${this.BaseUrl}/api/Flat/EditFlat`, data, { headers: this.header });
  }

    getFlatDetails(flatId: number): Observable<FlatDetails> {
    return this._HttpClient.get<FlatDetails>(`${this.BaseUrl}/api/Flat/FlatDetailsView/${flatId}`, { headers: this.header });
  }

SellFlat(data: SellFlat): Observable<any> {
    return this._HttpClient.post(`${this.BaseUrl}/api/Payment/SellFlatPayment`, data, { headers: this.header });
  }

}




