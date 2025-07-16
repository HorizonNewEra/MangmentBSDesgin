import { ClientServiceService } from 'src/app/Service/client-service.service';
import { ActivatedRoute } from '@angular/router';
import { ClientDetails, ClientPayment, clientflats } from './../../../Interfaces/client-interfaces';
import { Component } from '@angular/core';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent {

  clientId: string ='';
  ClientDetails: ClientDetails | undefined;
  isloding: boolean = true;
  apierror: string = '';
   contractImages: string[] = [];
   clientflats:clientflats[] = [];
  clientPayments: ClientPayment[] = [];
  constructor(private _ActivatedRoute: ActivatedRoute, private ClientServiceService: ClientServiceService) { }
  ngOnInit(): void {
    this._ActivatedRoute.params.subscribe((prams) => { this.clientId = prams['id'] })
    this.getbuildingdetails();
  }
  getbuildingdetails() {
    this.ClientServiceService.GetClientDetails(this.clientId).subscribe({
      next: (response: any) => {
        this.ClientDetails = response;
        this.clientPayments = response.clientPayments;
        this.clientflats=response.clientflats;
        this.isloding = false;
      },
      error: (err: any) => {
        this.apierror = err.error.message;
        this.isloding = false;
      }
    });
  }
  
  openImage(index: number) {
    this.contractImages = this.clientflats[index].flatContractImages;
  }


}
