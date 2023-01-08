import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoadingComponent } from '../components/shared/loading/loading.component';

@Injectable()
export class LoadingService {

  showing: boolean;

  constructor(private dialog: MatDialog) { }

  showLoading() {
    this.showing = true;
    const ref = this.dialog.open(LoadingComponent, {
      hasBackdrop: true,
      panelClass: 'loadingPanel',
      disableClose: true
    });
    return ref;
  }

  hideLoading(ref?: MatDialogRef<any>) {
    this.showing = false;
    if (ref) {
      ref.close();
    } else {
      this.dialog.closeAll();
    }
  }

}
