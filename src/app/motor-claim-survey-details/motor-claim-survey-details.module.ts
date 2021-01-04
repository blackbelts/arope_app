import { ExpandableComponent } from './../components/expandable/expandable.component';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MotorClaimSurveyDetailsPageRoutingModule } from './motor-claim-survey-details-routing.module';

import { MotorClaimSurveyDetailsPage } from './motor-claim-survey-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MotorClaimSurveyDetailsPageRoutingModule,
    TranslateModule
  ],
  declarations: [MotorClaimSurveyDetailsPage, ExpandableComponent]
})
export class MotorClaimSurveyDetailsPageModule {}
