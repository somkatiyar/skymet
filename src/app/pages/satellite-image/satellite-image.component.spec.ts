import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SatelliteImageComponent } from './satellite-image.component';

describe('SatelliteImageComponent', () => {
  let component: SatelliteImageComponent;
  let fixture: ComponentFixture<SatelliteImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SatelliteImageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SatelliteImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
