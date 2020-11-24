import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InsuranceAppPage } from './insurance-app.page';

const routes: Routes = [
  {
    path: '',
    component: InsuranceAppPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InsuranceAppPageRoutingModule {}
