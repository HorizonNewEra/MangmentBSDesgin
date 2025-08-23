import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InstallmentDetails, PayInstallment } from '../Interfaces/installment-interfaces';

@Injectable({
  providedIn: 'root'
})
export class InstallmentServiceService {
 header = new HttpHeaders({ 'Content-Type': 'application/json','accept': '*/*', 'Authorization': `Bearer ${localStorage.getItem('usertoken')}` });
    BaseUrl: string = 'http://localhost:2020';
   constructor(private http: HttpClient) {}
  getInstallmentDetails(installmentId: number): Observable<InstallmentDetails> {
    return this.http.get<InstallmentDetails>(`${this.BaseUrl}/api/Installment/InstallmentDetails/${installmentId}`, { headers: this.header });
  }
  PayInstallment(data: PayInstallment): Observable<any> {
    return this.http.post(`${this.BaseUrl}/api/Installment/PayInstallment`, data,{ headers: this.header });
  }
}
