import { SharedService } from './../services/shared.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OdooApiService } from './../services/odoo-api.service';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-insurance-app-details',
  templateUrl: './insurance-app-details.page.html',
  styleUrls: ['./insurance-app-details.page.scss'],
})
export class InsuranceAppDetailsPage implements OnInit {
  @ViewChild('form') form:NgForm;
  quote_id: any;
  Lob: any;
  isCreated: Boolean =false;
  products: any[];
  fileId: any;
  file: any;
  requiredDocuments:any[];
  files: any[] = [];
  public items: any = [];
  public allData : any[] = [];
  insuranceApp: any;
  insuranceAppDetails: any;
  lob: any = '';
  applicationNumber: any = '';
  applicationDate: any = '';
  product: any = '';
  name: any = '';
  phone: any = '';
  email: any = '';
  offers: any[] = [];
  message;
  initialOffer: object;
  isInitialDone: Boolean;
  isFinalDone: Boolean;
  finalOffer: object;
  constructor(
    public activatedRoute: ActivatedRoute,
    private router: Router,
    public odooApi: OdooApiService,
    public shared: SharedService,
    public http: HttpClient,
  ) {
    
    this.allData = [{name: 'Application Form', expanded: false},{name: 'Customer Info', expanded: false},
   {name: 'Required Documents', expanded: false}, {name: 'Initial Offer', expanded: false}, {name: 'Final Offer', expanded: false}]
   this.getAll();

   
   }

  ngOnInit() {
    this.odooApi.callOdooMethod('arope.broker', 'get_lob_and_products', {
    }).then(res => {
      this.shared.lob = res['data']['lob'];
      this.shared.products = res['data']['products'];
      this.activatedRoute.queryParams.subscribe(params => {
        if (params && params.quote_id && params.lob) {
          //store the temp in data
          console.log(this.form)
          this.quote_id = JSON.parse(params.quote_id);
          this.Lob = JSON.parse(params.lob)
          // this.form.value.lob = this.lob;
          this.products = [];
          for (var i = 0; i < this.shared.products.length; i++) {
            if (this.shared.products[i].lob_id == this.lob) {
                this.products.push(this.shared.products[i])
            }
        }
          console.log(this.quote_id,this.lob);
        }
      });
      // console.log(res);
    });
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
  downloadOffer(offerID) {
    const url = this.odooApi.odooUrl + ":" + this.odooApi.odooPort + "/web/content/" + offerID.toString() + "?download=true"
    return window.open(url, '_blank');
  }
  acceptOffer(id){
    // this.odooApi.showLoading();
    this.odooApi.callOdooMethod('arope.broker', 'accept_offer',
      {data: Number(id)}).then(res => {
        this.getAll();
        
      });
      // this.odooApi.hideLoading();
  }
  rejectOffer(id){
    // this.odooApi.showLoading();
    this.odooApi.callOdooMethod('arope.broker', 'reject_offer',
      {data: Number(id)}).then(res => {
        this.getAll();
        
      });
      // this.odooApi.hideLoading();
  }
  lobChanged(form) {
    this.products = [];
    console.log(form.value.lob);
    for (var i = 0; i < this.shared.products.length; i++) {
        if (this.shared.products[i].lob_id == form.value.lob) {
            this.products.push(this.shared.products[i])
        }
    }
    console.log(this.products)
  }
  productChanged(form) {
    this.odooApi.callOdooMethod('arope.broker', 'get_product_file', {id: form.value.product}).then(res => {
      this.fileId = res['data'];
    });
    this.odooApi.callOdooMethod('final.application.setup', 'search_read', 
    {filter: [["product_id", "=", form.value.product]]}).then(res => {
      this.requiredDocuments = res['data'];
    });

      
  }
  downloadApplicationForm(){
    const url = this.odooApi.odooUrl + ":" + this.odooApi.odooPort + "/web/content/" + this.fileId.toString() + "?download=true"
    return window.open(url, '_blank');
  }
  handleUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.file = reader.result
    };
  }
  handleUploadFiles(event) {
    console.log(event);
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const record = this.search(event.target.name, this.requiredDocuments)
      this.files.push({name: record.id, file: reader.result.toString().replace('data:application/pdf;base64,', '')});
      console.log(this.files);
    };
  }
  createAppForm(form){
    this.odooApi.showLoading();
    const data = {'data': {'lob': form.value.lob, 'product_id': form.value.product,
     'name': form.value.name, 'phone': form.value.mobile, 'email': form.value.email,
      'file': this.file.toString().replace('data:application/pdf;base64,', ''), 'files': this.files}}
      console.log(data);
    this.odooApi.callOdooMethod('arope.broker', 'create_insurance_application', data).then(res =>{
      if (res['data']){
        this.insuranceAppDetails = res['data']['app'][0];
        this.lob = this.insuranceAppDetails['lob'][1];
        this.applicationNumber = this.insuranceAppDetails['application_number'];
        this.applicationDate = this.insuranceAppDetails['application_date'];
        this.product = this.insuranceAppDetails['product_id'][1];
        this.name = this.insuranceAppDetails['name'];
        this.phone = this.insuranceAppDetails['phone'];
        this.email = this.insuranceAppDetails['email'];     
        this.offers = res['data']['offers'];
        for (let offer of this.offers){
          if (offer['type'] == 'Initial Offer') {
            this.initialOffer = offer;
            console.log(this.initialOffer);
          } else {
            this.finalOffer = offer;
          }
        }
        this.odooApi.hideLoading(); 
      }
    });
  }
  search(nameKey, myArray){
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].description === nameKey) {
            return myArray[i];
        }
    }
  }
  getAll(){
    this.activatedRoute.queryParams.subscribe(params => {
      if (Object.keys(params).length != 0 && params.id ) {
        console.log(params);
        this.insuranceApp = params;
        this.odooApi.callOdooMethod('arope.broker', 'get_app_info',
          {data: Number(this.insuranceApp.id)}).then(res => {
            // this.allData = res['data']['status'];
            // this.allData.pop();
            // for (let state of this.allData) {
            //   state['expanded'] = false;
            // }
            this.insuranceAppDetails = res['data']['app'][0];
            console.log(this.insuranceAppDetails);
            this.lob = this.insuranceAppDetails['lob'][1];
            this.applicationNumber = this.insuranceAppDetails['application_number'];
            this.applicationDate = this.insuranceAppDetails['application_date'];
            this.product = this.insuranceAppDetails['product_id'][1];
            this.name = this.insuranceAppDetails['name'];
            this.phone = this.insuranceAppDetails['phone'];
            this.email = this.insuranceAppDetails['email'];     
            this.offers = res['data']['offers'];
            for (let offer of this.offers){
              if (offer['type'] == 'Initial Offer') {
                this.initialOffer = offer;
                console.log(this.initialOffer);
              } else {
                this.finalOffer = offer;
              }
            }
          });
      }
    });
  }
  

}
