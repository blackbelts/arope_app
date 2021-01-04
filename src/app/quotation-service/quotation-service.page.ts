import { Router } from '@angular/router';
import { OdooApiService } from './../services/odoo-api.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-quotation-service',
  templateUrl: './quotation-service.page.html',
  styleUrls: ['./quotation-service.page.scss'],
})
export class QuotationServicePage implements OnInit {
  jobs;
  basicCovers;
  optionalCovers;
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
  type: any = 'travel';
  lang: any;
  products: any [] = [];
  coverageTo: any;
  newDate;
  price: any ;
  quote_id: any;
  lob: any;
  constructor(public odooApi: OdooApiService, public router: Router) {
    const data = { data: [] } ;
    this.odooApi.callOdooMethod(
      'travel.front', 'get_periods', data).then(res => {
        this.periods = res['data'];
        console.log('periods', res['data']);
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
    } else if (this.type == 'medical') {
      data = {'data': {'lob_name': 'Medical', 'medical_package': 'individual',
       'dob': this.odooApi.convertDate(form.value.dob), 'medical_product': form.value.product}}
      // console.log(form.value.dob,form.value.product)
    } else {
      data = {'data': {'lob_name': 'Motor', 'sum_insured': form.value.sum_insured,
       'motor_product': form.value.product}}
      // console.log(form.value.sum_insured,form.value.product)
    }
    
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
  create_app(){
    let navigationExtras = {
      queryParams: {
        quote_id: JSON.stringify(this.quote_id),
        lob: JSON.stringify(this.lob)

      }
    };
    this.router.navigate(['insurance-app-details'], navigationExtras);
  }
}
