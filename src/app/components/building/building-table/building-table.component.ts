import { Component, OnInit } from '@angular/core';
import { buildings, buildingtabledata } from 'src/app/Interfaces/building-interfaces';
import { TableViewParams } from 'src/app/Interfaces/helpers';
import { BuildingServiceService } from 'src/app/Service/building-service.service';

@Component({
  selector: 'app-building-table',
  templateUrl: './building-table.component.html',
  styleUrls: ['./building-table.component.css']
})
export class BuildingTableComponent implements OnInit {
  isloding:boolean=true;
  buildingdata:buildingtabledata | undefined
  buildings:buildings[] = [];
  contractImages: string[] = [];
  params:TableViewParams={
    pageSize: 0, pageIndex: 0, Search: '', Sort: '',
  }
  Hasdata: boolean = false;
  apierror: string = '';
  constructor(private buildingService: BuildingServiceService) {}

  ngOnInit() {
    this.getBuildingTableView();
  }
  getBuildingTableView() {
    this.buildingService.GetBuildingTableView(this.params).subscribe({
      next: (response) => {
        this.buildingdata = response;
        if (response.data.length > 0) {
          this.buildings = response.data;
          this.Hasdata = true;
        }
        this.isloding = false;
      },
      error: (err) => {
        this.apierror = err.error.message;
        this.isloding = false;
      }
    });
  }

  openImage(index: number) {
    this.contractImages = this.buildings[index].landContractImages;
  }
}
