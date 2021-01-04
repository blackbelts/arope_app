import { SharedService } from './../services/shared.service';
import { OdooApiService } from './../services/odoo-api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.page.html',
  styleUrls: ['./collections.page.scss'],
})
export class CollectionsPage implements OnInit {
  public data: any[] = [];
  public searchTerm: string = "";
  filterdData: any;
  constructor(
    public odooApi: OdooApiService,private router: Router,
    public activatedRoute: ActivatedRoute,
    public shared: SharedService, public navCtrl: NavController
    ) {
      const ids = this.shared.dashboardData['collections']['Green']['ids'].concat(this.shared.dashboardData['collections']['Red']['ids'],this.shared.dashboardData['collections']['Orange']['ids'])
      if (ids) {
        console.log(ids);
        this.odooApi.callOdooMethod('arope.broker', 'get_my_collections',
      {data: ids}).then(res => {
        this.data = res['data'];
        this.setFilteredItems();
      });
      }
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
