import { ClientEditComponent } from './../components/client/client-edit/client-edit.component';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ClientDetails, ClientEditAddData, Clienttable, Clienttableview } from '../Interfaces/client-interfaces';
import { TableViewParams } from '../Interfaces/helpers';

@Injectable({
  providedIn: 'root'
})
export class ClientServiceService {
  BaseUrl: string = 'http://localhost:2020';
  header = new HttpHeaders({ 'Content-Type': 'application/json', 'accept': '*/*', 'Authorization': `Bearer ${localStorage.getItem('usertoken')}` });
  constructor(private _HttpClient: HttpClient) { }


  GetclientTableView(view: TableViewParams): Observable<Clienttable> {
    return this._HttpClient.get<Clienttable>(`${this.BaseUrl}/api/Client/ClientTableView`, {
      headers: this.header,
      params: {
        pageSize: view.pageSize,
        pageIndex: view.pageIndex,
        Search: view.Search,
        Sort: view.Sort
      },
    });
  }
  GetClientDetails(id: string): Observable<ClientDetails> {
    return this._HttpClient.get<ClientDetails>(`${this.BaseUrl}/api/Client/ClientDetailsView/${id}`, { headers: this.header });
  }
  GetAllClientsData(): Observable<ClientEditAddData[]> {
    return this._HttpClient.get<ClientEditAddData[]>(`${this.BaseUrl}/api/Client/GetAllClientsData`, { headers: this.header });
  }
  ClientEdit(data: ClientEditAddData): Observable<any> {
    return this._HttpClient.post(`${this.BaseUrl}/api/Client/EditClient`, data, { headers: this.header });
  }
  ClientAdd(data: ClientEditAddData): Observable<any> {
    return this._HttpClient.post(`${this.BaseUrl}/api/Client/AddClient`, data, { headers: this.header });
  }
}
