import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingdayviewComponent } from './meetingdayview.component';

describe('MeetingdayviewComponent', () => {
  let component: MeetingdayviewComponent;
  let fixture: ComponentFixture<MeetingdayviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeetingdayviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingdayviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
