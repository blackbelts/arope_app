import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateClaimPage } from './create-claim.page';

const routes: Routes = [
  {
    path: '',
    component: CreateClaimPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateClaimPageRoutingModule {}
