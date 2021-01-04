import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AropeClaimsPage } from './arope-claims.page';

const routes: Routes = [
  {
    path: '',
    component: AropeClaimsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AropeClaimsPageRoutingModule {}
