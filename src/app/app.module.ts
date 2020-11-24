import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedService } from './services/shared.service';
import { LoginPage } from './login/login.page';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// languages
import { TranslateConfigService } from './services/translate-config.service';
import { TranslateConfigModule } from './translate-config.module';
import { TranslateModule } from '@ngx-translate/core';
import { IonicStorageModule } from '@ionic/storage';

import { OdooApiService } from './services/odoo-api.service';



@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    TranslateConfigModule,
    TranslateModule,
    IonicStorageModule.forRoot(),
    NgxDatatableModule,],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    TranslateConfigService,
    OdooApiService,
    SharedService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
