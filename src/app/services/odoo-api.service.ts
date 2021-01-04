import { Injectable } from '@angular/core';
import { SharedService } from './shared.service';
import { HttpClient } from '@angular/common/http';
// import { ToastController } from '@ionic/angular';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class OdooApiService {
  headers = {
    "Content-Type": "application/json",
  };
  baseurl = "http://207.154.195.214:4002/api/";
  odooUrl = "http://207.154.195.214";
  odooPort = 7070;
  odooDBName = "arope-space01";
  private loader: any;
  constructor(
    public shared: SharedService,
    public http: HttpClient,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    ) {
    }
    login(username,password) {
      return new Promise((resolve, reject) => {
        this.http.post(this.baseurl + 'login', {
          "url": this.odooUrl,
          "port": this.odooPort,
          "db": this.odooDBName,
          "username": username,
          "password": password
        },
          { headers: this.headers })
          .subscribe(res => {
            let user = JSON.parse(JSON.stringify(res));
            this.headers['Authorization'] = "Bearer " + user.token;
            resolve(res);
          }, e => {
            reject(e);
          });
      });
    }
  updateToken() {
    this.headers["Authorization"] = "Bearer " + this.shared.userToken;
  }

  callOdooMethod(modelName,methodName,param) {
    this.updateToken();
    return new Promise((resolve, reject) => {
      this.http.post(
        this.baseurl + 'call_method/'
        + modelName + '/'
        + methodName, {
        "paramlist": param
      },
        { headers: this.headers }
      ).subscribe(res => {
        resolve(res);
      })
    })
  }
  getDateBefore30Days() {
    const minDate = new Date();
    minDate.setDate(minDate.getDate() - 30);
    return minDate;
  }

  convertDate(dateAge: Date) {
    let d = new Date(dateAge),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) {
        month = '0' + month;
    }
    if (day.length < 2) {
        day = '0' + day;
    }

    return [year, month, day].join('-');
  }

  async presentToast(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
  downloadApplicationFile(id) {
    const url = this.odooUrl + ":" + this.odooPort + "/web/content/" + id.toString() + "?download=true"
    return new Promise((resolve, reject) => {
      this.http.get(url)
    })
    
  }
  async showLoading() {
    this.loader = await this.loadingCtrl.create();
    this.loader.present();
  }
  hideLoading() {
    this.loader.dismiss();
  }
}
