import { AfterViewInit, ChangeDetectorRef, Component, Input, SimpleChanges } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { DataService } from '../../services/data.service';
import { WindowService } from '../../services/window.service';
import { ChartComponent } from '../../shared/shared/widget/chart/chart.component';
import { RainfallComponent } from '../../shared/shared/widget/rainfall/rainfall.component';
import { SpeedometerComponent } from '../../shared/shared/widget/speedometer/speedometer.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-current-data',
  standalone: true,
  imports: [HeaderComponent,TranslateModule,CommonModule,
    ChartComponent,RainfallComponent,SpeedometerComponent],
  templateUrl: './current-data.component.html',
  styleUrl: './current-data.component.scss'
})
export class CurrentDataComponent implements AfterViewInit {
  forecastData:any;
  weatherText:any = `स्काइमेट वेदर में आपका स्वागत है`;
  locationPath:any;
  selectedLanguage:any;
  constructor(
    private translateService: TranslateService,
    public dataService: DataService,
    private windoService: WindowService,
   private router: Router,
  ) {
    this.dataService.selectedLanguages.subscribe(lng => {
      this.translateService.use(lng);
      this.selectedLanguage = lng;
    })
  }

  ngAfterViewInit(): void {
    this.setBackground();
  }
    setForecast(newData:any,path:any) {
      this.forecastData = newData;
      this.locationPath = path;      
       let actual = this.dataService.bindIcon([newData?.actual]);
      this.forecastData['actual'] = actual[0];
      
    }

    gotoForecastPage() {
      this.router.navigate([`${this.selectedLanguage}/forecast/weather/${this.locationPath}`]);
    }

    textToSpeech(text:any) {
      if(this.windoService.isBrowser()) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "hi-IN";
      utterance.pitch = 1;  
      utterance.rate = 1; 
      speechSynthesis.speak(utterance);
      }
    }


    // setBackground() {
    //   if(this.windoService.isBrowser()) {
    //     const background = document.getElementById('heroSection');
    //     const hour = new Date().getHours();
    //     console.log(hour, 'hour');
        
    //     if(hour >= 7 && hour < 12) {
    //       if(background) {
    //         background.style.background = "none"; 
    //         background.offsetHeight;
    //         background.style.background = "linear-gradient(180deg, #FFF 1.92%, #C9EAFF 24.04%, #F5FBFF 67.79%, #FFF 93.27%)";
    //       }

    //     } else if(hour >= 12 && hour < 17) {
    //       if(background) {
    //         background.style.background = "none"; 
    //         background.offsetHeight; 
    //         background.style.background = "linear-gradient(180deg, #FFF 1.92%, #FFE8B8 23.56%, #FFFCF6 78.85%, #FFF 96.15%);";
    //       }
    //     } else if(hour >= 17 && hour < 18) {
    //       if(background) {
    //         background.style.background = "none"; 
    //         background.offsetHeight; 
    //         background.style.background = "linear-gradient(180deg, #FFF 1.92%, #FFDACE 23.56%, #FFF 78.85%);";
    //       }
    //     }else if(hour >= 18 && hour < 21) {
    //       if(background) {
    //         background.style.background = "none"; 
    //         background.offsetHeight; 
    //         background.style.background = "linear-gradient(180deg, #FFF 1.92%, #94B2D6 23.56%, #F5FBFF 78.85%, #FFF 95.67%);";
    //       }
    //     } else if(hour >= 5 && hour < 6) {
    //       if(background) {
    //         background.style.background = "none"; 
    //         background.offsetHeight; 
    //         background.style.background = "linear-gradient(180deg, #FFF 1.92%, #FFD3C3 36.98%, #FFF 78.85%);";
    //       }
    //     }
    //      else if(hour >= 21 && hour < 4) {
    //       if(background) {
    //         background.style.background = "none"; 
    //         background.offsetHeight; 
    //         background.style.background = "linear-gradient(180deg, #FFF 1.92%, #8B9FB6 23.56%, #F5FBFF 78.85%, #FFF 95.67%);";
    //       }
    //     } 

    //   }
    // }
backgroundStyle: { [key: string]: string } = {};

// setBackground(): void {
//   if (this.windoService.isBrowser()) {
//     const hour = new Date().getHours();
//     console.log(hour, 'hour');

//     if (hour >= 7 && hour < 12) {
//       this.backgroundStyle = {
//         background: 'linear-gradient(180deg, #FFF 1.92%, #C9EAFF 24.04%, #F5FBFF 67.79%, #FFF 93.27%)'
//       };
//     } else if (hour >= 12 && hour < 17) {
//       this.backgroundStyle = {
//         background: 'linear-gradient(180deg, #FFF 1.92%, #FFE8B8 23.56%, #FFFCF6 78.85%, #FFF 96.15%)'
//       };
//     } else if (hour >= 17 && hour < 18) {
//       this.backgroundStyle = {
//         background: 'linear-gradient(180deg, #FFF 1.92%, #FFDACE 23.56%, #FFF 78.85%)'
//       };
//     } else if (hour >= 18 && hour < 21) {
//       this.backgroundStyle = {
//         background: 'linear-gradient(180deg, #FFF 1.92%, #94B2D6 23.56%, #F5FBFF 78.85%, #FFF 95.67%)'
//       };
//     } else if (hour >= 5 && hour < 6) {
//       this.backgroundStyle = {
//         background: 'linear-gradient(180deg, #FFF 1.92%, #FFD3C3 36.98%, #FFF 78.85%)'
//       };
//     } else {
//       // Covers 21–23 and 0–4
//       this.backgroundStyle = {
//         background: 'linear-gradient(180deg, #FFF 1.92%, #8B9FB6 23.56%, #F5FBFF 78.85%, #FFF 95.67%)'
//       };
//     }
//   }
// }

getDeviceType() {
  var device = '';
  if (window.innerWidth <= 768) {
   device = 'mobile'
  } else {
  device = 'desktop'
  }
  return 'background_banner/'+device;
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
      this.backgroundStyle = {
        background: `url(./img/${dayNight}/9_5_am.webp)`,
        ...commonStyle
      };
    } else if (hour >= 5 && hour < 7) {
      this.backgroundStyle = {
        background: `url(./img/${dayNight}/5_7_am.webp)`,
        ...commonStyle
      };
    } else if (hour >= 7 && hour < 11) {
      this.backgroundStyle = {
        background: `url(./img/${dayNight}/7_11_am.webp)`,
        ...commonStyle
      };
    } else if (hour >= 11 && hour < 18) {
      this.backgroundStyle = {
        background: `url(./img/${dayNight}/11_6_pm.webp)`,
        ...commonStyle
      };
    } else if (hour >= 18 && hour < 19) {
      this.backgroundStyle = {
        background: `url(./img/${dayNight}/6_7_pm.webp)`,
        ...commonStyle
      };
    } else if (hour >= 19 && hour < 21) {
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



}
