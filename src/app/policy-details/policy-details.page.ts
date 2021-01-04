import { Router, ActivatedRoute } from '@angular/router';
import { OdooApiService } from './../services/odoo-api.service';
import { SharedService } from './../services/shared.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PopoverPolicyFilterComponent } from './../components/popover-policy-filter/popover-policy-filter.component';


@Component({
  selector: 'app-policy-details',
  templateUrl: './policy-details.page.html',
  styleUrls: ['./policy-details.page.scss'],
})
export class PolicyDetailsPage implements OnInit {
  policyDetails: any;
  currentPopover:any;
  constructor(
    public activatedRoute: ActivatedRoute,
    private router: Router,
    public odooApi: OdooApiService,
    public shared: SharedService,
    public http: HttpClient,
    public popoverController: PopoverController
  ) { 
    
  }

  ngOnInit() {
    this.currentPopover = null;
    this.activatedRoute.queryParams.subscribe(params => {
      if (Object.keys(params).length != 0) {
        console.log(params);
        this.odooApi.callOdooMethod(
          'policy.arope', 'search_read', { filter: [["id", "=", params.id]] } ).then(res => {
            this.policyDetails = res['data'][0];
          });
      }
    });
  }
  async handleButtonClick(ev) {
    const popover = await this.popoverController.create({
      component: PopoverPolicyFilterComponent,
      componentProps:this.policyDetails,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });
    this.currentPopover = popover;
    popover.style.cssText = '--min-width: 185px; --max-width: 185px;';
    return popover.present();
  }
  dismissPopover() {
    if (this.currentPopover) {
      this.currentPopover.dismiss().then(() => { this.currentPopover = null; });
    }
  }

}
