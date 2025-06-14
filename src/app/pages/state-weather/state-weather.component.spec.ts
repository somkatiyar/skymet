import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateWeatherComponent } from './state-weather.component';

describe('StateWeatherComponent', () => {
  let component: StateWeatherComponent;
  let fixture: ComponentFixture<StateWeatherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StateWeatherComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StateWeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
