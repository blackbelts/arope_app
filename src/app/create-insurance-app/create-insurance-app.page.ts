import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-insurance-app',
  templateUrl: './create-insurance-app.page.html',
  styleUrls: ['./create-insurance-app.page.scss'],
})
export class CreateInsuranceAppPage implements OnInit {
  quote_id: any;
  constructor(
    public activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params && params.id) {
        //store the temp in data
        this.quote_id = JSON.parse(params.id);
        console.log(this.quote_id);
      }
    });
  }

}
