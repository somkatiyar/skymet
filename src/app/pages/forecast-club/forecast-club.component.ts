
import { AfterViewInit, Component, ElementRef, NgZone, OnDestroy, ViewChild } from '@angular/core';
import { CurrentDataComponent } from '../current-data/current-data.component';
import { ForecastDataComponent } from '../forecast-data/forecast-data.component';
import { HourlyDataComponent } from '../hourly-data/hourly-data.component';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { WindowService } from '../../services/window.service';
import { SeoService } from '../../services/seo.service';
import { DataService } from '../../services/data.service';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import { CommonModule } from '@angular/common';
import { UvIndexComponent } from '../../shared/shared/widget/uv-index/uv-index.component';
import { UvRaysComponent } from '../../shared/shared/widget/uv-rays/uv-rays.component';
import { WeatherNewsComponent } from '../weather-news/weather-news.component';
import { SkysenseComponent } from '../skysense/skysense.component';
import { DewpointComponent } from '../../shared/shared/widget/dewpoint/dewpoint.component';
import { RainfallComponent } from '../../shared/shared/widget/rainfall/rainfall.component';
import { SpeedometerComponent } from '../../shared/shared/widget/speedometer/speedometer.component';
import { SunriseComponent } from '../../shared/shared/widget/sunrise/sunrise.component';
import { MoonriseComponent } from '../../shared/shared/widget/moonrise/moonrise.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UtilityService } from '../../services/utility.service';
import { createForecastBreadcrumb } from '../../model/schema';
import { NativeService } from '../../mobile-app/service/native.service';
@Component({
  selector: 'app-forecast-club',
  standalone: true,
  imports: [CurrentDataComponent, RouterLink,
    DewpointComponent, CommonModule, TranslateModule,
    SkysenseComponent, SpeedometerComponent,
    HourlyDataComponent, ForecastDataComponent, RainfallComponent,
    UvRaysComponent, WeatherNewsComponent, SunriseComponent, MoonriseComponent],
  templateUrl: './forecast-club.component.html',
  styleUrl: './forecast-club.component.scss',

})
export class ForecastClubComponent implements AfterViewInit, OnDestroy {
  hourlyData: any;
  forecastData: any;
  filteredData: any;
  currentData: any;
  metaInfo: any;
  buddyDataHourly: any;
  buddy7: any;
  forecast: any = [];
  addressList: any = [];
  sunriseTime = '6:28 AM';
  sunsetTime = '6:10 PM';
  moonriseTime = '6:28 PM';
  moonsetTime = '6:10 AM';
  date = 'May 12';
  uvRange = [1, 3, 5, 9, 10, 11];
  aqiRange = [50, 100, 250, 320, 400, 500];

  forecastLimit: any = 7;
  weatherNewsHeaderConfig: any = {
    title: "Suggested Resources",
    isLanguagesSelecter: false,
    isFooterView: true,
    isHeaderView: false
  }
  selectedTab: any = "hourly";
  todayDay = new Date().getDate();
  recognition: any;
  expanded = false;
  @ViewChild(CurrentDataComponent) CurrentDataComponent!: CurrentDataComponent;
  toggleExpand() {
    this.expanded = !this.expanded;
  }

  ngOnDestroy(): void {
    this.utilityService.stop()
  }

  speak(text:string){
    if(this.nativeService.getPlateform() == 'native') {
      console.log('native platform');
      
      this.utilityService.speakNative(text);
    } else {
      console.log('web platform');
      this.utilityService.speak(text);
    }
  }

  pause() {
    if(this.nativeService.getPlateform() == 'native') {
      this.utilityService.stopNative();
    } else {
      this.utilityService.pause();
    }
  }

  



  constructor(private windowService: WindowService,
    public dataService: DataService,
    public utilityService: UtilityService,
    private route: ActivatedRoute,
    private nativeService: NativeService,
    private router: Router, private seoService: SeoService,
    private translateService: TranslateService) {

    this.dataService.selectedLanguages.subscribe(lng => {
      this.translateService.use(lng);
    });
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.getForecastData();
        this.seoService.alternativeLinks(event.urlAfterRedirects);
        this.managetabs(event.urlAfterRedirects);
        
      }
    });
  }

  managetabs(url:any) {
    if (url.includes('hourly-forecast')) {
      this.selectedTab = 'hourly';
    } else if (url.includes('weekly-forecast')) {
      this.selectedTab = '7 days';
    } else if (url.includes('fifteen-days-forecast')) {
      this.selectedTab = '15 days';
    }
  }
  refreshData() {
    this.dataService.currentPositionObservable.next(true);

  }

  getForecastData() {
    const decodedURL = decodeURIComponent(this.router.url);
    const pathAfterIndia = decodedURL.split("/india/")[1];
    this.forecast = [];
    this.addressList = [];
    this.dataService.weatherForecast("india/" + pathAfterIndia).then((res) => {
      if ((res && res.length > 1) || (res && res['data'] && res['data']['forecast'])) {
        this.forecast = res && res['data'];
        this.setForecast(res && res['data']);
        this.setCurrentData(res && res['data'])
        this.forecast && this.setForecastMeta();
        //this.forecast && this.setForecastSchema();
      } else {
        this.addressList = res;
      }
    });
  }

  setCurrentData(data: any) {
    if (this.windowService.isBrowser()) {
      let pathSegment = data.metainfo;
      let path = "india/" + pathSegment?.STATE_NAME.toLowerCase() + '/' + pathSegment?.DISTRICT_NAME.toLowerCase() + '/' + pathSegment?.TEHSIL_ALIAS_NAME.toLowerCase();
      this.CurrentDataComponent?.setForecast(data, path);

    }
  }
  setForecastSchema() {
    const metaInfo = this.forecast?.metainfo;
    const breadcrumbData = createForecastBreadcrumb(metaInfo?.STATE_NAME, metaInfo?.DISTRICT_NAME, metaInfo?.TEHSIL_ALIAS_NAME);
    this.seoService.generateSchema(breadcrumbData);
  }

  setForecastMeta() {
    const url = this.router.url;
    if (url.includes('extended-forecast')
      || url.includes('fifteen-days-forecast')
      || url.includes('weekly-forecast')
      || url.includes('hourly-forecast')) {
      var urlArr = url.split('/');
      var weatherDuration = urlArr[urlArr.length - 1];
      this.seoService.setForecastTags(this.forecast?.metainfo, weatherDuration);

      if (this.windowService.isBrowser()) {
        if (url.includes('weekly-forecast')) {
          // this.selectedTab = '7 days'
          setTimeout(() => {
            (document.getElementById('7_days') as HTMLElement).click();
            //this.onTabChange(7)
          }, 100);
        } else if (url.includes('hourly-forecast')) {
          // this.selectedTab = 'hourly'
          (document.getElementById('hourly') as HTMLElement).click();
        }
      }




    } else {
      this.seoService.setForecastTags(this.forecast?.metainfo, 'current');
    }
  }

  setGrediantHourly() {
    let grediant = this.dataService.getGradient();
    const gradientMap = Object.fromEntries(
      grediant.map((item: any) => [item.ist, item.gradient])
    );

    const mergedData = this.hourlyData.map((item: any) => ({
      ...item,
      gradient: gradientMap[item.ist] ?? null,
      selectedClass: this.todayDay === new Date(item.toorder).getDate() ? 'today' : 'otherday'
    }));

    this.hourlyData = mergedData;
  }

  setRain() {
    if (this.windowService.isBrowser()) {
      const rainContainer = document.getElementById('hourly2') as HTMLElement;
      for (let i = 0; i < 150; i++) {
        const drop = document.createElement('div');
        drop.classList.add('raindrop');
        drop.style.left = `${Math.random() * 100}%`;
        drop.style.animationDuration = `${0.5 + Math.random()}s`;
        drop.style.animationDelay = `${Math.random() * 2}s`;
        if (rainContainer) {
          rainContainer.appendChild(drop); // Safe
        } else {
          console.warn('rainContainer not found in DOM');
        }
      }
    }
  }



  setForecast(newData: any) {
    this.forecastData = this.dataService.bindIcon(newData?.forecast);
    this.hourlyData = this.dataService.bindIcon(newData?.hourly);
    this.hourlyDate = this.dataService.getToOrderDate(this.hourlyData[0].toorder)
    this.currentData = this.dataService.bindIcon([newData?.actual]);
    this.buddyDataHourly = newData?.forecast?.[0]?.weatherText;
    this.buddy7 = newData?.weatherDescription?.PHRASE;
    this.setGrediantHourly();
    this.metaInfo = newData?.metainfo;
    let grediant = this.dataService.getGradient();


    const gradientMap = Object.fromEntries(
      grediant.map((item: any) => [item.ist, item.gradient])
    );

    const mergedData = this.forecastData.map((item: any) => ({
      ...item,
      gradient: gradientMap[item.ist] ?? null
    }));

    this.forecastData = mergedData;
    this.filteredData = this.forecastData;
    const getAQIStatus = (aqi: number): string => {
      if (aqi <= 50) return 'Good';
      if (aqi <= 100) return 'Moderate';
      if (aqi <= 150) return 'Unhealthy ';
      if (aqi <= 200) return 'Unhealthy';
      if (aqi <= 300) return 'worst';
      return 'Hazardous';
    };

    this.forecastData = this.forecastData.map((obj: any) => {
      const aqi = Math.floor(Math.random() * 501);
      return {
        ...obj,
        rain: +(Math.random() * 100).toFixed(1),
        temp: +(Math.random() * 20 + 20).toFixed(1),
        aqi: aqi,
        status: getAQIStatus(aqi),
        dewPoint: +(Math.random() * 20 + 5).toFixed(1),
        // sunrise: `${6 + Math.floor(Math.random() * 2)}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
        // sunset: `${18 + Math.floor(Math.random() * 2)}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`
      };
    });

    if (this.selectedTab == '7 days' || this.selectedTab == '15 days') {
      if (this.windowService.isBrowser()) {
        setTimeout(() => {
          this.initForecastSwiper();
        }, 200);
      }

    }
  }

  getColorHumid(humidity: number): { background: string; text: string } {
    if (humidity >= 1 && humidity <= 30) {
      return { background: '#F5C5B1', text: "Low" };
    } else if (humidity >= 31 && humidity <= 69) {
      return { background: '##F5F2B1', text: "Moderate" };
    } else if (humidity >= 70 && humidity <= 100) {
      return { background: '#A5C7FF', text: "High" };
    } else {
      return { background: '#ffffff', text: 'Low' };
    }
  }

  getTempBarHeight(temp: number): { height: string; 'border-radius': string; width: string } {
    if (temp >= 1 && temp <= 14.99) {
      return { height: '30px', 'border-radius': '4px', width: '16px' };
    } else if (temp >= 15 && temp <= 29.99) {
      return { height: '35px', 'border-radius': '4px', width: '16px' };
    } else if (temp >= 30) {
      return { height: '40px', 'border-radius': '4px', width: '16px' };
    } else {
      return { height: '0px', 'border-radius': '0px', width: '0px' };
    }
  }



  allSwiper!: Swiper[];
  tempSwiperHourly!: Swiper;
  tempSwiper!: Swiper;
  rainSwiper!: Swiper;
  windSwiper!: Swiper;
  humiditySwiper!: Swiper;
  uvRaysSwiper!: Swiper;
  dewPointsSwiper!: Swiper;
  aqiSwiper!: Swiper;
  sunriseSwiper!: Swiper;
  moonrisesSwiper!: Swiper;
  hourlyDateSwiper!: Swiper;


  syncSlides(event: any, activeSwiper: Swiper) {
    this.allSwiper && this.allSwiper.forEach((swiper) => {
      if (swiper !== activeSwiper) {
        swiper && swiper.el.style && swiper.slideTo(event.activeIndex);
      }
    });

  }

  hourlyDate: any;
  hourlyActiveIndex: any = 0;
  tempSwiperInitHourly() {
    if (this.windowService.isBrowser()) {
      const element = document.querySelector('.swiper_temp_hourly') as HTMLElement;

      if (!element) {
        console.warn('Swiper element not found');
        return;
      }
      this.tempSwiperHourly = new Swiper(element, {
        slidesPerView: 7,
        spaceBetween: 0,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        breakpoints: {
          0: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 6,
          },

          1024: {
            slidesPerView: 7,

          }
        }, on: {
          slideChange: (event) => {
            this.hourlyDate = this.dataService.getToOrderDate(this.hourlyData[event.activeIndex].toorder)
            this.hourlyActiveIndex = event.activeIndex;
            this.todayDay = new Date(this.hourlyData[event.activeIndex].toorder).getDate();

          }
        },
      });
    }
  }


  tempSwiperInit() {
    if (this.windowService.isBrowser()) {
      this.tempSwiper = new Swiper('.swiper_temp', {
        slidesPerView: 7,
        spaceBetween: 0,
        breakpoints: {
          0: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 6,
          },

          1024: {
            slidesPerView: 7,

          }
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        on: {
          slideChange: (event) => {
            this.syncSlides(event, this.tempSwiper)

          }
        },
      });
    }

  }


  rainSwiperInit() {
    if (this.windowService.isBrowser()) {
      this.rainSwiper = new Swiper('.swiper_rain', {
        slidesPerView: 7,
        spaceBetween: 5,
        breakpoints: {
          0: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 6,
          },

          1024: {
            slidesPerView: 7,

          }
        },
        on: {
          slideChange: (event) => {
            this.syncSlides(event, this.rainSwiper)

          }
        },
      });
    }

  }
  windSwiperInit() {
    if (this.windowService.isBrowser()) {
      this.windSwiper = new Swiper('.swiper_wind', {
        slidesPerView: 7,
        spaceBetween: 5,
        breakpoints: {
          0: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 6,
          },

          1024: {
            slidesPerView: 7,

          }
        },
        on: {
          slideChange: (event) => {
            this.syncSlides(event, this.windSwiper)

          }
        },
      });
    }

  }
  humiditySwiperInit() {
    if (this.windowService.isBrowser()) {
      this.humiditySwiper = new Swiper('.swiper_humidity', {
        slidesPerView: 7,
        spaceBetween: 10,
        breakpoints: {
          0: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 6,
          },

          1024: {
            slidesPerView: 7,

          }
        },
        on: {
          slideChange: (event) => {
            this.syncSlides(event, this.humiditySwiper)

          }
        },
      });
    }

  }
  uvRaysSwiperInit() {
    if (this.windowService.isBrowser()) {
      this.uvRaysSwiper = new Swiper('.swiper_uv', {
        slidesPerView: 7,
        spaceBetween: 10,
        breakpoints: {
          0: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 6,
          },

          1024: {
            slidesPerView: 7,

          }
        },
        on: {
          slideChange: (event) => {
            this.syncSlides(event, this.uvRaysSwiper)

          }
        },
      });
    }

  }
  dewPointSwiperInit() {
    if (this.windowService.isBrowser()) {
      this.dewPointsSwiper = new Swiper('.swiper_dewPoint', {
        slidesPerView: 7,
        spaceBetween: 10,
        breakpoints: {
          0: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 6,
          },

          1024: {
            slidesPerView: 7,

          }
        },
        on: {
          slideChange: (event) => {
            this.syncSlides(event, this.dewPointsSwiper)

          }
        },
      });
    }

  }
  aqiSwiperInit() {
    if (this.windowService.isBrowser()) {
      this.aqiSwiper = new Swiper('.swiper_aqi', {
        slidesPerView: 7,
        spaceBetween: 10,
        breakpoints: {
          0: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 6,
          },

          1024: {
            slidesPerView: 7,

          }
        },
        on: {
          slideChange: (event) => {
            this.syncSlides(event, this.aqiSwiper)

          }
        },
      });
    }

  }
  sunriseSwiperInit() {
    if (this.windowService.isBrowser()) {
      this.sunriseSwiper = new Swiper('.swiper_sunrise', {
        slidesPerView: 7,
        spaceBetween: 10,
        breakpoints: {
          0: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 6,
          },

          1024: {
            slidesPerView: 7,

          }
        },
        on: {
          slideChange: (event) => {
            this.syncSlides(event, this.sunriseSwiper)

          }
        },
      });
    }

  }
  moonriseSwiperInit() {
    if (this.windowService.isBrowser()) {
      this.moonrisesSwiper = new Swiper('.swiper_moonrise', {
        slidesPerView: 7,
        spaceBetween: 10,
        breakpoints: {
          0: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 6,
          },

          1024: {
            slidesPerView: 7,

          }
        },
        on: {
          slideChange: (event) => {
            this.syncSlides(event, this.moonrisesSwiper)

          }
        },
      });
    }

  }

  initForecastSwiper() {
    this.tempSwiperInit();
    this.rainSwiperInit();
    this.windSwiperInit();
    this.humiditySwiperInit();
    this.uvRaysSwiperInit();
    this.dewPointSwiperInit();
    this.aqiSwiperInit();
    this.sunriseSwiperInit();
    this.moonriseSwiperInit();
    this.allSwiper = [
      this.tempSwiper,
      this.rainSwiper,
      this.windSwiper,
      this.humiditySwiper,
      this.uvRaysSwiper,
      this.dewPointsSwiper,
      this.aqiSwiper,
      this.sunriseSwiper,
      this.moonrisesSwiper,
    ];
  }

  ngAfterViewInit(): void {
    this.tempSwiperInitHourly()
    if (this.windowService.isBrowser()) {
      setTimeout(() => {
        this.initForecastSwiper();
        this.setCurrentData(this.forecast);
      }, 100);
    }
  }

  manageUrl(tab: any) {
    let baseUrl = this.router.url;
    baseUrl = baseUrl
      .replace(/\/weekly-forecast/g, '')
      .replace(/\/fifteen-days-forecast/g, '');

    if (tab === 7) {
      baseUrl += '/weekly-forecast';
    } else if (tab === 15) {
      baseUrl += '/fifteen-days-forecast';
    }

    // replace URL without pushing history entry
    this.router.navigateByUrl(baseUrl, { replaceUrl: true });
  }




  onTabChange(tab: any) {
    if (this.windowService.isBrowser()) {
      this.expanded = false;
      this.manageUrl(tab);
      if (tab == 7) {
        this.forecastData = this.filteredData?.slice(0, 7);
      } else {
        this.forecastData = this.filteredData.slice(0, 15);
      }


      setTimeout(() => {
        this.allSwiper?.forEach((swiper) => {
          if (swiper && swiper.destroy) {
            swiper.destroy(true, true);
          }
        });

        this.initForecastSwiper();

        this.allSwiper?.forEach((swiper) => {
          if (swiper && swiper.slideTo) {
            swiper && swiper.el.style && swiper.slideTo(0);
          }
        });
      }, 100);
    }
  }


  sunrise: any = "06:00";
  sunset: any = "18:00"

  getSunAngle(sunrise: string, sunset: string, current: string): number {
    const timeToMinutes = (time: string): number => {
      const [h, m] = time.split(':').map(Number);
      return h * 60 + m;
    };

    const sunriseMin = timeToMinutes(sunrise);
    const sunsetMin = timeToMinutes(sunset);
    const currentMin = timeToMinutes(current);

    // Clamp before sunrise and after sunset
    if (currentMin <= sunriseMin) return -90;
    if (currentMin >= sunsetMin) return 90;

    const totalDuration = sunsetMin - sunriseMin;
    const elapsed = currentMin - sunriseMin;

    const ratio = elapsed / totalDuration;
    return ratio * 180 - 90;
  }
  public calculateAngle(): number {
    return this.getSunAngle(this.sunrise, this.sunset, this.getCurrentTime());
  }

  public calculateAngleMoon(): number {
    return this.getSunAngle(this.moonriseTime, this.moonsetTime, this.getCurrentTime());
  }

  getCurrentTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const timeString = `${hours}:${minutes}`;
    return timeString
  }
}
