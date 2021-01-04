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
  {
    path: 'tab1',
    loadChildren: () => import('./tab1/tab1.module').then( m => m.Tab1PageModule)
  },
  {
    path: 'tab2',
    loadChildren: () => import('./tab2/tab2.module').then( m => m.Tab2PageModule)
  },
  {
    path: 'tab3',
    loadChildren: () => import('./tab3/tab3.module').then( m => m.Tab3PageModule)
  },
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
  {
    path: 'insurance-app-details',
    loadChildren: () => import('./insurance-app-details/insurance-app-details.module').then( m => m.InsuranceAppDetailsPageModule)
  },
  {
    path: 'claims',
    loadChildren: () => import('./claims/claims.module').then( m => m.ClaimsPageModule)
  },
  {
    path: 'create-request',
    loadChildren: () => import('./create-request/create-request.module').then( m => m.CreateRequestPageModule)
  },
  {
    path: 'create-claim',
    loadChildren: () => import('./create-claim/create-claim.module').then( m => m.CreateClaimPageModule)
  },
  {
    path: 'claim-details',
    loadChildren: () => import('./claim-details/claim-details.module').then( m => m.ClaimDetailsPageModule)
  },
  {
    path: 'policy',
    loadChildren: () => import('./policy/policy.module').then( m => m.PolicyPageModule)
  },
  {
    path: 'collections',
    loadChildren: () => import('./collections/collections.module').then( m => m.CollectionsPageModule)
  },
  {
    path: 'arope-claims',
    loadChildren: () => import('./arope-claims/arope-claims.module').then( m => m.AropeClaimsPageModule)
  },
  {
    path: 'policy-details',
    loadChildren: () => import('./policy-details/policy-details.module').then( m => m.PolicyDetailsPageModule)
  },
  {
    path: 'motor-claims-survey',
    loadChildren: () => import('./motor-claims-survey/motor-claims-survey.module').then( m => m.MotorClaimsSurveyPageModule)
  },
  {
    path: 'non-motor-claims-survey',
    loadChildren: () => import('./non-motor-claims-survey/non-motor-claims-survey.module').then( m => m.NonMotorClaimsSurveyPageModule)
  },
  {
    path: 'insurance-app-survey',
    loadChildren: () => import('./insurance-app-survey/insurance-app-survey.module').then( m => m.InsuranceAppSurveyPageModule)
  },
  {
    path: 'motor-claim-survey-details',
    loadChildren: () => import('./motor-claim-survey-details/motor-claim-survey-details.module').then( m => m.MotorClaimSurveyDetailsPageModule)
  },
  {
    path: 'non-motor-claim-survey-details',
    loadChildren: () => import('./non-motor-claim-survey-details/non-motor-claim-survey-details.module').then( m => m.NonMotorClaimSurveyDetailsPageModule)
  },
  {
    path: 'insurance-app-survey-details',
    loadChildren: () => import('./insurance-app-survey-details/insurance-app-survey-details.module').then( m => m.InsuranceAppSurveyDetailsPageModule)
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
