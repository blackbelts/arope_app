import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateInsuranceAppPage } from './create-insurance-app.page';

describe('CreateInsuranceAppPage', () => {
  let component: CreateInsuranceAppPage;
  let fixture: ComponentFixture<CreateInsuranceAppPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateInsuranceAppPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateInsuranceAppPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
