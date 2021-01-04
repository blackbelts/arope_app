import { PopoverPolicyFilterComponent } from './../components/popover-policy-filter/popover-policy-filter.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PolicyPageRoutingModule } from './policy-routing.module';

import { PolicyPage } from './policy.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PolicyPageRoutingModule,
    TranslateModule,
    FontAwesomeModule
  ],
  declarations: [PolicyPage, PopoverPolicyFilterComponent],
})
export class PolicyPageModule {}
