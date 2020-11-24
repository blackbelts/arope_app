import { OdooApiService } from './../services/odoo-api.service';
import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

export interface Data {
  endorsments: string;
}

@Component({
  selector: 'app-endorsments-tab',
  templateUrl: './endorsments-tab.page.html',
  styleUrls: ['./endorsments-tab.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EndorsmentsTabPage implements OnInit {
  public data: Data;
  public columns: any;
  public rows: any;

  constructor(public odooApi: OdooApiService) {
    this.columns = [
      { name: 'Request Num' , prop: 'name'},
      { name: 'Policy Num', prop: 'policy' },
      { name: 'Product', prop: 'product'}
    ];
    this.odooApi.callOdooMethod('policy.request', 'search_read',
     {filter: [], need: ['id' ,'name','policy', 'product','type']}).then(res => {
      // console.log(res);
      this.rows = res['data'];
      console.log(this.rows)
      
    });

   }


  ngOnInit() {
  }

}
