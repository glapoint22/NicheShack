import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationsItemListComponent } from './notifications-item-list.component';

describe('NotificationsItemListComponent', () => {
  let component: NotificationsItemListComponent;
  let fixture: ComponentFixture<NotificationsItemListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationsItemListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationsItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
