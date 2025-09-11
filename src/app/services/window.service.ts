import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Toast } from '@capacitor/toast';
@Injectable({
  providedIn: 'root'
})
export class WindowService {
   L:any;
   leafletSubject = new Subject();
   onlineOfflineSubject = new Subject();
   isFullScreen = new BehaviorSubject(false);
   //mode="development"
   mode="production"
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(platformId)) {
      if(this.mode == "production") {
        this.L = require('leaflet');
      }
    }
    this.checkOnlineOfflineStatus();
   }

  isServer() {
    return isPlatformServer(this.platformId)
  }

  isBrowser() {
    return isPlatformBrowser(this.platformId)
  }
    get nativeWindow(): Window | null {
    return this.isBrowser() ? window : null;
  }


  checkOnlineOfflineStatus() {
    if(this.isBrowser()) {
    window.addEventListener('online', () => {
      console.log('Back Online ✅');
      this.showTost('Back Online ✅')
      this.onlineOfflineSubject.next('online');
    });

    window.addEventListener('offline', () => {
      console.log('You are Offline ❌');
       this.showTost('You are Offline ❌');
       this.onlineOfflineSubject.next('offline');
    });
    }
  }

  async showTost(text:any) {
       await Toast.show({
            text: text,
            duration: 'short',
            position: 'top',
          });
  }

exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if ((document as any).webkitExitFullscreen) {
    (document as any).webkitExitFullscreen();
  } else if ((document as any).mozCancelFullScreen) {
    (document as any).mozCancelFullScreen();
  } else if ((document as any).msExitFullscreen) {
    (document as any).msExitFullscreen();
  }
}
   
}
