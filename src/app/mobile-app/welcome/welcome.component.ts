import { Component } from '@angular/core';
import { WindowService } from '../../services/window.service';
import { CommonModule } from '@angular/common';
import { NativeService } from '../service/native.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss'
})
export class WelcomeComponent {
welcomeText:any = "";
backgroundStyle: { [key: string]: string } = {};
constructor(private windoService:WindowService,
  public nativeService:NativeService) {
  this.setBackground();
}

setBackground(): void {
  if (this.windoService.isBrowser()) {
    const hour = new Date().getHours();
    const dayNight: any = this.getDeviceType();
    const commonStyle = {
      'background-size': 'cover',
      'background-position': 'center',
      'background-repeat': 'no-repeat'
    };
  
    // Put night condition first
    if (hour >= 21 || hour < 5) {
      this.welcomeText = "Good Evening";
      this.backgroundStyle = {
        background: `url(./img/${dayNight}/9_5_am.webp)`,
        ...commonStyle
      };
    } else if (hour >= 5 && hour < 7) {
      this.welcomeText = "Good Morning";
      this.backgroundStyle = {
        background: `url(./img/${dayNight}/5_7_am.webp)`,
        ...commonStyle
      };
    } else if (hour >= 7 && hour < 11) {
      this.welcomeText = "Good Morning";
      this.backgroundStyle = {
        background: `url(./img/${dayNight}/7_11_am.webp)`,
        ...commonStyle
      };
    } else if (hour >= 11 && hour < 18) {
      this.welcomeText = "Good Afternoon";
      this.backgroundStyle = {
        background: `url(./img/${dayNight}/11_6_pm.webp)`,
        ...commonStyle
      };
    } else if (hour >= 18 && hour < 19) {
       this.welcomeText = "Good Evening";
      this.backgroundStyle = {
        background: `url(./img/${dayNight}/6_7_pm.webp)`,
        ...commonStyle
      };
    } else if (hour >= 19 && hour < 21) {
       this.welcomeText = "Good Evening";
      this.backgroundStyle = {
        background: `url(./img/${dayNight}/7_9_pm.webp)`,
        ...commonStyle
      };
    } else {
      // fallback
      this.backgroundStyle = {
        background: 'linear-gradient(180deg, #FFF 1.92%, #8B9FB6 23.56%, #F5FBFF 78.85%, #FFF 95.67%)',
        ...commonStyle
      };
    }
  }
}

getDeviceType() {
  var device = '';
  if (window.innerWidth <= 768) {
   device = 'mobile'
  } else {
   device = 'desktop'
  }
  return 'background_banner/'+device;
}


}
