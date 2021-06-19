import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DividerWidgetComponent } from './divider-widget.component';

describe('DividerWidgetComponent', () => {
  let component: DividerWidgetComponent;
  let fixture: ComponentFixture<DividerWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DividerWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DividerWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
