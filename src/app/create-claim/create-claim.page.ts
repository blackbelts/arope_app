import { Router } from '@angular/router';
import { OdooApiService } from './../services/odoo-api.service';
import { SharedService } from './../services/shared.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-claim',
  templateUrl: './create-claim.page.html',
  styleUrls: ['./create-claim.page.scss'],
})
export class CreateClaimPage implements OnInit {
  products: any[];
  type: any;
  isCreated: Boolean =false;
  types: any[] = [{value: 'motor', name:'Motor'},{value:'non-motor', name:'Non Motor'}];
  centersNetwork: any[] = [{value: 'in', name:'Arope Network'},{value:'out', name:'Outside Arope Network'}];
  centers: any[];
  motorDocuments: any[];
  nonMotorDocuments: any[];
  isIn: any;
  files: any[] = [];
  constructor(
    private router: Router,
    public odooApi: OdooApiService,
    public shared: SharedService,
  ) {
    this.odooApi.callOdooMethod('arope.broker', 'get_required_for_claim', 
    {}).then(res => {
      this.products = res['data']['products'];
      this.centers = res['data']['centers'];
      this.motorDocuments = res['data']['documents']['motor'];
      this.nonMotorDocuments = res['data']['documents']['non-motor'];
    });
   }

  ngOnInit() {
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
  handleUpload(event) {
    console.log(event);
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.files.push({name: event.target.name, file: reader.result.toString().replace('data:application/pdf;base64,', '')});
    };
  }

}
