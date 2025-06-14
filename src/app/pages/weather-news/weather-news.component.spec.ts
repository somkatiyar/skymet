import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherNewsComponent } from './weather-news.component';

describe('WeatherNewsComponent', () => {
  let component: WeatherNewsComponent;
  let fixture: ComponentFixture<WeatherNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherNewsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeatherNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
