import { TestBed } from '@angular/core/testing';

import { DropdownMenuService } from './dropdown-menu.service';

describe('DropdownMenuService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DropdownMenuService = TestBed.get(DropdownMenuService);
    expect(service).toBeTruthy();
  });
});
