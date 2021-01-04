import { SharedService } from './../services/shared.service';
import { OdooApiService } from './../services/odoo-api.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-claims',
  templateUrl: './claims.page.html',
  styleUrls: ['./claims.page.scss'],
})
export class ClaimsPage implements OnInit {
  public data: any;
  public searchTerm: string = "";
  filterdData: any;
  constructor(public odooApi: OdooApiService,private router: Router, public shared: SharedService, public navCtrl: NavController) { 
    this.odooApi.callOdooMethod('arope.broker', 'get_claims',
    {filter: this.shared.userId}).then(res => {
      this.data = res['data'];
      console.log(this.data)
      this.setFilteredItems();
    });
  }

  ngOnInit() {
  }
  filterItems(searchTerm) {
    return this.data.filter(item => {
      return item.claim_number.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }
  setFilteredItems() {
    this.filterdData = this.filterItems(this.searchTerm);
  }
  createClaim(){
    this.navCtrl.navigateForward('claim-details');
  }
  goToDetails(item){
    let navigationExtras = {
      queryParams: item
    };
    this.router.navigate(['claim-details'], navigationExtras);
  }
  ionViewWillEnter() {
    this.odooApi.callOdooMethod('arope.broker', 'get_claims',
    {filter: this.shared.userId}).then(res => {
      this.data = res['data'];
      console.log(this.data)
      this.setFilteredItems();
    });
  }

}
