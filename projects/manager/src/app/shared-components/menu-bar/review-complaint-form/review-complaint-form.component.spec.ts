import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewComplaintFormComponent } from './review-complaint-form.component';

describe('ReviewComplaintFormComponent', () => {
  let component: ReviewComplaintFormComponent;
  let fixture: ComponentFixture<ReviewComplaintFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewComplaintFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewComplaintFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
