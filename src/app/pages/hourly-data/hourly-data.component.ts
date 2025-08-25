import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { Autoplay, Manipulation, Navigation, Pagination, Thumbs, } from 'swiper/modules';
import Swiper from 'swiper';
import { WindowService } from '../../services/window.service';
import { DataService } from '../../services/data.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { AdsenseDirective } from '../../shared/shared/directive/ads.directive';
declare var $:any;

Swiper.use([Autoplay, Navigation, Thumbs]);
@Component({
  selector: 'app-hourly-data',
  standalone: true,
  imports: [CommonModule,TranslateModule,AdsenseDirective],
  templateUrl: './hourly-data.component.html',
  styleUrl: './hourly-data.component.scss',
  encapsulation:ViewEncapsulation.None,
})
export class HourlyDataComponent implements AfterViewInit {
 hourlyData:any;
 hourlySwiper!: Swiper;
 locationPath:any;
 selectedLanguage:any;
 constructor(
  private windowService:WindowService,
  private router:Router,
  private translateService: TranslateService,
  public dataService:DataService,private cdr: ChangeDetectorRef) {
   this.dataService.selectedLanguages.subscribe(lng => {
      this.translateService.use(lng);
      this.selectedLanguage = lng;
    })
 }

 ngAfterViewInit(): void {
   
 }
  gotoForecastPage(tab:any) {
      let forecastType:any;
      if(tab == 24) {
        forecastType = 'hourly-forecast'
      } else{
        forecastType = 'weekly-forecast'
      }
      this.router.navigate([`${this.selectedLanguage}/forecast/weather/${this.locationPath}/${forecastType}`]);
    }





  setForecast(newData:any,path:any) {
   this.locationPath = path; 
    this.hourlyData = this.dataService.bindIcon(newData?.hourly);
    let grediant = this.dataService.getGradient();

    
      const gradientMap = Object.fromEntries(
        grediant.map((item:any) => [item.ist, item.gradient])
    );

    const mergedData = this.hourlyData.map((item:any) => ({
      ...item,
      gradient: gradientMap[item.ist] ?? null  
    }));

    this.hourlyData = mergedData;

    this.cdr.detectChanges();
    this.initSwiper()
  }

   initSwiper() {
    if (this.windowService.isBrowser()) {
      this.hourlySwiper && this.hourlySwiper?.destroy(true, true);
      this.hourlySwiper = new Swiper('.hourly_swiper', {
           slidesPerView: 4.5,
         spaceBetween: 8,
         loop: false,
         freeMode: false,
         autoplay: true,
        breakpoints: {
       1024: {
            slidesPerView: 13,
          }
        },
          navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      });
    }
  }

}
