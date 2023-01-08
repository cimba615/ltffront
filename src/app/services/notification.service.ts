import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NotificationComponent } from '../components/shared/notification/notification.component';

@Injectable()
export class NotificationService {

  constructor(public dialog: MatDialog) { }

  showMessage(message, type = '', fn = null) {
    const dialogRef = this.dialog.open(NotificationComponent,
      {
        width: '500px',
        panelClass: 'errorPanel',
        data: { errorMessage: message, type: type }
      });

      dialogRef.afterClosed().subscribe(obj => {
        if (fn) {
          fn();
        }
      });
  }

}
