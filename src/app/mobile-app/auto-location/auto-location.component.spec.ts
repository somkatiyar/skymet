import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoLocationComponent } from './auto-location.component';

describe('AutoLocationComponent', () => {
  let component: AutoLocationComponent;
  let fixture: ComponentFixture<AutoLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutoLocationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutoLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
