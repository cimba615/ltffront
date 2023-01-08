import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingMethodDialogComponent } from './shipping-method-dialog.component';

describe('ShippingMethodDialogComponent', () => {
  let component: ShippingMethodDialogComponent;
  let fixture: ComponentFixture<ShippingMethodDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShippingMethodDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingMethodDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
