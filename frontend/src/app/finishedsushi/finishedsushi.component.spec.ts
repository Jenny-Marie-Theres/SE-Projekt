import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishedsushiComponent } from './finishedsushi.component';

describe('FinishedsushiComponent', () => {
  let component: FinishedsushiComponent;
  let fixture: ComponentFixture<FinishedsushiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FinishedsushiComponent]
    });
    fixture = TestBed.createComponent(FinishedsushiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
