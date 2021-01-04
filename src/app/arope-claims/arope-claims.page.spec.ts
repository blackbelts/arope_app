import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AropeClaimsPage } from './arope-claims.page';

describe('AropeClaimsPage', () => {
  let component: AropeClaimsPage;
  let fixture: ComponentFixture<AropeClaimsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AropeClaimsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AropeClaimsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
