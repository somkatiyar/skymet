import { AfterViewInit, Component, Renderer2 } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './pages/header/header.component';
import { FooterComponent } from './pages/footer/footer.component';
import { WindowService } from './services/window.service';
import { filter } from 'rxjs';
import { NativeService } from './mobile-app/service/native.service';
import { CommonModule } from '@angular/common';
import { NativeFooterComponent } from './mobile-app/native-footer/native-footer.component';
import { NativeHeaderComponent } from './mobile-app/native-header/native-header.component';
import { PullToRefreshService } from './mobile-app/service/pull-to-refresh.service';
import { App as CapacitorApp } from '@capacitor/app';
import { Toast } from '@capacitor/toast';
import { NotificationService } from './mobile-app/service/notification.service';
import { StatusBar, Style } from '@capacitor/status-bar';
import { LocationService } from './services/location.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HeaderComponent,FooterComponent,CommonModule,NativeFooterComponent,NativeHeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit {
  title = 'skymetweather';
    private lastBackTime = 0;

  constructor(private windowService:WindowService,
    public nativeService:NativeService,
    private renderer: Renderer2,
    public locationService:LocationService,
    private pushService: NotificationService,
    private pullToRefreshService:PullToRefreshService,
    private router:Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        if(this.windowService.isBrowser()) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
        

   }

   ngAfterViewInit(): void {
     if(this.nativeService.getPlateform() == 'native' ) {
      this.setStyleGlobal();
      this.initStatusBar();

      this.pullToRefreshService.init(this.handleRefresh.bind(this));
        this.handleBackButton();
        this.pushService.initPush();
       if( this.nativeService.isUserLoggedIn()) {
        this.router.navigate(['/']);
       } else {
        this.router.navigate(['login']);
       }
     } 

     
   }

   setStyleGlobal() {
    if(this.nativeService.getPlateform() =="native") {

    this.renderer.setStyle(document.body, 'padding-bottom', '100px');
    //this.renderer.setStyle(document.body, 'margin-top', '0px');
  }
    } 

  async initStatusBar() {
     if(this.nativeService.getPlateform() =="native") {
    // Make status bar transparent and overlay the WebView
    await StatusBar.setOverlaysWebView({ overlay: true });
    await StatusBar.setBackgroundColor({ color: '#00000000' });
    await StatusBar.setStyle({ style: Style.Light });
      } // or Style.Dark
  }
   
handleRefresh() {
  if (this.windowService.isBrowser()) {
    const currentUrl = this.router.url;

    // Force re-navigation to the same route
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
}

  handleBackButton() {
    CapacitorApp.addListener('backButton', async () => {
      const url = this.router.url;

      // Only enable back-to-exit on the home/root page
      if (url === '/') {
        const currentTime = new Date().getTime();

        if (currentTime - this.lastBackTime < 2000) {
          CapacitorApp.exitApp();
        } else {
          console.log('kya jana chahte ho');
          
          this.lastBackTime = currentTime;
          await Toast.show({
            text: 'Press back again to exit',
            duration: 'short',
            position: 'top',
          });
        }
      } else {
        window.history.back(); 
      }
    });
  }
   hideSnackBar() {
    if(this.windowService.isBrowser()) {
          (document.getElementById('snackbar') as HTMLElement).classList.remove('show');
    }
    
  }

}
