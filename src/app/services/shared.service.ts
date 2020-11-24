import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  public userId;
  public userToken;
  public userProfile: any;
  public dashboardData: any;
  constructor() { }
}
