import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SunriseComponent } from './sunrise.component';

describe('SunriseComponent', () => {
  let component: SunriseComponent;
  let fixture: ComponentFixture<SunriseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SunriseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SunriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
