import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NonMotorClaimSurveyDetailsPage } from './non-motor-claim-survey-details.page';

describe('NonMotorClaimSurveyDetailsPage', () => {
  let component: NonMotorClaimSurveyDetailsPage;
  let fixture: ComponentFixture<NonMotorClaimSurveyDetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NonMotorClaimSurveyDetailsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NonMotorClaimSurveyDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
