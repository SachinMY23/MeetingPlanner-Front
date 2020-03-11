import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabaseerrComponent } from './databaseerr.component';

describe('DatabaseerrComponent', () => {
  let component: DatabaseerrComponent;
  let fixture: ComponentFixture<DatabaseerrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatabaseerrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatabaseerrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
