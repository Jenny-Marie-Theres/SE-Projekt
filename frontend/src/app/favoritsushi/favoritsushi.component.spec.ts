import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritsushiComponent } from './favoritsushi.component';

describe('FavoritsushiComponent', () => {
  let component: FavoritsushiComponent;
  let fixture: ComponentFixture<FavoritsushiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FavoritsushiComponent]
    });
    fixture = TestBed.createComponent(FavoritsushiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
