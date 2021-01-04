import { HomeMenuComponent } from './../components/home-menu/home-menu.component';
import { SharedService } from 'src/app/services/shared.service';
import { NavController, PopoverController } from '@ionic/angular';
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
  name: any;
  currentPopover:any;
  constructor(
    public odooApi: OdooApiService,
    public languageService: TranslateConfigService,
    public router: Router,
    public sanitizer: DomSanitizer,
    public navCtrl: NavController,
    public loadingController: LoadingController,
    public shared: SharedService,
    public popoverController: PopoverController
    ) {
    this.selectedLanguage = this.languageService.getDefaultLanguage();
    this.languages = this.languageService.getLanguages();
    
    
    
  }
  ngOnInit(){
    this.currentPopover = null;
    if (localStorage.getItem('group') == 'Broker' || localStorage.getItem('group') == 'Customer'){
      this.odooApi.callOdooMethod('arope.broker', 'get_broker_dashboard',
    {data: Number(localStorage.getItem('user_id'))}).then(res => {
      // console.log(res.data);
      this.data = res['data'];
      this.shared.dashboardData = res['data'];
      this.name = res['data']['user']['name'];
    });
  } else if (localStorage.getItem('group') == 'Surveyor'){
    this.odooApi.callOdooMethod('arope.broker', 'surveyor_dashboard',
    {data: Number(localStorage.getItem('user_id'))}).then(res => {
      // console.log(res.data);
      this.data = res['data'];
      this.name = res['data']['user']['name'];
      this.shared.dashboardData = res['data'];
      console.log(res['data']);
    });
  }
  }
  
  languageChanged(){
    this.languageService.setLanguage(this.selectedLanguage);
  }
  goToRequests(){
    this.router.navigateByUrl('requests');
  }
  goToClaims(){
    this.router.navigateByUrl('claims');
  }
  goToInsuranceApps(){
    this.router.navigateByUrl('insurance-app');
  }
  goToQuotationService() {
    this.router.navigateByUrl('quotation-service');
  }
  goToPolicyService() {
    this.router.navigateByUrl('policy');
  }
  logout(){
    localStorage.clear();
    this.router.navigateByUrl('/');
  }
  goToDashboard(){
    this.router.navigateByUrl('tab1');
  }
  goToProfile(){
    this.router.navigateByUrl('tab3');
  }
  goToInsuranceAppSurvey() {
    this.router.navigateByUrl('insurance-app-survey');
  }
  goToMotorClaimSurvey() {
    this.router.navigateByUrl('motor-claims-survey');
  }
  goToNonMotorClaimSurvey() {
    this.router.navigateByUrl('non-motor-claims-survey');
  }
  async handleButtonClick(ev) {
    const popover = await this.popoverController.create({
      component: HomeMenuComponent,
      componentProps:{},
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });
    this.currentPopover = popover;
    popover.style.cssText = '--min-width: 185px; --max-width: 185px;';
    return popover.present();
  }
  dismissPopover() {
    if (this.currentPopover) {
      this.currentPopover.dismiss().then(() => { this.currentPopover = null; });
    }
  }

}
