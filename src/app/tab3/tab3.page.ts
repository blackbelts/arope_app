import { NavController } from '@ionic/angular';
import { SharedService } from './../services/shared.service';
import { OdooApiService } from './../services/odoo-api.service';
import { Component} from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  data: any;
  constructor(public odooApi: OdooApiService, public shared: SharedService, public navCtrl: NavController) {
    this.data = this.shared.dashboardData;
  }
  back(){
    this.navCtrl.back();
  }

}
