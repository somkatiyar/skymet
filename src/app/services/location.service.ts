import { Injectable } from '@angular/core';
import { WindowService } from './window.service';
import { NativeService } from '../mobile-app/service/native.service';
import { Geolocation, Position } from '@capacitor/geolocation';
import { AppLauncher } from '@capacitor/app-launcher';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  isLocationEnable:boolean = true;;
  constructor(private windowService:WindowService,
    private nativeService:NativeService,private http:HttpClient) { }


async getCurrentPosition(): Promise<Position | null> {
  if (this.windowService.isBrowser() && 'geolocation' in navigator) {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition( position => {
        this.isLocationEnable = true;
        resolve(position)
      },
        async error => {

          switch (error.code) {
            case error.PERMISSION_DENIED:
              this.isLocationEnable = false;
              console.warn('User denied the request for Geolocation.');
              // let ip:any = await this.getIp();
              // let data = await this.getDataByIP(ip.ip);
              // console.log(data,'dadad');
              // resolve({
              //   coords: {
              //     latitude: data.latitude,
              //     longitude: data.longitude,
              //     accuracy: 0,
              //     altitude: null,
              //     altitudeAccuracy: null,
              //     heading: null,
              //     speed: null
              //   },
              //   timestamp: Date.now()
              // })
              break;
            case error.POSITION_UNAVAILABLE:
              this.isLocationEnable = false;
              console.warn('Location information is unavailable.');
              break;
            case error.TIMEOUT:
              this.isLocationEnable = false;
              console.warn('The request to get user location timed out.');
              break;
            default:
              console.warn('An unknown error occurred.');
              break;
          }

          resolve(null); // fallback instead of reject
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    });
  } else {
    console.warn('Geolocation not supported or not in browser context.');
    return null;
  }


}

getIp():Promise<any> {
  return this.http.get("https://api.ipify.org/?format=json").toPromise();
}

getDataByIP(ip:any): Promise<any> {
  return this.http.get(`https://api.ipstack.com/${ip}?access_key=d6feabbbb3247bf95a8f95c9df283346`).toPromise()
}


async getCurrentPositionNative(): Promise<Position | null> {
  try {
    const permissions = await Geolocation.checkPermissions();
    if (permissions.location !== 'granted') {
      await Geolocation.requestPermissions();
    }

    const position = await Geolocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 20000 // Increase timeout (default is 10000)
    });

    console.log('Native Position:', position);
    return position;

  } catch (err: any) {
    console.error('Geolocation error on native:', err);

    // Optional: Handle known Capacitor geolocation error codes
    if (err?.code === 'OS-PLUG-GLOC-0010') {
      console.warn('Try again with a higher timeout or check GPS availability.');
    }

    return null; // Return null instead of throwing
  }
}



}
