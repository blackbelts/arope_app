import { NavParams } from '@ionic/angular';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-popover-policy-filter',
  templateUrl: './popover-policy-filter.component.html',
  styleUrls: ['./popover-policy-filter.component.scss'],
})
export class PopoverPolicyFilterComponent implements OnInit {

  constructor(private router: Router,public navParams:NavParams
    ) { 
      console.log(this.navParams.data);
    }

  ngOnInit() {}
  
  newEndorsment(){
    let navigationExtras = {
      queryParams: {type: 'end', product: this.navParams.data.product, policy_num: this.navParams.data.policy_num}
    };
    this.router.navigate(['create-request'], navigationExtras);
  }

  
  newRenewel(){
    let navigationExtras = {
      queryParams: {type: 'renew', product: this.navParams.data.product, policy_num: this.navParams.data.policy_num}
    };
    this.router.navigate(['create-request'], navigationExtras);
  }
  newCancellation(){
    let navigationExtras = {
      queryParams: {type: 'cancel', product: this.navParams.data.product, policy_num: this.navParams.data.policy_num}
    };
    this.router.navigate(['create-request'], navigationExtras);
  }
  newClaim(){

  }

}
