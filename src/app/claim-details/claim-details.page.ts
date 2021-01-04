import { SharedService } from './../services/shared.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OdooApiService } from './../services/odoo-api.service';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-claim-details',
  templateUrl: './claim-details.page.html',
  styleUrls: ['./claim-details.page.scss'],
})
export class ClaimDetailsPage implements OnInit {
  claimApp: any;
  public allData : any[] = [];
  // public motorAllData : any[] = [];
  // public nonMotorAllData : any[] = [];
  
  claimAppDetails: any;
  lob: any = '';
  claimNumber: any = '';
  claimDate: any = '';
  product: any = '';
  name: any = '';
  phone: any = '';
  invoices: any[] = [];
  type: any = '';
  policy_num: any = '';
  chasse_num: any = '';
  maintenance_centers_in_or_out: any = '';
  maintenance_center: any = '';
  files: any[] = [];
  products: any[];
  isCreated: Boolean =false;
  types: any[] = [{value: 'motor', name:'Motor'},{value:'non-motor', name:'Non Motor'}];
  centersNetwork: any[] = [{value: 'in', name:'Arope Network'},{value:'out', name:'Outside Arope Network'}];
  centers: any[];
  motorDocuments: any[];
  nonMotorDocuments: any[];
  isIn: any;
  constructor(
    public activatedRoute: ActivatedRoute,
    public odooApi: OdooApiService,
    public shared: SharedService,
    public http: HttpClient,
  ) { 
    this.odooApi.callOdooMethod('arope.broker', 'get_required_for_claim', 
    {}).then(res => {
      this.products = res['data']['products'];
      this.centers = res['data']['centers'];
      this.motorDocuments = res['data']['documents']['motor'];
      this.nonMotorDocuments = res['data']['documents']['non-motor'];
    });
    this.allData = [{name: 'Claim Intimation', expanded: false},{name: 'Required Documents', expanded: false}];
    this.getAll();
  }

  ngOnInit() {
  }
  expandItem(item): void {
    if (item.expanded) {
      item.expanded = false;
    } else {
      this.allData.map(listItem => {
        if (item == listItem) {
          listItem.expanded = !listItem.expanded;
        } else {
          listItem.expanded = false;
        }
        return listItem;
      });
    }
  }
  handleUpload(event) {
    console.log(event);
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.files.push({name: event.target.name, file: reader.result.toString().replace('data:application/pdf;base64,', '')});
    };
  }
  uploadInvoices(){
    const data = {data: {id: this.claimApp.id, files: this.files}}
    this.odooApi.callOdooMethod('arope.broker', 'upload_claim_invoice',
    data).then(res => {
        this.shared.isInvoiceUploaded = res['data'];
    });
  }
  repairCompleted(){
    this.odooApi.callOdooMethod('arope.broker', 'repair_completed',
      {data: Number(this.claimApp.id)}).then(res => {
        this.claimAppDetails = res['data'];
        this.lob = this.claimAppDetails['lob'][1];
        this.claimNumber = this.claimAppDetails['claim_number'];
        this.claimDate = this.claimAppDetails['date'];
        this.product = this.claimAppDetails['product'][1];
        this.name = this.claimAppDetails['customer_name'];
        this.phone = this.claimAppDetails['phone'];
        this.type = this.claimAppDetails['type'];
        this.policy_num = this.claimAppDetails['policy_num'];
        this.chasse_num = this.claimAppDetails['chasse_num'];
        this.maintenance_centers_in_or_out = this.claimAppDetails['maintenance_centers_in_or_out'];
        this.maintenance_center = this.claimAppDetails['maintenance_centers'];
      });
  }
  getAll(){
    this.activatedRoute.queryParams.subscribe(params => {
      if (Object.keys(params).length != 0) {
        console.log(params);
        this.claimApp = params;
        this.odooApi.callOdooMethod('arope.broker', 'get_claim_info',
          {data: Number(this.claimApp.id)}).then(res => {
            // this.allData = res['data']['status'];
            // this.allData.pop();
            // for (let state of this.allData) {
            //   state['expanded'] = false;
            // }
            this.claimAppDetails = res['data']['app'][0];
            this.lob = this.claimAppDetails['lob'][1];
            this.claimNumber = this.claimAppDetails['claim_number'];
            this.claimDate = this.claimAppDetails['date'];
            this.product = this.claimAppDetails['product'][1];
            this.name = this.claimAppDetails['customer_name'];
            this.phone = this.claimAppDetails['phone'];
            this.type = this.claimAppDetails['type'];
            if (this.type == 'motor'){
              this.allData = [{name: 'Claim Intimation', expanded: false},{name: 'Required Documents', expanded: false},{name: 'Invoicing', expanded: false},
              {name: 'Start Repair', expanded: false}];
            }
            else {
              this.allData = [{name: 'Claim Intimation', expanded: false},{name: 'Required Documents', expanded: false}];
            }
            this.policy_num = this.claimAppDetails['policy_num'];
            this.chasse_num = this.claimAppDetails['chasse_num'];
            this.maintenance_centers_in_or_out = this.claimAppDetails['maintenance_centers_in_or_out'];
            this.maintenance_center = this.claimAppDetails['maintenance_centers'];
            this.invoices = res['data']['invoice'];
          });
      }
    });
  }
  createClaim(form) {
    let data = {}
    if (form.value.type == 'motor') {
      if (form.value.inOrOut == 'in') {
        data = {'data': {'type': form.value.type, 'product': form.value.product,
        'policy': form.value.policy, 'chasse_no': form.value.chasse_no, 'inOrOut': form.value.inOrOut,
          'center': form.value.center,'files': this.files}}
      } else {
        data = {'data': {'type': form.value.type, 'product': form.value.product,
        'policy': form.value.policy, 'chasse_no': form.value.chasse_no, 'inOrOut': form.value.inOrOut,
        'files': this.files}}
      }
      
    } else {
      data = {'data': {'type': form.value.type, 'product': form.value.product,
      'policy': form.value.policy,'files': this.files}}
    }

    this.odooApi.callOdooMethod('arope.broker', 'create_claim', data).then(res => {
      if (res['data']){
        this.isCreated = true;
      }
    });
  }
  typeChanged(form) {
    this.type = form.value.type;
  }
  networkChanged(form){
    this.isIn = form.value.inOrOut;
  }
  // handleUpload(event) {
  //   console.log(event);
  //   const file = event.target.files[0];
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onload = () => {
  //     this.files.push({name: event.target.name, file: reader.result.toString().replace('data:application/pdf;base64,', '')});
  //   };
  // }
}
