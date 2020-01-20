import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionalFillComponent } from './optional-fill.component';

describe('OptionalFillComponent', () => {
  let component: OptionalFillComponent;
  let fixture: ComponentFixture<OptionalFillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionalFillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionalFillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
