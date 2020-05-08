import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonColorComponent } from './button-color.component';

describe('ButtonColorComponent', () => {
  let component: ButtonColorComponent;
  let fixture: ComponentFixture<ButtonColorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonColorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
