import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogtemComponent } from './dialogtem.component';

describe('DialogtemComponent', () => {
  let component: DialogtemComponent;
  let fixture: ComponentFixture<DialogtemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogtemComponent]
    });
    fixture = TestBed.createComponent(DialogtemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
