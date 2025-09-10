import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { NativeService } from '../../../mobile-app/service/native.service';
import { SplashScreen } from '@capacitor/splash-screen';

@Injectable({ providedIn: 'root' })
export class RootGuard implements CanActivate {
  constructor(private router: Router, private nativeService: NativeService) {}

  canActivate(): boolean {
    const platform = this.nativeService.getPlateform();
    if (platform === 'native') {
      const appState = this.nativeService.getNativeState();
        if (!appState) {
        setTimeout(() => {
          this.router.navigate(['/notification']).then(() => {
            SplashScreen.hide();
          });
        }, 3000);
        return false;
      }
      if (appState == null || !appState?.isVisited) {
       setTimeout(() => {
         this.router.navigate(['/location-enable']).then(() => {
          SplashScreen.hide();
        });
       }, 3000);
        return false;
      }
    }

    // ✅ Web OR Native (already visited) → allow HomeComponent on `/`
    return true;
  }
}
