import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InsuranceAppDetailsPage } from './insurance-app-details.page';

const routes: Routes = [
  {
    path: '',
    component: InsuranceAppDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InsuranceAppDetailsPageRoutingModule {}
