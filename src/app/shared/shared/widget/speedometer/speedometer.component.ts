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

      // function updateNeedle(speed: number) {
      //   const angle = (speed / 180) * 180 - 90; 
      //   if (needle) needle.style.transform = `rotate(${angle}deg)`;
      //   if (speedValue) speedValue.textContent = Math.round(speed).toString();
      // }
function updateNeedle(speed: number) {
  const maxValue = 100; // or adjust if you want a different scale
  const minAngle = -90;
  const maxAngle = 90;

  // Clamp the value to avoid overflow
  const clampedSpeed = Math.min(Math.max(speed, 0), maxValue);

  // Calculate angle based on percentage
  const angle = minAngle + ((clampedSpeed / maxValue) * (maxAngle - minAngle));

  if (needle) needle.style.transform = `rotate(${angle}deg)`;
  if (speedValue) speedValue.textContent = Math.round(clampedSpeed).toString();
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
