import { Component } from '@angular/core';
import { Clienttable, Clienttableview } from 'src/app/Interfaces/client-interfaces';
import { TableViewParams } from 'src/app/Interfaces/helpers';
import { ClientServiceService } from 'src/app/Service/client-service.service';

@Component({
  selector: 'app-client-table',
  templateUrl: './client-table.component.html',
  styleUrls: ['./client-table.component.css']
})
export class ClientTableComponent {

    isloding:boolean= true;
    Clienttableview:Clienttable | undefined
    clientdata:Clienttableview[] = [];
    view:TableViewParams={
      pageSize: 0, pageIndex: 0, Search: '', Sort: '',
    }
    Hasdata: boolean = false;
    apierror: string = '';
    constructor(private ClientService: ClientServiceService) {}

    ngOnInit() {
      this.getClientTableView();
    }
    getClientTableView() {
      this.ClientService.GetclientTableView(this.view).subscribe({
        next: (response:any) => {
          this.Clienttableview = response;
          if (response.data.length > 0) {
            this.clientdata = response.data;
            this.Hasdata = true;
          }
          this.isloding = false;
        },
        error: (err:any) => {
          this.apierror = err.error.message;
          this.isloding = false;
        }
      });
    }
  
}
