import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HierarchyMenuComponent } from './hierarchy-menu.component';

describe('HierarchyMenuComponent', () => {
  let component: HierarchyMenuComponent;
  let fixture: ComponentFixture<HierarchyMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HierarchyMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HierarchyMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
