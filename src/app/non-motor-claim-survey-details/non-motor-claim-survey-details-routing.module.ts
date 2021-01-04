import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NonMotorClaimSurveyDetailsPage } from './non-motor-claim-survey-details.page';

const routes: Routes = [
  {
    path: '',
    component: NonMotorClaimSurveyDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NonMotorClaimSurveyDetailsPageRoutingModule {}
