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
  signup: boolean = false;
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
              this.shared.name = res['data']['user']['name'];
              localStorage.setItem("user_name", res['data']['user']['name']);

              this.shared.dashboardData = res['data'];
            });
            localStorage.setItem("group", 'Broker');
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
              this.shared.name = res['data']['user']['name'];
              localStorage.setItem("user_name", res['data']['user']['name']);
              this.shared.dashboardData = res['data'];
              console.log(res['data']);
            });
            localStorage.setItem("group", 'Surveyor');
            this.shared.group = 'Surveyor';
            this.router.navigateByUrl('tab2');
          } else {
            this.odooApi.callOdooMethod('arope.broker', 'get_broker_dashboard',
            {data: Number(localStorage.getItem('user_id'))}).then(res => {
              // console.log(res.data);
              // this.data = res['data'];
              this.shared.name = res['data']['user']['name'];
              localStorage.setItem("user_name", res['data']['user']['name']);
              this.shared.dashboardData = res['data'];
            });
            localStorage.setItem("group", 'Customer');
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
  goToSignup(){
    this.signup = true;
  }
  onSignub(fs){
    this.odooApi.login('online', 'online').then(res => {
      let user = JSON.parse(JSON.stringify(res))
      this.shared.userToken = user.token
      this.shared.userId = user.user.id
      localStorage.setItem("token", user.token);
      localStorage.setItem("user_id", user.user.id);
      this.odooApi.updateToken();
      localStorage.setItem("group", 'New');
      this.group = 'New';
      this.shared.group = 'New';
      this.shared.name = fs.value.name;
      localStorage.setItem("user_name", fs.value.name);
      const data = {'name': fs.value.name, 'phone': fs.value.mobNum, 'mail': fs.value.email,
       'username': fs.value.username, 'password': fs.value.password}
      this.odooApi.callOdooMethod('ticket.api', 'register_ticket', 
        {data: data}).then(res => {
          if (res['data']){
            this.router.navigateByUrl('tab2');
          }
        });
    });
  }
  
}
