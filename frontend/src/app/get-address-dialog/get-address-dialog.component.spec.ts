import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAddressDialogComponent } from './get-address-dialog.component';

describe('GetAddressDialogComponent', () => {
  let component: GetAddressDialogComponent;
  let fixture: ComponentFixture<GetAddressDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetAddressDialogComponent]
    });
    fixture = TestBed.createComponent(GetAddressDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
