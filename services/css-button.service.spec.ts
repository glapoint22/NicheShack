import { TestBed } from '@angular/core/testing';

import { CssButtonService } from './css-button.service';

describe('CssButtonService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CssButtonService = TestBed.get(CssButtonService);
    expect(service).toBeTruthy();
  });
});
