import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Addbuilding, buildingdetail, buildingtabledata, Editbuilding } from '../Interfaces/building-interfaces';
import { TableViewParams } from '../Interfaces/helpers';

@Injectable({
  providedIn: 'root'
})
export class BuildingServiceService {
  BaseUrl: string = 'http://mangmentbs.runasp.net';
  header = new HttpHeaders({ 'Content-Type': 'application/json','accept': '*/*', 'Authorization': `Bearer ${localStorage.getItem('usertoken')}` });
  constructor(private _HttpClient: HttpClient) { }

  GetBuildingTableView(view: TableViewParams): Observable<buildingtabledata> {
      return this._HttpClient.get<buildingtabledata>(`${this.BaseUrl}/api/Building/BuildingTableView`, {
      headers: this.header,
      params: {
        pageSize: view.pageSize.toString(),
        pageIndex: view.pageIndex.toString(),
        Search: view.Search,
        Sort: view.Sort
      },

    });
    }
  GetBuildingDetails(id: number): Observable<buildingdetail> {
      return this._HttpClient.get<buildingdetail>(`${this.BaseUrl}/api/Building/BuildingDetailsView/${id}`, { headers: this.header });
    }
  AddBuilding(data: Addbuilding): Observable<any> {
      return this._HttpClient.post(`${this.BaseUrl}/api/Building/AddBuilding`, data, { headers: this.header });
    }
  EditBuilding(data: Editbuilding): Observable<any> {
      return this._HttpClient.post(`${this.BaseUrl}/api/Building/EditBuilding`, data, { headers: this.header });
    }
  }
