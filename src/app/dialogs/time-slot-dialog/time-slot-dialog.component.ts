import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'ltf-time-slot-dialog',
  templateUrl: './time-slot-dialog.component.html',
  styleUrls: ['./time-slot-dialog.component.sass'],
})
export class TimeSlotDialogComponent implements OnInit {
  data: number;
  timeSlots: string[];
  constructor(
    public dialogRef: MatDialogRef<TimeSlotDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public timeSlotData: string
  ) {
    const config = JSON.parse(timeSlotData);
    this.data = config.data;
    this.timeSlots = config.slots;
  }

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close(this.data);
  }
}
