import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  PushNotifications,
  PushNotificationSchema,
  Token,
  ActionPerformed,
} from '@capacitor/push-notifications';
import {
  NativeSettings,
  AndroidSettings,
} from 'capacitor-native-settings';
import { NativeService } from './native.service';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private router: Router, private nativeService: NativeService) {}

  async initPush() {
    const result = await PushNotifications.requestPermissions();

    if (result.receive === 'granted') {
      this.registerPush();
    } else if (result.receive === 'denied') {
      this.setLocalConfig(false);
      this.router.navigate(['location-enable'], { replaceUrl: true });
    } else if (result.receive === 'prompt-with-rationale') {
      this.showRationaleConfirm();
    }
  }

  private registerPush() {
    PushNotifications.register();
    this.setLocalConfig(true);
    this.router.navigate(['location-enable'], { replaceUrl: true });

    PushNotifications.addListener('registration', (token: Token) => {
      console.log('Push registration success, token: ', token.value);
    });

    PushNotifications.addListener('registrationError', (error) => {
      console.error('Push registration error: ', error);
    });

    PushNotifications.addListener(
      'pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        console.log('Push received:', notification);
      }
    );

    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      (action: ActionPerformed) => {
        console.log('Push action performed:', action.notification);
      }
    );
  }

  private setLocalConfig(isAllowed: boolean) {
     this.router.navigate(['location-enable'], { replaceUrl: true }).then(() => {
    localStorage.setItem(
      'nativeConfig',
      JSON.stringify({
        isVisited: false,
        isManualSearch: false,
        isNotificationAllowed: isAllowed,
        isAutoSearch:false
      })
    );
     });
    
  }

  private async showRationaleConfirm() {
    const agreed = confirm(
      '📢 We use notifications to keep you updated with important alerts and new features.\n\nDo you want to allow notifications?'
    );

    if (agreed) {
      const status = await PushNotifications.requestPermissions();
      if (status.receive === 'granted') {
        this.registerPush();
      } else {
        this.setLocalConfig(false);
        this.router.navigate(['location-enable'], { replaceUrl: true });
      }
    } else {
      this.setLocalConfig(false);
      this.router.navigate(['location-enable'], { replaceUrl: true });
    }
  }

  openSetting() {
    if (this.nativeService.getPlateform() == 'native') {
      const result = confirm(
        'Do you want to open app settings to enable Notification?'
      );
      if (result) {
        NativeSettings.openAndroid({
          option: AndroidSettings.ApplicationDetails,
        });
      } else {
       
        this.setLocalConfig(false);
      }
    }
  }
}
 