import { Injectable, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DOCUMENT } from '@angular/common';
@Injectable()
export class TranslateConfigService {
  languages: any[] = [];
  constructor(private translate: TranslateService, @Inject(DOCUMENT) private doc) {
    this.languages.push(
      {name: "English", code: "en"},
      {name: "Arabic", code: "ar"}
    );
  }

  getDefaultLanguage() {
    if (!localStorage.getItem('lang')){
      let language = this.translate.getBrowserLang();
      this.translate.setDefaultLang(language);
      return language;
    } else {
      return localStorage.getItem('lang')
    }
  }

  setLanguage(setLang) {
    this.translate.use(setLang);
    localStorage.setItem('lang', setLang)
    
  }
  getLanguages(){
    return this.languages;
  }

  setDefault(defLang) {
    this.translate.setDefaultLang(defLang);
  }

  setDir(dir:string) {
    this.doc.dir = dir;
  }

  getDir() {
    return this.doc.dir;
  }
}