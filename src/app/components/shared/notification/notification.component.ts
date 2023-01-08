import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'ltf-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.sass']
})
export class NotificationComponent implements OnInit {
  errorMessage: string;
  type = 'error';
  iconSymbol = '!';
  headerText = '...Oops...';
  constructor(private dialogRef: MatDialogRef<NotificationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.errorMessage = this.data.errorMessage;
    this.type = this.data.type;
    switch (this.type) {
      case 'success':
        this.iconSymbol = '&#10004;';
        this.headerText = 'OK';
        break;
      default:
        break;
    }
  }

  close() {
    this.dialogRef.close();
  }

  get symbolClass() {
    switch (this.type) {
      case 'success':
        return 'circleSuccess';
      default:
        return 'circleError';
    }
  }

}
