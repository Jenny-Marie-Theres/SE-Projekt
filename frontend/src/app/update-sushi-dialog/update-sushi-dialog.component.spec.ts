import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSushiDialogComponent } from './update-sushi-dialog.component';

describe('UpdateSushiDialogComponent', () => {
  let component: UpdateSushiDialogComponent;
  let fixture: ComponentFixture<UpdateSushiDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateSushiDialogComponent]
    });
    fixture = TestBed.createComponent(UpdateSushiDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
