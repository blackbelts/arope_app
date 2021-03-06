import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { InsuranceAppPageRoutingModule } from './insurance-app-routing.module';

import { InsuranceAppPage } from './insurance-app.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InsuranceAppPageRoutingModule,
    TranslateModule,
    FontAwesomeModule
  ],
  declarations: [InsuranceAppPage]
})
export class InsuranceAppPageModule {}
