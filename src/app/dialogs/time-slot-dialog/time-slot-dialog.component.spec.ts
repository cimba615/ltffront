import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeSlotDialogComponent } from './time-slot-dialog.component';

describe('TimeSlotDialogComponent', () => {
  let component: TimeSlotDialogComponent;
  let fixture: ComponentFixture<TimeSlotDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeSlotDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeSlotDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
