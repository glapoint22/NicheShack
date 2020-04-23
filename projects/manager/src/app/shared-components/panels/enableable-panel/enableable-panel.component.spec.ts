import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnableablePanelComponent } from './enableable-panel.component';

describe('EnableablePanelComponent', () => {
  let component: EnableablePanelComponent;
  let fixture: ComponentFixture<EnableablePanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnableablePanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnableablePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
