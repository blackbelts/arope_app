import { TestBed } from '@angular/core/testing';

import { OdooApiService } from './odoo-api.service';

describe('OdooApiService', () => {
  let service: OdooApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OdooApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
