import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { Autoplay, Manipulation, Navigation, Pagination, Thumbs, } from 'swiper/modules';
import Swiper from 'swiper';
import { WindowService } from '../../services/window.service';
import { DataService } from '../../services/data.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
declare var $:any;

Swiper.use([Autoplay, Navigation, Thumbs]);
@Component({
  selector: 'app-hourly-data',
  standalone: true,
  imports: [CommonModule],
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
  gotoForecastPage() {
      this.router.navigate([`${this.selectedLanguage}/forecast/weather/${this.locationPath}`]);
    }

 corousalconfig() {
  if(this.windowService.isBrowser()) {
    $('.Weather_cities_Crowsel').owlCarousel({
      margin: 10,
      responsiveClass: true,
      loop: true,
      nav: false,
      dots: false,
      responsive: {
        0: {
          items: 2,
          nav: true,
        },
        600: {
          items: 5,
          nav: false,
        },
        1000: {
          items: 7,
          nav: true,
          loop: false,
        },
      },
    });

    $('.forceCastBoxesCrowsel').owlCarousel({
      margin: 10,
      responsiveClass: true,
      loop: true,
      nav: false,
      dots: false,
      responsive: {
        0: {
          items: 3,
          nav: true,
        },
        600: {
          items: 7,
          nav: false,
        },
        1000: {
          items: 12,
          nav: true,
          loop: false,
        },
      },
    });

    window.onscroll = function () {
      //scrollFunction();
    };

    function scrollFunction() {
      if (
        document.body.scrollTop > 50 ||
        document.documentElement.scrollTop > 50
      ) {
        (document.getElementById('Header') as HTMLElement).style.background =
          '#A5E8FF';
      } else {
        (document.getElementById('Header') as HTMLElement).style.background =
          'transparent';
      }
    }



    //     const menutoggle = document.querySelector(".toggle");
    // const menulink = document.querySelector("#menulink");

    // if (menutoggle && menulink) {
    //   menutoggle.addEventListener("click", () => {
    //     menulink.classList.toggle("active");
    //     menutoggle.classList.toggle("active");
    //   });
    // }
  }
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

      // Then init/reinit carousel
    // this.corousalconfig();;
    this.initSwiper()
  }

   initSwiper() {
    if (this.windowService.isBrowser()) {
      this.hourlySwiper && this.hourlySwiper?.destroy(true, true);
      this.hourlySwiper = new Swiper('.forceCastBoxesCrowsel', {
          slidesPerView: 4.5,
        spaceBetween: 8,
        loop: true,
        freeMode: false,
        autoplay: false,
        breakpoints: {
          576: {
            slidesPerView: 4.5,
          },
          768: {
            slidesPerView: 6,
          },
          1100: {
            slidesPerView: 8,
          },
          1300: {
            slidesPerView: 8,
            spaceBetween: 10,
          },
          1400: {
            slidesPerView: 10,
            spaceBetween: 10,
          },
        },
      });
    }
  }
}
