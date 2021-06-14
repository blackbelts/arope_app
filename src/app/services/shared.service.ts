import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  public name;
  public userId;
  public userToken;
  public userProfile: any;
  public dashboardData: any;
  public lob: any;
  public products: any;
  public group: any;
  public isInvoiceUploaded: Boolean ;
  constructor() { }
  
  numberWithCommas(x) {
    return x.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
}
