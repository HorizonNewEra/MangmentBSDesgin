import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/Service/user-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  islogin: boolean = false;
  constructor(public _AuthService: UserServiceService, public _Router: Router) { }
  ngOnInit(): void {
    this._AuthService.userdata.subscribe({
      next: () => {
        if (this._AuthService.userdata.getValue() !== null) {
          this.islogin = true;
        } else {
          this.islogin = false;
        } 
      }
    })
  }
}
