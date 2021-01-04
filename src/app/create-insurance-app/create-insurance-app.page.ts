import { SharedService } from './../services/shared.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OdooApiService } from './../services/odoo-api.service';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';




@Component({
  selector: 'app-create-insurance-app',
  templateUrl: './create-insurance-app.page.html',
  styleUrls: ['./create-insurance-app.page.scss'],
})

export class CreateInsuranceAppPage implements OnInit {
  @ViewChild('form') form:NgForm;
  quote_id: any;
  lob: any;
  isCreated: Boolean =false;
  products: any[];
  fileId: any;
  file: any;
  requiredDocuments:any[];
  files: any[] = [];
  constructor(
    public activatedRoute: ActivatedRoute,
    private router: Router,
    public odooApi: OdooApiService,
    public shared: SharedService,
    public http: HttpClient,
  ) { }

  ngOnInit() {
    this.odooApi.callOdooMethod('arope.broker', 'get_lob_and_products', {
    }).then(res => {
      this.shared.lob = res['data']['lob'];
      this.shared.products = res['data']['products'];
      this.activatedRoute.queryParams.subscribe(params => {
        if (params && params.id) {
          //store the temp in data
          console.log(this.form)
          this.quote_id = JSON.parse(params.id);
          this.lob = JSON.parse(params.lob)
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
    const data = {'data': {'lob': form.value.lob, 'product_id': form.value.product,
     'name': form.value.name, 'phone': form.value.mobile, 'email': form.value.email,
      'file': this.file.toString().replace('data:application/pdf;base64,', ''), 'files': this.files}}
      console.log(data);
    this.odooApi.callOdooMethod('arope.broker', 'create_insurance_application', data).then(res =>{
      if (res['data']){
        this.isCreated = true;
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
}
