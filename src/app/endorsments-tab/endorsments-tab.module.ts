import { TranslateModule } from '@ngx-translate/core';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EndorsmentsTabPageRoutingModule } from './endorsments-tab-routing.module';

import { EndorsmentsTabPage } from './endorsments-tab.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EndorsmentsTabPageRoutingModule,
    TranslateModule
  ],
  declarations: [EndorsmentsTabPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EndorsmentsTabPageModule {}
