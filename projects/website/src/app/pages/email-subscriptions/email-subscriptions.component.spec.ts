import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailSubscriptionsComponent } from './email-subscriptions.component';

describe('EmailSubscriptionsComponent', () => {
  let component: EmailSubscriptionsComponent;
  let fixture: ComponentFixture<EmailSubscriptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailSubscriptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailSubscriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
