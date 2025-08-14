import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { TrendingNewsComponent } from '../trending-news/trending-news.component';
import { DataService } from '../../services/data.service';
import { WindowService } from '../../services/window.service';
import { Autoplay, Manipulation, Navigation, Pagination, Thumbs, } from 'swiper/modules';
import Swiper from 'swiper';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AdsenseDirective } from '../../shared/shared/directive/ads.directive';
declare var $:any;
Swiper.use([Autoplay, Navigation, Thumbs]);
@Component({
  selector: 'app-satellite-image',
  standalone: true,
  imports: [CommonModule,AdsenseDirective,TrendingNewsComponent,RouterLink,TranslateModule],
  templateUrl: './satellite-image.component.html',
  styleUrl: './satellite-image.component.scss'
})
export class SatelliteImageComponent implements AfterViewInit {
  patterns: WeatherPattern[] = [
    { title: "HIMAWARI", isActive: true },
    { title: "INSAT", isActive: false },
    { title: "RAINFALL", isActive: false },
  ];

  satelliteImage:any = [];

  rainfallMainSwiper:any;
  selectedTab: string = 'himawari';
  selectedLanguage: any;
  constructor(public dataService: DataService,
    private router:Router,
    private cdr: ChangeDetectorRef,private translateService: TranslateService,
    private windowService:WindowService) {
       this.dataService.selectedLanguages.subscribe(lng => {
      this.translateService.use(lng);
      this.selectedLanguage = lng;
    })
  }
  satelliteSwiper!:Swiper;

  initSwiper() {
      if(this.windowService.isBrowser()) {
         if (this.satelliteSwiper) {
          this.satelliteSwiper.destroy(true, true);
         }
        this.satelliteSwiper =  new Swiper(".satelliteSwiper", {
        autoplay: true,
        effect: "fade",
        slidesPerView:1
      });
  }

  }

  ngAfterViewInit(): void {
     this.initSwiper();
     this.getSatelliteImage('himawari');
  }



 changeSatelliteImages(tab:any) {
    this.getSatelliteImage(tab);
 }

    getSatelliteImage(tab:any) {
      if(tab == 'himawari' || tab =='insat') {
           this.dataService.getSatelliteImage(tab)
           .then((res:any) => {
           var data: any = res;
           res  && this.configImage(data, tab);
           }).catch(err => [
            console.log('error on fetching satellite data')
           ])
      }else {
          this.satelliteImage = this.getImageUrls(8, 'Rainfall_');                    
          this.satelliteImage && this.configImage(this.satelliteImage,tab)
      }
    
    }
 configImage(data: any, tab: any) {
  
  this.satelliteImage = [];

  if (tab === 'himawari') {
    data['images'].forEach((el: any) => {
      this.satelliteImage.push('https://www.data.jma.go.jp/mscweb/data/himawari/img/se4/'+el);
    });
  } else if (tab === 'insat') {
    data.forEach((el: any,index:any) => {
      index > 0 && this.satelliteImage.push(el);

      
    });
  } else if (tab === 'Rainfall') {
    data.forEach((el: any) => {
      this.satelliteImage.push(el);
    });
  }

  // Important: Wait for Angular to render DOM before Swiper init
  this.cdr.detectChanges();

  // Now safely initialize Swiper
  setTimeout(() => {
    this.initSwiper();
  }, 100);
}


  getImageUrls(days: any, fileName: any) {
    const urls = [];
    const now = new Date();
    for (let i = 0; i < days; i++) {
      // const folderDate = new Date(now);
      const folderDate = new Date(now);
      folderDate.setDate(folderDate.getDate() - 1);
      const folderDateString = folderDate.toISOString().split('T')[0].replace(/-/g, ''); // Format YYYYMMDD
      const imageDate = new Date(now);
      imageDate.setDate(imageDate.getDate() + i);
      const imageDateString = imageDate.toISOString().split('T')[0].replace(/-/g, ''); // Format YYYYMMDD
      const imageUrl = `https://www.skymetweather.com/themes/skymet/images/gfs/new/${folderDateString}/Rain/daily/${fileName}${imageDateString}.png`;
      urls.push(imageUrl);
    }
    return urls;
  }

  gotoSatellite() {
    this.selectedTab == 'himawari' && this.router.navigate(['himawari-latest-satellite-images-of-india']);
    this.selectedTab == 'insat' && this.router.navigate(['/insat/weather-satellite-images-of-india']);
    this.selectedTab == 'Rainfall' && this.router.navigate(['15-days-rainfall-forecast-for-india']);
  }

}
export interface WeatherPattern {
  title: string;
  isActive: boolean;
  
}
