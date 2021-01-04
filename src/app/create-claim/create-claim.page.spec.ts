import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateClaimPage } from './create-claim.page';

describe('CreateClaimPage', () => {
  let component: CreateClaimPage;
  let fixture: ComponentFixture<CreateClaimPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateClaimPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateClaimPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
