import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminToolbarComponent } from './admin-toolbar.component';

describe('AdminToolbarComponent', () => {
  let component: AdminToolbarComponent;
  let fixture: ComponentFixture<AdminToolbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminToolbarComponent]
    });
    fixture = TestBed.createComponent(AdminToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
