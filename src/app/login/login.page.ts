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
      this.router.navigateByUrl('main/tabs');
    });
  }
  languageChanged(){
    this.languageService.setLanguage(this.selectedLanguage);
  }

}
