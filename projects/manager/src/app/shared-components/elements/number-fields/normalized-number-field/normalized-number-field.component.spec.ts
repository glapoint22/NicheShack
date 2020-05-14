import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NormalizedNumberFieldComponent } from './normalized-number-field.component';

describe('NormalizedNumberFieldComponent', () => {
  let component: NormalizedNumberFieldComponent;
  let fixture: ComponentFixture<NormalizedNumberFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NormalizedNumberFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NormalizedNumberFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
