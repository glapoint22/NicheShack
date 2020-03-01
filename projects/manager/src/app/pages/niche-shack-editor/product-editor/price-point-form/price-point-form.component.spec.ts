import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PricePointFormComponent } from './price-point-form.component';

describe('PricePointFormComponent', () => {
  let component: PricePointFormComponent;
  let fixture: ComponentFixture<PricePointFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PricePointFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PricePointFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
