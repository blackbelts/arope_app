import { SharedService } from './../services/shared.service';
import { OdooApiService } from './../services/odoo-api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { PopoverPolicyFilterComponent } from './../components/popover-policy-filter/popover-policy-filter.component';


@Component({
  selector: 'app-policy',
  templateUrl: './policy.page.html',
  styleUrls: ['./policy.page.scss'],
})
export class PolicyPage implements OnInit {
  public data: any[] = [];
  public searchTerm: string = "";
  filterdData: any;
  currentPopover:any;
  constructor(public odooApi: OdooApiService,private router: Router,
     public activatedRoute: ActivatedRoute,
     public shared: SharedService, public navCtrl: NavController,
     public popoverController: PopoverController) {
      this.activatedRoute.queryParams.subscribe(params => {
        console.log(params)
        if (params['renew']) {
          console.log(params);
          console.log('ids' + params['renew'])
          this.odooApi.callOdooMethod('arope.broker', 'get_policies',
            {data:  params['renew']}).then(res => {
              this.data = res['data'];
              this.setFilteredItems();
            });
        } else {
            if (this.shared.dashboardData['policy_lob']) {
              console.log(this.shared.dashboardData)
              this.odooApi.callOdooMethod('arope.broker', 'get_policies',
            {data: this.shared.dashboardData['policy_lob'][0]['ids']}).then(res => {
              this.data = res['data'];
              this.setFilteredItems();
            });
            }
        }
      });
      
        
      }

  ngOnInit() {
    this.currentPopover = null;
    // const buttons = document.querySelector('.pop');
    // buttons.addEventListener('click', this.handleButtonClick);
    // customElements.define('popover-example-page', class ModalContent extends HTMLElement {
    //   connectedCallback() {
    //     this.innerHTML = `
    //       <ion-list>
    //         <ion-list-header>Ionic</ion-list-header>
    //         <ion-item button>Learn Ionic</ion-item>
    //         <ion-item button>Documentation</ion-item>
    //         <ion-item button>Showcase</ion-item>
    //         <ion-item button>GitHub Repo</ion-item>
    //         <ion-item lines="none" detail="false" button onClick="dismissPopover()">Close</ion-item>
    //       </ion-list>
    //     `;
    //   }
    // });
  }
  async handleButtonClick(ev) {
    const popover = await this.popoverController.create({
      component: PopoverPolicyFilterComponent,
      event: ev,
      translucent: true
    });
    this.currentPopover = popover;
    return popover.present();
  }
  dismissPopover() {
    if (this.currentPopover) {
      this.currentPopover.dismiss().then(() => { this.currentPopover = null; });
    }
  }

  filterItems(searchTerm) {
    return this.data.filter(item => {
      return (item.policy_number.toString().toLowerCase().indexOf(searchTerm.toString().toLowerCase()) > -1 ||
       item.product.toString().toLowerCase().indexOf(searchTerm.toString().toLowerCase()) > -1);
    });
  }
  setFilteredItems() {
    this.filterdData = this.filterItems(this.searchTerm);
  }
  goToDetails(item){
    let navigationExtras = {
      queryParams: item
    };
    this.router.navigate(['policy-details'], navigationExtras);
  }

}
