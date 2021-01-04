import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { IonicModule } from '@ionic/angular';

import { InsuranceAppDetailsPageRoutingModule } from './insurance-app-details-routing.module';

import { InsuranceAppDetailsPage } from './insurance-app-details.page';
import { ExpandableComponent } from "../components/expandable/expandable.component";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InsuranceAppDetailsPageRoutingModule,
    TranslateModule
  ],
  declarations: [InsuranceAppDetailsPage, ExpandableComponent]
})
export class InsuranceAppDetailsPageModule {}
