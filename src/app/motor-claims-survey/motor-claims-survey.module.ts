import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MotorClaimsSurveyPageRoutingModule } from './motor-claims-survey-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { MotorClaimsSurveyPage } from './motor-claims-survey.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MotorClaimsSurveyPageRoutingModule,
    TranslateModule,
    FontAwesomeModule
  ],
  declarations: [MotorClaimsSurveyPage]
})
export class MotorClaimsSurveyPageModule {}
