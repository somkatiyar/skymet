import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WindowService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  isServer() {
    return isPlatformServer(this.platformId)
  }

  isBrowser() {
    return isPlatformBrowser(this.platformId)
  }
}
