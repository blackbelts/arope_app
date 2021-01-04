import { NavController } from '@ionic/angular';
import { SharedService } from './../services/shared.service';
import { OdooApiService } from './../services/odoo-api.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-insurance-app',
  templateUrl: './insurance-app.page.html',
  styleUrls: ['./insurance-app.page.scss'],
})
export class InsuranceAppPage implements OnInit {
  public data: any;
  public searchTerm: string = "";
  filterdData: any; 
  constructor(public odooApi: OdooApiService,private router: Router, public shared: SharedService, public navCtrl: NavController) {
    this.odooApi.callOdooMethod('arope.broker', 'get_insurance_apps',
    {data: this.shared.userId}).then(res => {
      this.data = res['data'];
      console.log(this.data)
      this.setFilteredItems();
    });
   }

  ngOnInit() {
  }
  filterItems(searchTerm) {
    return this.data.filter(item => {
      return item.application_number.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }
  setFilteredItems() {
    this.filterdData = this.filterItems(this.searchTerm);
  }

  createApp(){
    this.navCtrl.navigateForward('insurance-app-details')
  }
  goToDetails(item){
    let navigationExtras = {
      queryParams: item
    };
    this.router.navigate(['insurance-app-details'], navigationExtras);
  }
  ionViewWillEnter() {
    this.odooApi.callOdooMethod('arope.broker', 'get_insurance_apps',
    {data: this.shared.userId}).then(res => {
      this.data = res['data'];
      console.log(this.data)
      this.setFilteredItems();
    });
  }

}
