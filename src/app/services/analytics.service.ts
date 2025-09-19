import { Injectable } from '@angular/core';
import { NativeService } from '../mobile-app/service/native.service';
import { FirebaseAnalytics } from '@capacitor-firebase/analytics';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  
  constructor(private nativeService:NativeService) {
    if (this.nativeService.getPlateform() == 'native') {

    }
   }

async logFirebaseEvent(eventName:any,params:any) {
   try {
      await FirebaseAnalytics.logEvent({
        name: eventName,
        params: params
      });
    } catch (err) {
      console.error('❌ Firebase Analytics failed:', err);
    }
  } 
}
