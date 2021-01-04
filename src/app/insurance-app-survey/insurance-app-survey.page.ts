import { NavController } from '@ionic/angular';
import { SharedService } from './../services/shared.service';
import { Router } from '@angular/router';
import { OdooApiService } from './../services/odoo-api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-insurance-app-survey',
  templateUrl: './insurance-app-survey.page.html',
  styleUrls: ['./insurance-app-survey.page.scss'],
})
export class InsuranceAppSurveyPage implements OnInit {

  public data: any;
  public searchTerm: string = "";
  filterdData: any; 
  constructor(public odooApi: OdooApiService,private router: Router, public shared: SharedService, public navCtrl: NavController) { 
    this.odooApi.callOdooMethod('arope.broker', 'get_insurance_app_survey',
    {data: this.shared.userId}).then(res => {
      this.data = res['data'];
      this.setFilteredItems();
    });
  }

  ngOnInit() {
  }
  filterItems(searchTerm) {
    return this.data.filter(item => {
      return item.survey_number.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }
  setFilteredItems() {
    this.filterdData = this.filterItems(this.searchTerm);
  }
  goToDetails(item){
    let navigationExtras = {
      queryParams: item
    };
    this.router.navigate(['insurance-app-survey-details'], navigationExtras);
  }
  ionViewWillEnter() {
    this.odooApi.callOdooMethod('arope.broker', 'get_insurance_app_survey',
    {data: this.shared.userId}).then(res => {
      this.data = res['data'];
      this.setFilteredItems();
    });
  }

}
