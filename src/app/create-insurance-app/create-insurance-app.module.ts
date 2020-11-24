import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateInsuranceAppPageRoutingModule } from './create-insurance-app-routing.module';

import { CreateInsuranceAppPage } from './create-insurance-app.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateInsuranceAppPageRoutingModule,
    TranslateModule
  ],
  declarations: [CreateInsuranceAppPage]
})
export class CreateInsuranceAppPageModule {}
