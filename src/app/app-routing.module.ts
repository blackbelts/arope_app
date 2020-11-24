import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'main/tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  // {
  //   path: 'requests',
  //   loadChildren: () => import('./requests/requests.module').then( m => m.RequestsPageModule)
  // },
  {
    path: 'requests',
    loadChildren: () => import('./requests/requests.module').then( m => m.RequestsPageModule)
  },
  {
    path: 'insurance-app',
    loadChildren: () => import('./insurance-app/insurance-app.module').then( m => m.InsuranceAppPageModule)
  },
  {
    path: 'create-insurance-app',
    loadChildren: () => import('./create-insurance-app/create-insurance-app.module').then( m => m.CreateInsuranceAppPageModule)
  },
  {
    path: 'quotation-service',
    loadChildren: () => import('./quotation-service/quotation-service.module').then( m => m.QuotationServicePageModule)
  },
  // {
  //   path: 'endorsments-tab',
  //   loadChildren: () => import('./endorsments-tab/endorsments-tab.module').then( m => m.EndorsmentsTabPageModule)
  // },
  // {
  //   path: 'cancelations-tab',
  //   loadChildren: () => import('./cancelations-tab/cancelations-tab.module').then( m => m.CancelationsTabPageModule)
  // },
  // {
  //   path: 'renewels-tab',
  //   loadChildren: () => import('./renewels-tab/renewels-tab.module').then( m => m.RenewelsTabPageModule)
  // }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
