import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkysenseComponent } from './skysense.component';

describe('SkysenseComponent', () => {
  let component: SkysenseComponent;
  let fixture: ComponentFixture<SkysenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkysenseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkysenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
