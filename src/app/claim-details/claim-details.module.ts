import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClaimDetailsPageRoutingModule } from './claim-details-routing.module';

import { ClaimDetailsPage } from './claim-details.page';
import { ExpandableComponent } from "../components/expandable/expandable.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClaimDetailsPageRoutingModule,
    TranslateModule
  ],
  declarations: [ClaimDetailsPage, ExpandableComponent]
})
export class ClaimDetailsPageModule {}
