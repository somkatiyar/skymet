import { AfterViewInit, Component, ElementRef, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { WindowService } from '../../../../services/window.service';

@Component({
  selector: 'app-uv-rays',
  standalone: true,
  imports: [],
  templateUrl: './uv-rays.component.html',
  styleUrl: './uv-rays.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class UvRaysComponent implements AfterViewInit {
  @Input() uvIndex: number = 8;
  @Input() range: any;
  @Input() maxUV = 0;
  @Input() props: any;
  @ViewChild('tick') tick!: ElementRef;
  @ViewChild('uvBar') uvBar!: ElementRef;
  minUV = 1;

  constructor(private windoService: WindowService) {}

  ngAfterViewInit(): void {
    if (this.windoService.isBrowser()) {
      // Delay the tick positioning to ensure layout is complete
      setTimeout(() => {
        console.log('DOM loaded. UV Index:', this.uvIndex, 'Props:', this.props);
        if (this.uvIndex && this.uvBar && this.tick) {
          this.setTickPosition();
        }
      }, 0); // You can increase to 50ms if needed
    }
  }

  setTickPosition(): void {
    const uv = this.uvIndex;
    const barWidth = this.uvBar.nativeElement.clientWidth;
    console.log('UV bar width:', barWidth);
    const position = ((uv - this.minUV) / (this.maxUV - this.minUV)) * barWidth;
    console.log('Calculated tick position (px):', position);
    this.tick.nativeElement.style.left = `${position}px`;
  }
}
