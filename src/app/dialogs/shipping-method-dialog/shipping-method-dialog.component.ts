import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ShippingMethods } from '../../mockups/deliver-shipping-methods';
@Component({
  selector: 'ltf-shipping-method-dialog',
  templateUrl: './shipping-method-dialog.component.html',
  styleUrls: ['./shipping-method-dialog.component.sass'],
})
export class ShippingMethodDialogComponent implements OnInit {
  data: number;
  shippingMethods = ShippingMethods;
  constructor(
    public dialogRef: MatDialogRef<ShippingMethodDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public shippingMethodData: number
  ) {
    this.data = shippingMethodData;
  }

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close(this.data);
  }
}
