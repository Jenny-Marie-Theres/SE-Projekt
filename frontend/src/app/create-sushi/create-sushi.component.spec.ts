import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSushiComponent } from './create-sushi.component';

describe('CreateSushiComponent', () => {
  let component: CreateSushiComponent;
  let fixture: ComponentFixture<CreateSushiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateSushiComponent]
    });
    fixture = TestBed.createComponent(CreateSushiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
