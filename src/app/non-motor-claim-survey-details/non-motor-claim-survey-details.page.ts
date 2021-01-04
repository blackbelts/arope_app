import { SharedService } from './../services/shared.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OdooApiService } from './../services/odoo-api.service';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-non-motor-claim-survey-details',
  templateUrl: './non-motor-claim-survey-details.page.html',
  styleUrls: ['./non-motor-claim-survey-details.page.scss'],
})
export class NonMotorClaimSurveyDetailsPage implements OnInit {
  fileId: any;
  file: any;
  files: any[] = [];
  public items: any = [];
  public allData : any[] = [];
  survey: any;
  surveyDetails: any;
  lob: any;
  product: any;
  name: any = '';
  phone: any = '';
  email: any = '';
  surveyNumber: any;
  recommendation: any = '';
  comment: any = '';
  state: any;
  message: any;
  constructor(
    public activatedRoute: ActivatedRoute,
    private router: Router,
    public odooApi: OdooApiService,
    public shared: SharedService,
    public http: HttpClient,
  ) { 
    this.allData = [{name: 'Application Info', expanded: false},{name: 'Customer Info', expanded: false},{name: 'Survey Report', expanded: false}];
    this.activatedRoute.queryParams.subscribe(params => {
      if (Object.keys(params).length != 0) {
        this.odooApi.callOdooMethod('survey.report', 'search_read',
          {filter: [['id', '=', Number(params['id'])]]}).then(res => {
            this.surveyDetails = res['data'][0];
            this.lob = this.surveyDetails['lob'][1];
            this.product = this.surveyDetails['product_id'][1];
            this.name = this.surveyDetails['customer_name'];
            this.phone = this.surveyDetails['phone'];
            this.email = this.surveyDetails['email'];
            this.surveyNumber = this.surveyDetails['name'];
            this.recommendation = this.surveyDetails['recomm'];
            this.comment = this.surveyDetails['comment'];
            this.state = this.surveyDetails['status'][1]
            this.fileId = this.surveyDetails['survey_report'][0];
            this.message = this.surveyDetails['message']
          });
      }
    });
  }

  ngOnInit() {
  }
  expandItem(item): void {
    if (item.expanded) {
      item.expanded = false;
    } else {
      this.allData.map(listItem => {
        if (item == listItem) {
          listItem.expanded = !listItem.expanded;
        } else {
          listItem.expanded = false;
        }
        return listItem;
      });
    }
  }
  submitSurvey(form){
    this.odooApi.showLoading();
    const data = {'data': {'id': this.surveyDetails.id, 'comment': form.value.comment,
    'recomm': form.value.recommendation, 'file': this.file.toString().replace('data:application/pdf;base64,', '')}}
    this.odooApi.callOdooMethod('arope.broker', 'submit_survey', data).then(res =>{
      if (res['data']){
        this.surveyDetails = res['data'][0];
        this.lob = this.surveyDetails['lob'][1];
        this.product = this.surveyDetails['product_id'][1];
        this.name = this.surveyDetails['customer_name'];
        this.phone = this.surveyDetails['phone'];
        this.email = this.surveyDetails['email'];
        this.surveyNumber = this.surveyDetails['name'];
        this.recommendation = this.surveyDetails['recomm'];
        this.comment = this.surveyDetails['comment'];
        this.state = this.surveyDetails['status'][1]
        this.fileId = this.surveyDetails['survey_report'][0];
        this.message = this.surveyDetails['message']
        this.odooApi.hideLoading();
      }
    });
  }
  handleUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.file = reader.result
    };
  }
  downloadReport(){
    const url = this.odooApi.odooUrl + ":" + this.odooApi.odooPort + "/web/content/" + this.fileId.toString() + "?download=true"
    return window.open(url, '_blank');
  }

}
