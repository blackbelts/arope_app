import { Component, OnInit } from '@angular/core';
import { OdooApiService } from './../services/odoo-api.service';


@Component({
  selector: 'app-cancelations-tab',
  templateUrl: './cancelations-tab.page.html',
  styleUrls: ['./cancelations-tab.page.scss'],
})
export class CancelationsTabPage implements OnInit {
  public rows: any;
  constructor(public odooApi: OdooApiService) {
    this.odooApi.callOdooMethod('policy.request', 'search_read',
     {filter: [["type", "=", 'end']], need: ['name','policy', 'product']}).then(res => {
      // console.log(res);
      this.rows = res['data'];
      console.log(this.rows)
      
    });
   }

  ngOnInit() {
  }

}
