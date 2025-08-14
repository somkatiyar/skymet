import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WindowService {
   L:any;
   leafletSubject = new Subject()
   //mode="development"
  mode="production"
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(platformId)) {
      if(this.mode == "production") {
        this.L = require('leaflet');
      }
    }
   }

  isServer() {
    return isPlatformServer(this.platformId)
  }

  isBrowser() {
    return isPlatformBrowser(this.platformId)
  }
}
