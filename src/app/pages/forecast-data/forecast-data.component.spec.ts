import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForecastDataComponent } from './forecast-data.component';

describe('ForecastDataComponent', () => {
  let component: ForecastDataComponent;
  let fixture: ComponentFixture<ForecastDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForecastDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForecastDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
