import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryDropdownButtonComponent } from './category-dropdown-button.component';

describe('CategoryDropdownButtonComponent', () => {
  let component: CategoryDropdownButtonComponent;
  let fixture: ComponentFixture<CategoryDropdownButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryDropdownButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryDropdownButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
