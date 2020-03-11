import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingviewComponent } from './meetingview.component';

describe('MeetingviewComponent', () => {
  let component: MeetingviewComponent;
  let fixture: ComponentFixture<MeetingviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeetingviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
