import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltersHierarchyPopupComponent } from './filters-hierarchy-popup.component';

describe('FiltersPopupComponent', () => {
  let component: FiltersHierarchyPopupComponent;
  let fixture: ComponentFixture<FiltersHierarchyPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltersHierarchyPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltersHierarchyPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
