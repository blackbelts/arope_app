import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClaimDetailsPage } from './claim-details.page';

const routes: Routes = [
  {
    path: '',
    component: ClaimDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClaimDetailsPageRoutingModule {}
