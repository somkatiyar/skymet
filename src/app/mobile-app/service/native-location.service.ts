import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Geolocation, Position } from '@capacitor/geolocation';
import { NativeService } from './native.service';
import {
  NativeSettings,
  AndroidSettings,
  IOSSettings
} from 'capacitor-native-settings';
@Injectable({
  providedIn: 'root'
})
export class NativeLocationService {

  constructor(private router: Router,
    private nativeService:NativeService) { }


  async configNativeLocation() {
    try {
      const checkPermission = await this.checkPermission();
      console.log('Initial Permission:', checkPermission.location);

      switch (checkPermission.location) {
        case 'granted':
           this.setLocalConfig(true)
           return await this.handleGetLocation();
        case 'prompt':
          const statusPrompt = await this.requestPermission();
          console.log('After prompt request:', statusPrompt.location);

          if (statusPrompt.location === 'granted') {
            this.setLocalConfig(true)
           return await this.handleGetLocation();
          } else {
            this.setLocalConfig(false)
            console.warn('User declined after prompt. Redirecting to manual search...');

          }
          break;

        case 'prompt-with-rationale':
          console.log('Need to show rationale before requesting permission.');

          const userAgreed = await this.showRationaleDialog();

          if (userAgreed) {
            const statusRationale = await this.requestPermission();
            console.log('After rationale request:', statusRationale.location);

            if (statusRationale.location === 'granted') {
              this.setLocalConfig(true)
              return await this.handleGetLocation()
            } else {
              this.setLocalConfig(false)
              console.warn('User denied after rationale. Redirecting to manual search...');
            }
          } else {
            console.log('User refused rationale dialog. Redirecting to manual search...');
            this.setLocalConfig(false)
          }
          break;

        case 'denied':
          this.openSetting();
          console.warn('Permission denied permanently. Redirecting to manual search...');

          break;

        default:
          console.error('Unknown permission state:', checkPermission.location);

      }
    } catch (err) {
      console.error('Error getting position:', err);

    }
  }

  private async showRationaleDialog() {
    console.log('Rationale message popup');
        const agreed = confirm(
      '📢 We use Current location to keep you updated with real time weather data.\n\nDo you want to allow location?'
    );
    return agreed;
  }

  async checkPermission() {
    const permissions = await Geolocation.checkPermissions();
    return permissions;
  }

  async requestPermission() {
    const status = await Geolocation.requestPermissions();
    return status;
  }

  async getNativeLocation() {
    try {
      const position = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 20000
      });
      return position;

    } catch (err: any) {
      console.error('Geolocation error on native:', err);
      return null;
    }
  }

  private async handleGetLocation() {
    try {
      const position: any = await this.getNativeLocation();
      console.log('Got Position:', position);
      return position.coords;
    } catch (err) {
      console.error('Error fetching location:', err);
    }
  }

    private setLocalConfig(isAllowed: boolean) {
    var isNotification = this.nativeService.isNotification();
    localStorage.setItem(
      'nativeConfig',
      JSON.stringify({
        isVisited: false,
        isManualSearch: false,
        isNotificationAllowed: isNotification,
        isAutoSearch: isAllowed
      })
    );
  }
   openSetting() {
    if (this.nativeService.getPlateform() == 'native') {
      const result = confirm("Do you want to allow open app setting to enable location.");
      if (result) {
        NativeSettings.openAndroid({
          option: AndroidSettings.ApplicationDetails,
        });
      } else {
        console.log("User clicked No");
        return
      }

    }
  }

}
