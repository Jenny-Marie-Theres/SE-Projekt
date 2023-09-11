import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateFavoritSushiComponent } from './update-favorit-sushi.component';

describe('UpdateFavoritSushiComponent', () => {
  let component: UpdateFavoritSushiComponent;
  let fixture: ComponentFixture<UpdateFavoritSushiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateFavoritSushiComponent]
    });
    fixture = TestBed.createComponent(UpdateFavoritSushiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
