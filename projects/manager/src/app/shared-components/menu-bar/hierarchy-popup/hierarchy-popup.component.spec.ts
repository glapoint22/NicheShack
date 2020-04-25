import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HierarchyPopupComponent } from './hierarchy-popup.component';

describe('HierarchyComponent', () => {
  let component: HierarchyPopupComponent;
  let fixture: ComponentFixture<HierarchyPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HierarchyPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HierarchyPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
