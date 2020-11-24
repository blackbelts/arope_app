import { SharedService } from './../services/shared.service';
import { OdooApiService } from './../services/odoo-api.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.page.html',
  styleUrls: ['./requests.page.scss'],
})
export class RequestsPage implements OnInit {
  public data: any;
  public searchTerm: string = "";
  filterdData: any;
  constructor(public odooApi: OdooApiService,private router: Router, public shared: SharedService) {
    this.odooApi.callOdooMethod('arope.broker', 'get_requests',
    {filter: this.shared.userId}).then(res => {
      this.data = res['data'];
      console.log(this.data)
      this.setFilteredItems();
    });
   }

   ngOnInit(){
    // this.setFilteredItems();
  }

  filterItems(searchTerm) {
    return this.data.filter(item => {
      return item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }
  setFilteredItems() {
    this.filterdData = this.filterItems(this.searchTerm);
  }

}
