import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MotorClaimsSurveyPage } from './motor-claims-survey.page';

const routes: Routes = [
  {
    path: '',
    component: MotorClaimsSurveyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MotorClaimsSurveyPageRoutingModule {}
