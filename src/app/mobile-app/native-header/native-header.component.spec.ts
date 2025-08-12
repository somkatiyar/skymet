import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NativeHeaderComponent } from './native-header.component';

describe('NativeHeaderComponent', () => {
  let component: NativeHeaderComponent;
  let fixture: ComponentFixture<NativeHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NativeHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NativeHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
