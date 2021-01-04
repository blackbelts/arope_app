import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InsuranceAppSurveyPageRoutingModule } from './insurance-app-survey-routing.module';

import { InsuranceAppSurveyPage } from './insurance-app-survey.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InsuranceAppSurveyPageRoutingModule,
    TranslateModule,
    FontAwesomeModule
  ],
  declarations: [InsuranceAppSurveyPage]
})
export class InsuranceAppSurveyPageModule {}
