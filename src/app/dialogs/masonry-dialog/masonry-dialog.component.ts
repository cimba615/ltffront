import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'ltf-masonry-dialog',
  templateUrl: './masonry-dialog.component.html',
  styleUrls: ['./masonry-dialog.component.sass']
})
export class MasonryDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<MasonryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
