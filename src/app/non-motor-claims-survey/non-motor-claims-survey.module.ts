import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NonMotorClaimsSurveyPageRoutingModule } from './non-motor-claims-survey-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { NonMotorClaimsSurveyPage } from './non-motor-claims-survey.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NonMotorClaimsSurveyPageRoutingModule,
    TranslateModule,
    FontAwesomeModule
  ],
  declarations: [NonMotorClaimsSurveyPage]
})
export class NonMotorClaimsSurveyPageModule {}
