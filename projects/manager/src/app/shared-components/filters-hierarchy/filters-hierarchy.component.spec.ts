import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltersHierarchyComponent } from './filters-hierarchy.component';

describe('FiltersHierarchyComponent', () => {
  let component: FiltersHierarchyComponent;
  let fixture: ComponentFixture<FiltersHierarchyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltersHierarchyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltersHierarchyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
