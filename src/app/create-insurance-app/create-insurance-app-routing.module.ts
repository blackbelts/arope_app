import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateInsuranceAppPage } from './create-insurance-app.page';

const routes: Routes = [
  {
    path: '',
    component: CreateInsuranceAppPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateInsuranceAppPageRoutingModule {}
