import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InsuranceAppSurveyDetailsPage } from './insurance-app-survey-details.page';

const routes: Routes = [
  {
    path: '',
    component: InsuranceAppSurveyDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InsuranceAppSurveyDetailsPageRoutingModule {}
