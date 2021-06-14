import { OdooApiService } from '../../services/odoo-api.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TranslateConfigService } from '../../services/translate-config.service';

@Component({
  selector: 'app-home-menu',
  templateUrl: './home-menu.component.html',
  styleUrls: ['./home-menu.component.scss'],
})
export class HomeMenuComponent implements OnInit {
  selectedLanguage: any;
  languages: any;

  constructor(public languageService: TranslateConfigService,public router: Router, public odooApi: OdooApiService) { 
    this.selectedLanguage = this.languageService.getDefaultLanguage();
    this.languages = this.languageService.getLanguages();
  }

  ngOnInit() {}

  languageChanged(){
    console.log('sfsf')
    this.languageService.setLanguage(this.selectedLanguage);
  }
  logout(){
    localStorage.clear();
    this.router.navigateByUrl('/');
    this.odooApi.dismissPopover();
  }


}
