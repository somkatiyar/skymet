import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { TrendingNewsComponent } from '../trending-news/trending-news.component';
import { DataService } from '../../services/data.service';
import { WindowService } from '../../services/window.service';
import { Autoplay, Manipulation, Navigation, Pagination, Thumbs, } from 'swiper/modules';
import Swiper from 'swiper';
declare var $:any;
Swiper.use([Autoplay, Navigation, Thumbs]);
@Component({
  selector: 'app-satellite-image',
  standalone: true,
  imports: [CommonModule,TrendingNewsComponent],
  templateUrl: './satellite-image.component.html',
  styleUrl: './satellite-image.component.scss'
})
export class SatelliteImageComponent implements AfterViewInit {
  patterns: WeatherPattern[] = [
    { title: "HIMAWARI", isActive: true },
    { title: "INSAT", isActive: false },
    { title: "RAINFALL", isActive: false },
  ];

  rainfallImages:any = [];
  satelliteImages:any = [];
  rainfallMainSwiper:any;
  constructor(public dataService: DataService,
    private cdr: ChangeDetectorRef,
    private windowService:WindowService) {
    
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
     this.getSatelliteImage('insat');
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
          this.rainfallImages = this.getImageUrls();
          this.rainfallImages && this.configImage(this.rainfallImages,tab)
      }
    
    }
 configImage(data: any, tab: any) {
  this.rainfallImages = [];

  if (tab === 'himawari') {
    data.forEach((el: any) => {
      this.rainfallImages.push(el);
    });
  } else if (tab === 'insat') {
    data.forEach((el: any) => {
      this.rainfallImages.push(el);
    });
  } else if (tab === 'Rainfall') {
    data.forEach((el: any) => {
      this.rainfallImages.push(el);
    });
  }

  // Important: Wait for Angular to render DOM before Swiper init
  this.cdr.detectChanges();

  // Now safely initialize Swiper
  setTimeout(() => {
    this.initSwiper();
  }, 100);
}


   getImageUrls( days = 15) {
      const urls = [];
      const now = new Date();
    for (let i = 0; i < days; i++) {
        const folderDate = new Date(now);
        folderDate.setDate(folderDate.getDate() - 1); 
        const folderDateString = folderDate.toISOString().split('T')[0].replace(/-/g, ''); // Format YYYYMMDD
        const imageDate = new Date(now);
        imageDate.setDate(imageDate.getDate() + i);
        const imageDateString = imageDate.toISOString().split('T')[0].replace(/-/g, ''); // Format YYYYMMDD
        const imageUrl = `https://www.skymetweather.com/themes/skymet/images/gfs/${folderDateString}/Rainfall_${imageDateString}.png`;
        urls.push(imageUrl);
    }
    return urls;
}


}
export interface WeatherPattern {
  title: string;
  isActive: boolean;
  
}
