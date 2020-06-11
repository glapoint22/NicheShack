import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralNotificationPopupComponent } from './general-notification-popup.component';

describe('GeneralNotificationPopupComponent', () => {
  let component: GeneralNotificationPopupComponent;
  let fixture: ComponentFixture<GeneralNotificationPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralNotificationPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralNotificationPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
