import { ExpandableComponent } from './../components/expandable/expandable.component';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NonMotorClaimSurveyDetailsPageRoutingModule } from './non-motor-claim-survey-details-routing.module';

import { NonMotorClaimSurveyDetailsPage } from './non-motor-claim-survey-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NonMotorClaimSurveyDetailsPageRoutingModule,
    TranslateModule
  ],
  declarations: [NonMotorClaimSurveyDetailsPage, ExpandableComponent]
})
export class NonMotorClaimSurveyDetailsPageModule {}
