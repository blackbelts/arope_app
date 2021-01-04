import { SharedService } from './../services/shared.service';
import { OdooApiService } from './../services/odoo-api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-arope-claims',
  templateUrl: './arope-claims.page.html',
  styleUrls: ['./arope-claims.page.scss'],
})
export class AropeClaimsPage implements OnInit {
  public data: any[] = [];
  public searchTerm: string = "";
  filterdData: any;
  constructor(
    public odooApi: OdooApiService,private router: Router,
    public activatedRoute: ActivatedRoute,
    public shared: SharedService, public navCtrl: NavController
  ) {
    // let ids = [];
    // for (let rec of this.shared.dashboardData['claim_lob']){
    //   ids.concat(rec.ids);
    //   console.log(ids)
    // }
    const ids = this.shared.dashboardData['claim_lob'][0]['ids']
    this.odooApi.callOdooMethod('arope.broker', 'get_arope_claims',
      {data: ids}).then(res => {
        this.data = res['data'];
        this.setFilteredItems();
   });
  }

  ngOnInit() {
  }
  filterItems(searchTerm) {
    return this.data.filter(item => {
      return item.policy_number.toString().toLowerCase().indexOf(searchTerm.toString().toLowerCase()) > -1;
    });
  }
  setFilteredItems() {
    this.filterdData = this.filterItems(this.searchTerm);
  }

}
