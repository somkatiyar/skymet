import { Component } from '@angular/core';
import { UvIndexComponent } from '../../shared/shared/widget/uv-index/uv-index.component';
import { SunriseComponent } from '../../shared/shared/widget/sunrise/sunrise.component';
import { DewpointComponent } from '../../shared/shared/widget/dewpoint/dewpoint.component';
import { AirQualityComponent } from '../../shared/shared/widget/air-quality/air-quality.component';
import { UvRaysComponent } from '../../shared/shared/widget/uv-rays/uv-rays.component';

@Component({
  selector: 'app-skysense',
  standalone: true,
  imports: [UvRaysComponent,
    SunriseComponent,
    DewpointComponent,
    AirQualityComponent
  ],
  templateUrl: './skysense.component.html',
  styleUrl: './skysense.component.scss'
})
export class SkysenseComponent {
  sunrise:any ="06:00";
  sunset:any="18:00"
  currentTime:any="11:23"
  uvRange=[1,3,5,9,10,11];
  aqiRange=[50,100,250,320,400,500];


getSunAngle(sunrise: string, sunset: string, current: string): number {
  const timeToMinutes = (time: string): number => {
    const [h, m] = time.split(':').map(Number);
    return h * 60 + m;
  };

  const sunriseMin = timeToMinutes(sunrise);
  const sunsetMin = timeToMinutes(sunset);
  const currentMin = timeToMinutes(current);

  // Clamp before sunrise and after sunset
  if (currentMin <= sunriseMin) return -90;
  if (currentMin >= sunsetMin) return 90;

  const totalDuration = sunsetMin - sunriseMin;
  const elapsed = currentMin - sunriseMin;

  const ratio = elapsed / totalDuration;
  return ratio * 180 - 90; 
}
public calculateAngle(): number {
  return this.getSunAngle(this.sunrise, this.sunset, this.getCurrentTime());
}

getCurrentTime() {
  const now = new Date();
const hours = now.getHours().toString().padStart(2, '0');
const minutes = now.getMinutes().toString().padStart(2, '0');
const timeString = `${hours}:${minutes}`;
return timeString
}

}
