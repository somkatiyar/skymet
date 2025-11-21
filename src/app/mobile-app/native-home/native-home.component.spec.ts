import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NativeHomeComponent } from './native-home.component';

describe('NativeHomeComponent', () => {
  let component: NativeHomeComponent;
  let fixture: ComponentFixture<NativeHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NativeHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NativeHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
