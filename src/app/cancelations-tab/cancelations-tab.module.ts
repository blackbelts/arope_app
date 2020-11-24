import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CancelationsTabPageRoutingModule } from './cancelations-tab-routing.module';

import { CancelationsTabPage } from './cancelations-tab.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CancelationsTabPageRoutingModule
  ],
  declarations: [CancelationsTabPage]
})
export class CancelationsTabPageModule {}
