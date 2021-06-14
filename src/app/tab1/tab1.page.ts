import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { SharedService } from './../services/shared.service';
import { OdooApiService } from './../services/odoo-api.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  @ViewChild('doughnutCanvas') doughnutCanvas: ElementRef;
  public doughnutChart: Chart;
  public mixedChart: Chart;
  data: any;
  doughnutData: any[] = [];
  doughnutlabels: any[] = [];
  lineData: any[];
  barData: any[];
  lastYear: any[];
  currentYear: any[];
  url = "207.154.195.214:7070"
  colors = ['#3778C2','#3EB650','#3cba9f','#e8c3b9','#c45850',
            '#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
            '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
            '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
            '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
            '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
            '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
            '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', 
            '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
            '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
            '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];
  constructor(public odooApi: OdooApiService, public shared: SharedService, public router: Router, private navCtrl: NavController) {
    this.data = this.shared.dashboardData;
    console.log(this.data);
    if (this.data['policy_lob']) {
      for (let rec of this.data['policy_lob']){
        this.doughnutData.push(rec.amount);
        this.doughnutlabels.push(rec.name)
      }
    }
    if (this.shared.group != 'Surveyor') {
      this.lineData = this.data.targetVsProduction.target;
      this.barData = this.data.targetVsProduction.production;
      this.currentYear = this.data.lastVsCurrentYear.current_year;
      this.lastYear = this.data.lastVsCurrentYear.last_year;
    }
  }
  
  ngOnInit() {
    if (this.shared.group != 'Surveyor') {
      this.makePiechart('pieCanvas', this.doughnutlabels, this.doughnutData);
      this.makeMixedGraph('mixed', this.barData, this.lineData, 'bar', 'line', 'Production', 'Target', false);
      this.makeMixedGraph('currentVsLast', this.lastYear, this.currentYear, 'bar', 'bar', 'Last Year', 'Current Year', 'backgroundColor');
    }
  }

  makePiechart(id,labels,data) {
    setTimeout(() => {
    let doughnut = document.getElementById(id);
    if (doughnut) {
      this.doughnutChart = new Chart(doughnut, {
        type: "pie",
        data:  {
          labels: labels,
          datasets: [{
            // label: "Population (millions)",
            backgroundColor: this.colors,
            data: data,
            fill: false
          }]
        },
        options: {
          legend: { display: false },
          animation: {
            duration: 2000 // general animation time
          },
          // title: {
          //   display: true,
          //   text: 'Predicted world population (millions) in 2050'
          // }
          }
        });
      }
    }, 1000);
  }
  
  makeMixedGraph(id,firstData, secondData, firstType, secondType, firstLabel, secondLabel, key) {
    setTimeout(() => {
    let mixed = document.getElementById(id);
    if (mixed) {
      this.mixedChart = new Chart(mixed, {
        type: firstType,
        data: {
            datasets: [{
                backgroundColor: '#3778C2',
                label: firstLabel,
                data: firstData
            }, {
                backgroundColor: key ? '#3EB650' : undefined ,
                borderColor: '#3EB650' ,
                label: secondLabel,
                data: secondData,
    
                // Changes this dataset to become a line
                type: secondType
            }
            
          ],
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            
        },
        options: {
          legend: { display: true },
          animation: {
            duration: 2000 // general animation time
          },
        }
      });
    }
   }, 1000);
  }
  goToPolicies(){
    this.router.navigateByUrl('policy');
  }
  goToRenewls(){
    const ids = this.data.renews.Green.ids.concat(this.data.renews.Red.ids,this.data.renews.Orange.ids);
    let navigationExtras = {
      queryParams: {'renew': ids}
    };
    this.router.navigate(['policy'], navigationExtras);
  }
  goToCollections(){
    this.router.navigateByUrl('collections');

  }
  goToClaims(){
    this.router.navigateByUrl('arope-claims');
  }
  back(){
    this.navCtrl.back();
  }
  productionAchive(){

    return((this.data.targetVsProduction.production.reduce((a, b) => a + b, 0) / this.data.targetVsProduction.target.reduce((a, b) => a + b, 0)) *100)
  }

}
