import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EndorsmentsTabPage } from './endorsments-tab.page';

const routes: Routes = [
  {
    path: '',
    component: EndorsmentsTabPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EndorsmentsTabPageRoutingModule {}
