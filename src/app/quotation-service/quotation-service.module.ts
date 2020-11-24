import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuotationServicePageRoutingModule } from './quotation-service-routing.module';

import { QuotationServicePage } from './quotation-service.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuotationServicePageRoutingModule,
    TranslateModule
  ],
  declarations: [QuotationServicePage]
})
export class QuotationServicePageModule {}
