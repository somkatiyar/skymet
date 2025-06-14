import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForecastClubComponent } from './forecast-club.component';

describe('ForecastClubComponent', () => {
  let component: ForecastClubComponent;
  let fixture: ComponentFixture<ForecastClubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForecastClubComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForecastClubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
