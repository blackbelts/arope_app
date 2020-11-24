import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TranslateConfigService } from './services/translate-config.service';
import { UtilService } from './services/util.service';
import { SharedService } from './services/shared.service';
import { OdooApiService } from './services/odoo-api.service';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  textDir: string = "ltr";
  lang: any
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private translate: TranslateConfigService,
    public translates: TranslateService,
    public util: UtilService,
    public navController: NavController,
    public shared: SharedService,
    public odooApi: OdooApiService,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      if (localStorage.getItem("firstOpen") == "false") {
        this.router.navigateByUrl("")
      }
      if (localStorage.getItem("token") != undefined && localStorage.getItem("user_id") != undefined) {
        this.shared.userId = parseInt(localStorage.getItem("user_id"))
        this.shared.userToken = localStorage.getItem("token")
        this.odooApi.updateToken;
        this.router.navigateByUrl('main/tabs');
      }
      this.translates.onLangChange.subscribe((event: LangChangeEvent) => {
        console.log("done")
        if (event.lang == 'en'){
          localStorage.setItem('lang', 'en')
          this.translate.setDir('ltr');
        } else {
          localStorage.setItem('lang', 'ar')
          this.translate.setDir('rtl');
        }
        
      });
      
    });
  }
  ngOnInit() {
    let lang = 'ar';
    lang = this.translate.getDefaultLanguage();
    this.translate.setDefault(lang);
    this.translate.setLanguage(lang);
    if (lang === 'en') {
      this.translate.setDir('ltr');
    } else {
      this.translate.setDir('rtl');
    }
  }
}
