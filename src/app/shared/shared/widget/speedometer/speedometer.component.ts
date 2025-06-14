import { AfterViewInit, Component, Input, input, OnChanges } from '@angular/core';
import { WindowService } from '../../../../services/window.service';

@Component({
  selector: 'app-speedometer',
  standalone: true,
  imports: [],
  templateUrl: './speedometer.component.html',
  styleUrl: './speedometer.component.scss'
})
export class SpeedometerComponent implements OnChanges {
  @Input()humidity:any
  constructor(private windoService:WindowService) {

  }
 ngOnChanges(): void {
    if (this.windoService.isBrowser()) {
      const needle = document.getElementById('needle') as HTMLElement | null;
      const speedValue = document.getElementById('speedValue') as HTMLElement | null;
      const targetSpeed = this.humidity ? this.humidity :0;
      let currentSpeed = 0;

      function updateNeedle(speed: number) {
        const angle = (speed / 180) * 180 - 90; 
        if (needle) needle.style.transform = `rotate(${angle}deg)`;
        if (speedValue) speedValue.textContent = Math.round(speed).toString();
      }

      function animateNeedle() {
        if (currentSpeed < targetSpeed) {
          currentSpeed += 1;
          updateNeedle(currentSpeed);
          requestAnimationFrame(animateNeedle);
        } else {
          updateNeedle(targetSpeed);
        }
      }

      animateNeedle();
    }
  }
}
