import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NativeFooterComponent } from './native-footer.component';

describe('NativeFooterComponent', () => {
  let component: NativeFooterComponent;
  let fixture: ComponentFixture<NativeFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NativeFooterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NativeFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
