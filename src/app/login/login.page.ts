import { SharedService } from './../services/shared.service';
import { OdooApiService } from './../services/odoo-api.service';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateConfigService } from '../services/translate-config.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public frmData: any;
  selectedLanguage: any;
  languages: any;
  group:any;
  constructor(
    public navCtrl: NavController,
    private router: Router,
    private odooApi: OdooApiService,
    public shared: SharedService,
    public languageService: TranslateConfigService,
    ) {
      this.selectedLanguage = this.languageService.getDefaultLanguage();
      this.languages = this.languageService.getLanguages();
      this.frmData = { email: '', password: '' };
      this.group = localStorage.getItem('group');
  }

  ngOnInit() {
  }
  onSubmit(f) {
    
    if (!f.valid) {
      return ;
    }
    this.odooApi.login(f.value.username, f.value.password).then(res => {
      console.log("res", res)
      let user = JSON.parse(JSON.stringify(res))
      this.shared.userToken = user.token
      this.shared.userId = user.user.id
      localStorage.setItem("token", user.token);
      localStorage.setItem("user_id", user.user.id);
      this.odooApi.updateToken();
      this.odooApi.callOdooMethod('arope.broker', 'get_user_groups', 
        {data: user.user.id}).then(res => {
          console.log(res['data']['groups'])
          if (res['data']['groups'].includes('Broker')){
            localStorage.setItem("group", 'Broker');
            this.odooApi.callOdooMethod('arope.broker', 'get_broker_dashboard',
            {data: Number(localStorage.getItem('user_id'))}).then(res => {
              // console.log(res.data);
              // this.data = res['data'];
              this.shared.dashboardData = res['data'];
            });
            this.group = 'Broker';
            this.shared.group = 'Broker';
            this.router.navigateByUrl('tab2');
          } else if (res['data']['groups'].includes('Surveyor')){
            this.group = 'Surveyor';
            this.shared.group = 'Surveyor';
            this.odooApi.callOdooMethod('arope.broker', 'surveyor_dashboard',
            {data: Number(localStorage.getItem('user_id'))}).then(res => {
              // console.log(res.data);
              // this.data = res['data'];
              this.shared.dashboardData = res['data'];
              console.log(res['data']);
            });
          } else {
            this.odooApi.callOdooMethod('arope.broker', 'get_broker_dashboard',
            {data: Number(localStorage.getItem('user_id'))}).then(res => {
              // console.log(res.data);
              // this.data = res['data'];
              this.shared.dashboardData = res['data'];
            });
            this.group = 'Customer';
            this.shared.group = 'Customer';
            this.router.navigateByUrl('tab2');
          }
      });
      
      
      
    });
  }
  languageChanged(){
    this.languageService.setLanguage(this.selectedLanguage);
  }
  surveyorSignIn(){
    localStorage.setItem("group", 'Surveyor');
    this.shared.group = 'Surveyor';
    this.router.navigateByUrl('tab2');
  }
  customerSignIn(){
    localStorage.setItem("group", 'Customer');
    this.shared.group = 'Customer';
    this.router.navigateByUrl('tab2');
  }

}
