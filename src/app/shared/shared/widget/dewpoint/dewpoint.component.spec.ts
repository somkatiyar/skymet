import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DewpointComponent } from './dewpoint.component';

describe('DewpointComponent', () => {
  let component: DewpointComponent;
  let fixture: ComponentFixture<DewpointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DewpointComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DewpointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
