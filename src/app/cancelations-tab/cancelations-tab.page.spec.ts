import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CancelationsTabPage } from './cancelations-tab.page';

describe('CancelationsTabPage', () => {
  let component: CancelationsTabPage;
  let fixture: ComponentFixture<CancelationsTabPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancelationsTabPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CancelationsTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
