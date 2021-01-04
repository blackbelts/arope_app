import { SharedService } from './../services/shared.service';
import { OdooApiService } from './../services/odoo-api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-request',
  templateUrl: './create-request.page.html',
  styleUrls: ['./create-request.page.scss'],
})
export class CreateRequestPage implements OnInit {
  products: any[];

  type: any;
  polType;
  polProduct;
  polNum;
  isCreated: Boolean =false;
  types: any[] = [{value: 'end', name:'Endorsement'},{value:'renew', name:'Renwal'},{value:'cancel', name:'Cancellation'}];
  centersNetwork: any[] = [{value: 'in', name:'Arope Network'},{value:'out', name:'Outside Arope Network'}];
  centers: any[];
  constructor(
    public activatedRoute: ActivatedRoute,
    private router: Router,
    public odooApi: OdooApiService,
    public shared: SharedService,
  ) { 
    this.odooApi.callOdooMethod('arope.broker', 'get_lob_and_products', {
    }).then(res => {
      this.products = res['data']['products'];
    });
    this.odooApi.callOdooMethod('maintenance.center', 'search_read', 
    {filter: [], need: []}).then(res => {
      this.centers = res['data'];
    });

    
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      if (Object.keys(params).length != 0) {
        this.type = params.type;
        this.polType = params.type;
        this.polNum = params.policy_num;
        this.odooApi.callOdooMethod(
          'insurance.product', 'search_read', { filter: [["product_name", "=", params.product]] } ).then(res => {
            this.polProduct = res['data'][0]['id']
          });
      }
    });
  }
  createRequest(form){
    let data = {};
    if (form.value.type == 'end') {
      data = {'data': {'policy_seq': form.value.product, 'policy': form.value.policy,
     'type': form.value.type, 'end_reason': form.value.endReason}}
    } else if (form.value.type == 'cancel') {
      data = {'data': {'policy_seq': form.value.product, 'policy': form.value.policy,
     'type': form.value.type, 'end_reason': form.value.cancelReason}}
    } else {
      data = {'data': {'policy_seq': form.value.product, 'policy': form.value.policy,
     'type': form.value.type}}
    }
    this.odooApi.callOdooMethod('policy.request', 'create', data).then(res => {
      if (res['data']){
        this.isCreated = true;
      }
    });
  }
  typeChanged(form){
    this.type = form.value.type;
  }

}
