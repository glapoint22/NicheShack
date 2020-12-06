import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSubgroupsComponent } from './product-subgroups.component';

describe('ProductSubgroupsComponent', () => {
  let component: ProductSubgroupsComponent;
  let fixture: ComponentFixture<ProductSubgroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductSubgroupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSubgroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
