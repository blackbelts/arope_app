import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MotorClaimSurveyDetailsPage } from './motor-claim-survey-details.page';

const routes: Routes = [
  {
    path: '',
    component: MotorClaimSurveyDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MotorClaimSurveyDetailsPageRoutingModule {}
