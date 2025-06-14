import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RainfallModelComponent } from './rainfall-model.component';

describe('RainfallModelComponent', () => {
  let component: RainfallModelComponent;
  let fixture: ComponentFixture<RainfallModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RainfallModelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RainfallModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
