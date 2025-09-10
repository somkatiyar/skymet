// import { Injectable } from '@angular/core';
// import { CanActivate, Router } from '@angular/router';
// import { NativeService } from '../../../mobile-app/service/native.service';
// import { SplashScreen } from '@capacitor/splash-screen';

// @Injectable({ providedIn: 'root' })
// export class LocationGuard implements CanActivate {
//   constructor(private router: Router, private nativeService: NativeService) {}

//   canActivate(): boolean {
//     const platform = this.nativeService.getPlateform();

//     if (platform === 'native') {
//       const appState = this.nativeService.getNativeState();
//       console.log(appState,'in location gaurd');
      
//       if (appState && appState?.isVisited) {
//         // 👇 prevent opening location again
//         setTimeout(() => {
//                 this.router.navigate(['/']).then(() => {
//           SplashScreen.hide();
//         });
//         }, 3000);
  
//         return false;
//       }
//     }

//     return true;
//   }
// }
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { NativeService } from '../../../mobile-app/service/native.service';
import { SplashScreen } from '@capacitor/splash-screen';

@Injectable({
  providedIn: 'root'
})
export class LocationGuard implements CanActivate {
  constructor(
    private router: Router,
    private nativeService: NativeService
  ) {}

  canActivate(): boolean {
    const platform = this.nativeService.getPlateform();

    if (platform === 'native') {
      const appState = this.nativeService.getNativeState();
      console.log(appState, 'in location guard');

      if (appState) {
        // 👇 Prevent opening location again if already visited
        if (appState.isVisited) {
          setTimeout(() => {
            this.router.navigate(['/']).then(() => {
              SplashScreen.hide();
            });
          }, 3000);
          return false;
        }

        // 👇 If auto-search is disabled → open manual search directly
        if (appState.isAutoSearch === false) {
          setTimeout(() => {
            this.router.navigate(['/manual-search']).then(() => {
              SplashScreen.hide();
            });
          }, 3000);
          return false;
        }
      }
    }

    return true;
  }
}
