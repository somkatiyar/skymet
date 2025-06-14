import { Injectable } from '@angular/core';
import { WindowService } from './window.service';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private windowService:WindowService) { }

   getCurrentPosition(): Promise<GeolocationPosition> {
    if (this.windowService.isBrowser() && 'geolocation' in navigator) {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
    } else {
      return Promise.reject('Geolocation is not available');
    }
  }

  
}
