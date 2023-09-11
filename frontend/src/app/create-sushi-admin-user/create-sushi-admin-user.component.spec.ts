import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSushiAdminUserComponent } from './create-sushi-admin-user.component';

describe('CreateSushiAdminUserComponent', () => {
  let component: CreateSushiAdminUserComponent;
  let fixture: ComponentFixture<CreateSushiAdminUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateSushiAdminUserComponent]
    });
    fixture = TestBed.createComponent(CreateSushiAdminUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
