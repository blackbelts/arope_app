import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MotorClaimSurveyDetailsPage } from './motor-claim-survey-details.page';

describe('MotorClaimSurveyDetailsPage', () => {
  let component: MotorClaimSurveyDetailsPage;
  let fixture: ComponentFixture<MotorClaimSurveyDetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MotorClaimSurveyDetailsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MotorClaimSurveyDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
