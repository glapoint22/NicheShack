import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NicheShackHierarchyPopupComponent } from './niche-shack-hierarchy-popup.component';

describe('NicheShackHierarchyPopupComponent', () => {
  let component: NicheShackHierarchyPopupComponent;
  let fixture: ComponentFixture<NicheShackHierarchyPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NicheShackHierarchyPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NicheShackHierarchyPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
