import { ExpandableComponent } from './../components/expandable/expandable.component';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InsuranceAppSurveyDetailsPageRoutingModule } from './insurance-app-survey-details-routing.module';

import { InsuranceAppSurveyDetailsPage } from './insurance-app-survey-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InsuranceAppSurveyDetailsPageRoutingModule,
    TranslateModule,
  ],
  declarations: [InsuranceAppSurveyDetailsPage, ExpandableComponent]
})
export class InsuranceAppSurveyDetailsPageModule {}
