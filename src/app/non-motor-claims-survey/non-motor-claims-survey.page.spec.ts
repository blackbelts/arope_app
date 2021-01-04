import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NonMotorClaimsSurveyPage } from './non-motor-claims-survey.page';

describe('NonMotorClaimsSurveyPage', () => {
  let component: NonMotorClaimsSurveyPage;
  let fixture: ComponentFixture<NonMotorClaimsSurveyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NonMotorClaimsSurveyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NonMotorClaimsSurveyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
