import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuotationServicePage } from './quotation-service.page';

const routes: Routes = [
  {
    path: '',
    component: QuotationServicePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuotationServicePageRoutingModule {}
