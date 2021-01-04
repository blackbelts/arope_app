import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PolicyDetailsPageRoutingModule } from './policy-details-routing.module';

import { PolicyDetailsPage } from './policy-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PolicyDetailsPageRoutingModule,
    TranslateModule
  ],
  declarations: [PolicyDetailsPage]
})
export class PolicyDetailsPageModule {}
