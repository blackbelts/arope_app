import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateClaimPageRoutingModule } from './create-claim-routing.module';

import { CreateClaimPage } from './create-claim.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateClaimPageRoutingModule,
    TranslateModule
  ],
  declarations: [CreateClaimPage]
})
export class CreateClaimPageModule {}
