import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InsuranceAppSurveyDetailsPage } from './insurance-app-survey-details.page';

describe('InsuranceAppSurveyDetailsPage', () => {
  let component: InsuranceAppSurveyDetailsPage;
  let fixture: ComponentFixture<InsuranceAppSurveyDetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsuranceAppSurveyDetailsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InsuranceAppSurveyDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
