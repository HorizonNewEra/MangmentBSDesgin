import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { login, register, user, userTokenClaims } from '../Interfaces/user-interfaces';
import { BehaviorSubject, map, Observable, ReplaySubject } from 'rxjs';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  BaseUrl: string = 'http://mangmentbs.runasp.net';
  header = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('usertoken')}` });
  userdata=new BehaviorSubject<userTokenClaims | null>(null);
  constructor(private _HttpClient: HttpClient, private router: Router) { 
    if(localStorage.getItem('usertoken'))
    this.decodeusertoken();
  }
decodeusertoken(){
    let usertoken=JSON.stringify(localStorage.getItem('usertoken'));
    let decodetoken:any=jwtDecode(usertoken);
    let userTokenClaims:userTokenClaims = {
      id: decodetoken['id'] as string,
      name: decodetoken['name'] as string,
      role: decodetoken['role'] as string,
      isActive: decodetoken['isActive'] as boolean
    };
    this.userdata.next(userTokenClaims);
  }

  signup(data: register):Observable<user> {
    return this._HttpClient.post<user>(`${this.BaseUrl}/api/User/Register`, data);
  }

logout() {
    localStorage.removeItem('usertoken');
    this.userdata.next(null);
    this.router.navigateByUrl('/login');
  }

loadCurrentUser(token: string): Observable<user> {
    return this._HttpClient.get<user>(`${this.BaseUrl}/api/User/GetCurrentUser`, {headers: this.header});
  }

login(data:login): Observable<user> {
    return this._HttpClient.post<user>(`${this.BaseUrl}/api/User/Login`, data);
  }
}

