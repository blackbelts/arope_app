import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PolicyDetailsPage } from './policy-details.page';

const routes: Routes = [
  {
    path: '',
    component: PolicyDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PolicyDetailsPageRoutingModule {}
