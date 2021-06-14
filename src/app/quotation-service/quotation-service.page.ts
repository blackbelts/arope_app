import { Router, ActivatedRoute } from '@angular/router';
import { OdooApiService } from './../services/odoo-api.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SharedService } from './../services/shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { saveAs } from 'file-saver';
// import {File} from "@ionic-native/file";
import {FileOpener} from "@ionic-native/file-opener";
import { Platform } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
// import { DocumentViewer } from '@ionic-native/document-viewer';
// import { File } from '@ionic-native/file';






@Component({
  selector: 'app-quotation-service',
  templateUrl: './quotation-service.page.html',
  styleUrls: ['./quotation-service.page.scss'],
})
export class QuotationServicePage implements OnInit {
  jobs;
  basicCovers;
  optionalCovers;
  travelCovers: any[] = [];
  isDeath = false;
  zones: any[] = [
    {
      value: 'zone 1', viewValue: 'Worldwide excluding USA & CANADA'
    },
    {
      value: 'zone 2', viewValue: 'Europe'
    },
    {
      value: 'zone 3', viewValue: 'Worldwide'
    },
  ];
  periods: any;
  maxDate: String;
  maxDateCoverageFrom: string;
  maxDateCoverageTo: string;
  type: any;
  lang: any;
  products: any [] = [];
  coverageTo: any;
  newDate;
  price: any;
  quote_id: any;
  lob: any;
  isBuy = false;
  policyNum: any ;
  activeSegment: any;
  constructor(public odooApi: OdooApiService, public router: Router,public shared: SharedService,
     public http: HttpClient,private platform: Platform,private files: File, public activatedRoute: ActivatedRoute,
     ) {
    const data = { data: [] } ;
    this.odooApi.callOdooMethod(
      'travel.front', 'get_periods', data).then(res => {
        this.periods = res['data'];
        console.log('periods', res['data']);
      });
    
//     this.odooApi.callOdooMethod(
//       'insurance.product', 'search_read', { filter: ["&", ["active_online", "=", "true"], ["line_of_bus.line_of_business", "=", "Travel"]] } ).then(res => {
//         const lang = localStorage.getItem('lang');
//         console.log(lang);
//         console.log(res);
//         for (const product of res['data']) {
//           console.log(product);
//         if (lang === 'ar') {
//           this.products.push({
//             id: product.id,
//             name: product.ar_product_name,
//           });
//         } else if (lang === 'en') {
//           this.products.push({
//             id: product.id,
//             name: product.product_name,
//           });
//         }
//       }
//     });
    this.odooApi.callOdooMethod('job.table', 'search_read', {filter: [],
      need: []}).then(res => {
        this.jobs = res;
    });
    this.odooApi.callOdooMethod('cover.table', 'search_read', {filter: [['basic', '=', true]],
      need: []}).then(res => {
        this.basicCovers = res;
    });
    this.odooApi.callOdooMethod('cover.table', 'search_read', {filter: [['basic', '=', false]],
      need: []}).then(res => {
        this.optionalCovers = res;
    });

    
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      if (Object.keys(params).length != 0) {
        console.log(params.name);
        this.activeSegment = params.name;
        this.type = params.name;
      }
      else {
        this.activeSegment = 'travel';
        this.type = 'travel';
      }
    });
    this.odooApi.callOdooMethod(
      'insurance.product', 'search_read', { filter: ["&", ["active_online", "=", "true"], ["line_of_bus.line_of_business", "=", "Travel"]] } ).then(res => {
        const lang = localStorage.getItem('lang');
        console.log(lang);
        console.log(res);
        for (const product of res['data']) {
          console.log(product);
        if (lang === 'ar') {
          this.products.push({
            id: product.id,
            name: product.ar_product_name,
          });
        } else if (lang === 'en') {
          this.products.push({
            id: product.id,
            name: product.product_name,
          });
        }
      }
    });
    const dateNow = Date.now();
    this.maxDate = this.odooApi.convertDate(this.odooApi.getDateBefore30Days());
    this.maxDateCoverageFrom = this.odooApi.convertDate(new Date(dateNow));
  }

  submitForm(form){
    let data =  {}
    if (this.type == 'travel') {
      data = {'data': {'lob_name': 'Travel', 'travel_package': 'individual',
    'geographical_coverage': form.value.zone, 'coverage_from': this.odooApi.convertDate(form.value.dateFrom),
   'coverage_to':  form.value.coverageTo, 'days': form.value.period, 'travel_product': form.value.product,
    'dob': this.odooApi.convertDate(form.value.dob)}}
      localStorage.setItem('travelData', JSON.stringify(data));
    } else if (this.type == 'medical') {
      data = {'data': {'lob_name': 'Medical', 'medical_package': 'individual',
       'dob': this.odooApi.convertDate(form.value.dob), 'medical_product': form.value.product}}
      // console.log(form.value.dob,form.value.product)
    } else {
      data = {'data': {'lob_name': 'Motor', 'sum_insured': form.value.sum_insured,
       'motor_product': form.value.product}}
      // console.log(form.value.sum_insured,form.value.product)
    }
    // this.price = 2000;
    this.odooApi.callOdooMethod(
      'arope.broker', 'create_quote', data ).then(res => {
        console.log(res);
        this.price = res['data']['price'];
        this.quote_id = res['data']['id'];
        this.lob = res['data']['lob'];
      });
    
  }
  
  segmentChanged(ev: any) {
    console.log(ev.detail.value);
    this.type = ev.detail.value;
    this.products = [];
    if (this.type == 'motor') {
      this.odooApi.callOdooMethod(
        'product.covers', 'search_read', { filter: [] } ).then(res => {
          const lang = localStorage.getItem('lang');
          console.log(lang);
          console.log(res);
          for (const product of res['data']) {
            console.log(product);
          if (lang === 'ar') {
            this.products.push({
              id: product.id,
              name: product.ar_product_name,
            });
          } else if (lang === 'en') {
            this.products.push({
              id: product.id,
              name: product.product_name,
            });
          }
        }
      });
    } else if (this.type == 'medical') {
      this.odooApi.callOdooMethod(
        'medical.price', 'search_read', { filter: [['package', '=', 'individual']] } ).then(res => {
          const lang = localStorage.getItem('lang');
          console.log(lang);
          console.log(res);
          for (const product of res['data']) {
            console.log(product);
            this.products.push({
              id: product.id,
              name: product.product_name,
            });
          }
        });
    } else {
      this.odooApi.callOdooMethod(
        'insurance.product', 'search_read', { filter: ["&", ["active_online", "=", "true"], ["line_of_bus.line_of_business", "=", "Travel"]] } ).then(res => {
          const lang = localStorage.getItem('lang');
          console.log(lang);
          console.log(res);
          for (const product of res['data']) {
            console.log(product);
          if (lang === 'ar') {
            this.products.push({
              id: product.id,
              name: product.ar_product_name,
            });
          } else if (lang === 'en') {
            this.products.push({
              id: product.id,
              name: product.product_name,
            });
          }
        }
      });
    }
    
  }
  periodChanged(form) {
    const date = new Date(form.value.dateFrom);
    if (form.value.dateFrom) {
      const x = date.getDate() + form.value.period;
      this.newDate = date.getFullYear().toString() + '-' + (date.getMonth()+1).toString() + '-' + x.toString()
    }
  }
  getCovers(form) {
//     let result: any;
    this.travelCovers = [];
    const lang = localStorage.getItem('lang');
    if (this.type == "travel") {
        if (form.value.product && form.value.dob && form.value.zone) {
        const data = {
              data: {'type': "individual", 'product_id': Number(form.value.product),
               'zone': form.value.zone, 'd': [this.odooApi.convertDate(form.value.dob)]}
          };
        this.odooApi.callOdooMethod( 'travel.front', 'get_covers', data).then(res => {
//             result = res
            for (const x in res['data']) {
              if (lang == 'en') {
                const cover = res['data'][x].cover;
                const limit = res['data'][x].limit;
                if (cover !== false) {
                  this.travelCovers.push({
                    cover,
                    limit
                  });
                }
             } else {
              const cover = res['data'][x].ar_cover;
              const limit = res['data'][x].ar_limit;
              if (cover !== false) {
                this.travelCovers.push({
                  cover,
                  limit
                });
              }
             }
            }
            console.log(this.travelCovers);
           });
          }
      }
    }

  create_app(){
    let navigationExtras = {
      queryParams: {
        quote_id: JSON.stringify(this.quote_id),
        lob: JSON.stringify(this.lob)

      }
    };
    this.router.navigate(['insurance-app-details'], navigationExtras);
  }
  buy() {
    this.isBuy = true;
  }
  submitsForm(form){
    const travelData = JSON.parse(localStorage.getItem('travelData')).data;
    console.log(travelData.coverage_from);
    console.log(form.value);
    const data = { data: {'product': travelData.travel_product, 'package': 'individual', 'c_name': form.value.fname
    + ' '+ form.value.sname + ' '+ form.value.lname, 'add': form.value.address, 's_name': form.value.fname,
     'f_name': form.value.sname, 'l_name': form.value.lname, 'gender': form.value.gender, 'source': 'online',
      'pass': form.value.passNum, 'id': form.value.idc, 'phone': form.value.phone, 'destination': 57, 
      'dob': this.odooApi.convertDate(form.value.fdob),'zone': travelData.geographical_coverage, 
      'p_from': travelData.coverage_from, 'p_to': travelData.coverage_to} } ;
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');
    this.odooApi.callOdooMethod(
      'travel.front', 'create_policy', data).then(res => {
        this.policyNum = res['data'][1];
        console.log(res);
        this.http.get('http://207.154.195.214:7070/report/' + res['data'][0], { headers, responseType: 'blob' }).subscribe(res => {
                console.log(res);
                if (this.platform.is("desktop")){
                  saveAs(res, `Policy (AROPE).pdf`);
                } else {
                  let path = null;
                  if (this.platform.is('ios')){
                    path = this.files.documentsDirectory;
                  } else {
                    path = this.files.dataDirectory;
                  }
                  //Write the file
                  this.files.writeFile(path, 'Policy.pdf', res, { replace: true }).then((fileEntry) => {

                    console.log("File created!");

                    //Open with File Opener plugin
                    FileOpener.open(fileEntry.toURL(), 'application/pdf')
                      .then(() => console.log('File is opened'))
                      .catch(err => console.error('Error openening file: ' + err));
                  })
                    .catch((err) => {
                      console.error("Error creating file: " + err);
                      throw err;  //Rethrow - will be caught by caller
                    });
                }
                
              });
      });
  }
}
