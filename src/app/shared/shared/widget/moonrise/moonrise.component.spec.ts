import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoonriseComponent } from './moonrise.component';

describe('MoonriseComponent', () => {
  let component: MoonriseComponent;
  let fixture: ComponentFixture<MoonriseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoonriseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoonriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
