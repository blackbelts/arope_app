import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CancelationsTabPage } from './cancelations-tab.page';

const routes: Routes = [
  {
    path: '',
    component: CancelationsTabPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CancelationsTabPageRoutingModule {}
