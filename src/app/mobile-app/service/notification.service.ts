// push.service.ts
import { Injectable } from '@angular/core';
import {
  PushNotifications,
  PushNotificationSchema,
  Token,
  ActionPerformed,
} from '@capacitor/push-notifications';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor() {}

  initPush() {
    // Request permissions
    PushNotifications.requestPermissions().then(result => {
      if (result.receive === 'granted') {
        // Register with FCM
        PushNotifications.register();
      }
    });

    // On successful registration
    PushNotifications.addListener('registration', (token: Token) => {
      console.log('Push registration success, token: ', token.value);
      // You can send this token to your backend to store and use later
    });

    // On registration error
    PushNotifications.addListener('registrationError', (error) => {
      console.error('Push registration error: ', error);
    });

    // On receiving notification while app is open
    PushNotifications.addListener('pushNotificationReceived', (notification: PushNotificationSchema) => {
      console.log('Push received:', notification);
    });

    // On tapping notification
    PushNotifications.addListener('pushNotificationActionPerformed', (action: ActionPerformed) => {
      console.log('Push action performed:', action.notification);
    });
  }
}
