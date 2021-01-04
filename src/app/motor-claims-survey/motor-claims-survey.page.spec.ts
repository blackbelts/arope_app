import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MotorClaimsSurveyPage } from './motor-claims-survey.page';

describe('MotorClaimsSurveyPage', () => {
  let component: MotorClaimsSurveyPage;
  let fixture: ComponentFixture<MotorClaimsSurveyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MotorClaimsSurveyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MotorClaimsSurveyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
