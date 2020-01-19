import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LineBorderComponent } from './line-border.component';

describe('LineBorderComponent', () => {
  let component: LineBorderComponent;
  let fixture: ComponentFixture<LineBorderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LineBorderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineBorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
