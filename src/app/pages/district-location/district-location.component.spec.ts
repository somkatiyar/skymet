import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistrictLocationComponent } from './district-location.component';

describe('DistrictLocationComponent', () => {
  let component: DistrictLocationComponent;
  let fixture: ComponentFixture<DistrictLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DistrictLocationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DistrictLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
