import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationProductDescriptionComponent } from './notification-product-description.component';

describe('NotificationProductDescriptionComponent', () => {
  let component: NotificationProductDescriptionComponent;
  let fixture: ComponentFixture<NotificationProductDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationProductDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationProductDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
