import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EndorsmentsTabPage } from './endorsments-tab.page';

describe('EndorsmentsTabPage', () => {
  let component: EndorsmentsTabPage;
  let fixture: ComponentFixture<EndorsmentsTabPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EndorsmentsTabPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EndorsmentsTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
