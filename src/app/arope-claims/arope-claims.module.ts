import { TranslateModule } from '@ngx-translate/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AropeClaimsPageRoutingModule } from './arope-claims-routing.module';

import { AropeClaimsPage } from './arope-claims.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AropeClaimsPageRoutingModule,
    FontAwesomeModule,
    TranslateModule
  ],
  declarations: [AropeClaimsPage]
})
export class AropeClaimsPageModule {}
