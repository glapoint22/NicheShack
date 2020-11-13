import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryDropdownComponent } from './query-dropdown.component';

describe('QueryDropdownComponent', () => {
  let component: QueryDropdownComponent;
  let fixture: ComponentFixture<QueryDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
