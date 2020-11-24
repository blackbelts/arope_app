import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QuotationServicePage } from './quotation-service.page';

describe('QuotationServicePage', () => {
  let component: QuotationServicePage;
  let fixture: ComponentFixture<QuotationServicePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuotationServicePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QuotationServicePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
