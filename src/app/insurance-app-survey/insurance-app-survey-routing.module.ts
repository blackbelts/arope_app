import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InsuranceAppSurveyPage } from './insurance-app-survey.page';

const routes: Routes = [
  {
    path: '',
    component: InsuranceAppSurveyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InsuranceAppSurveyPageRoutingModule {}
