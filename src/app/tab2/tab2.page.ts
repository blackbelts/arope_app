import { SharedService } from 'src/app/services/shared.service';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { TranslateConfigService } from '../services/translate-config.service';
import { OdooApiService } from './../services/odoo-api.service';
import { Component , OnInit} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  selectedLanguage: any;
  languages: any;
  data: any;
  constructor(
    public odooApi: OdooApiService,
    public languageService: TranslateConfigService,
    public router: Router,
    public sanitizer: DomSanitizer,
    public navCtrl: NavController,
    public loadingController: LoadingController,
    public shared: SharedService
    ) {
    this.selectedLanguage = this.languageService.getDefaultLanguage();
    this.languages = this.languageService.getLanguages();
    this.odooApi.callOdooMethod('arope.broker', 'get_broker_dashboard',
     {data: Number(localStorage.getItem('user_id'))}).then(res => {
      // console.log(res.data);
      this.data = res['data'];
      this.shared.dashboardData = res['data'];
    });
    
  }
  ngOnInit(){
    
  }
  
  languageChanged(){
    this.languageService.setLanguage(this.selectedLanguage);
  }
  goToRequests(){
    this.router.navigateByUrl('requests');
  }
  goToInsuranceApps(){
    this.router.navigateByUrl('insurance-app');
  }
  goToQuotationService() {
    this.router.navigateByUrl('quotation-service');
  }
  

}
