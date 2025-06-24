
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CurrentDataComponent } from '../current-data/current-data.component';
import { ForecastDataComponent } from '../forecast-data/forecast-data.component';
import { HourlyDataComponent } from '../hourly-data/hourly-data.component';
import {  NavigationEnd, Router } from '@angular/router';
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
@Component({
  selector: 'app-forecast-club',
  standalone: true,
  imports: [CurrentDataComponent,
    DewpointComponent, CommonModule, 
    SkysenseComponent,SpeedometerComponent,
    HourlyDataComponent,ForecastDataComponent,RainfallComponent,
    UvRaysComponent,WeatherNewsComponent,SunriseComponent,MoonriseComponent],
  templateUrl: './forecast-club.component.html',
  styleUrl: './forecast-club.component.scss',

})
export class ForecastClubComponent implements AfterViewInit {
  hourlyData:any;
  forecastData:any;
  currentData:any;
  forecast:any = [];
  addressList:any = [];
  sunriseTime = '6:28 AM';
  sunsetTime = '6:10 PM';
  moonriseTime = '6:28 PM';
  moonsetTime = '6:10 AM';
  date = 'May 12';
  uvRange=[1,3,5,9,10,11];
  aqiRange=[50,100,250,320,400,500];
   
  weatherNewsHeaderConfig:any = {
    title:"News and Article",
    isLanguagesSelecter:false,
    isFooterView:false,
    isHeaderView:true
  }

  selectedTab:any = "hourly"
  constructor(private windowService:WindowService,private dataService:DataService,
     private router:Router, private seoService:SeoService) {
      
          this.router.events.subscribe((event: any) => {
            if (event instanceof NavigationEnd) {
                 this.getForecastData();
                 this.seoService.alternativeLinks(event.urlAfterRedirects);
            }
          });
        
  }

  getForecastData() {
    const decodedURL = decodeURIComponent(this.router.url);
    const pathAfterIndia = decodedURL.split("/india/")[1];    
      this.forecast = [];
      this.addressList = [];
      this.dataService.weatherForecast("india/"+pathAfterIndia).then((res) => {        
        if( (res && res.length > 1) || (res && res['data'] && res['data']['forecast']) ) {
          this.forecast = res && res['data'];          
          this.setForecast(res && res['data']);
          this.forecast && this.setForecastMeta();
        } else {
          this.addressList = res;
         }
      });
  }


  setForecastMeta() {
    if(this.router.url.includes('extended-forecast') || this.router.url.includes('fifteen-days-forecast') || this.router.url.includes('weekly-forecast') ) {
      var urlArr = this.router.url.split('/');
      var weatherDuration = urlArr[urlArr.length -1];
       this.seoService.setForecastTags(this.forecast?.metainfo,weatherDuration);
     } else {
       this.seoService.setForecastTags(this.forecast?.metainfo,'current');
     }
  }

    setForecast(newData:any) {
    this.forecastData = this.dataService.bindIcon(newData?.forecast);
    this.hourlyData = this.dataService.bindIcon(newData?.hourly);    
    this.currentData = this.dataService.bindIcon([newData?.actual]);
    let grediant = this.dataService.getGradient();

    
      const gradientMap = Object.fromEntries(
        grediant.map((item:any) => [item.ist, item.gradient])
    );

    const mergedData = this.forecastData.map((item:any) => ({
      ...item,
      gradient: gradientMap[item.ist] ?? null  
    }));

    this.forecastData = mergedData;
       
const getAQIStatus = (aqi: number): string => {
  if (aqi <= 50) return 'Good';
  if (aqi <= 100) return 'Moderate';
  if (aqi <= 150) return 'Unhealthy ';
  if (aqi <= 200) return 'Unhealthy';
  if (aqi <= 300) return 'worst';
  return 'Hazardous';
};

this.forecastData = this.forecastData.map((obj:any) => {
  const aqi = Math.floor(Math.random() * 501);
  return {
    ...obj,
    rain: +(Math.random() * 100).toFixed(1), 
    temp: +(Math.random() * 20 + 20).toFixed(1), 
    aqi: aqi,
    status: getAQIStatus(aqi),
    dewPoint: +(Math.random() * 20 + 5).toFixed(1),
    sunrise: `${6 + Math.floor(Math.random() * 2)}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
    sunset: `${18 + Math.floor(Math.random() * 2)}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`
  };
});


  }


getColorHumid(humidity: number):  { background: string; text: string } {
  if (humidity >= 1 && humidity <= 30) {
    return {background:'#F5C5B1',text:"Low"};
  } else if (humidity >= 31 && humidity <= 69) {
    return {background:'##F5F2B1',text:"Moderate"};
  } else if (humidity >= 70 && humidity <= 100) {
    return {background:'#A5C7FF',text:"High"};
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
    return { height: '0px', 'border-radius': '0px', width: '0px' }; // fallback
  }
}

  


tempSwiper!:Swiper;
rainSwiper!:Swiper;
windSwiper!:Swiper;
humiditySwiper!:Swiper;
uvRaysSwiper!:Swiper;
dewPointsSwiper!:Swiper;
aqiSwiper!:Swiper;
sunriseSwiper!:Swiper;
moonrisesSwiper!:Swiper;
  tempSwiperInit() {
    if(this.windowService.isBrowser()) {
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
    
    1024:{
      slidesPerView: 7, 

    }
  }
    });
    }
   
  }
    rainSwiperInit() {
    if(this.windowService.isBrowser()) {
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
    
    1024:{
      slidesPerView: 7, 

    }
  }
    });
  }
   
  }
    windSwiperInit() {
    if(this.windowService.isBrowser()) {
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
    
    1024:{
      slidesPerView: 7, 

    }
  }
    });
    }
   
  }
    humiditySwiperInit() {
    if(this.windowService.isBrowser()) {
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
    
    1024:{
      slidesPerView: 7, 

    }
  }
    });
    }
   
  }
    uVSwiperInit() {
    if(this.windowService.isBrowser()) {
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
    
    1024:{
      slidesPerView: 7, 

    }
  }
    });
    }
   
  }
    dewPointSwiperInit() {
    if(this.windowService.isBrowser()) {
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
    
    1024:{
      slidesPerView: 7, 

    }
  }
    });
    }
   
  }
    aqiSwiperInit() {
    if(this.windowService.isBrowser()) {
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
    
    1024:{
      slidesPerView: 7, 

    }
  }
    });
    }
   
  }
    sunriseSwiperInit() {
    if(this.windowService.isBrowser()) {
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
    
    1024:{
      slidesPerView: 7, 

    }
  }
    });
    }
   
  }
    moonriseSwiperInit() {
    if(this.windowService.isBrowser()) {
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
    
    1024:{
      slidesPerView: 7, 

    }
  }
    });
    }
   
  }
 

ngAfterViewInit(): void {
  this.tempSwiperInit();
  this.rainSwiperInit();
  this.windSwiperInit();
  this.humiditySwiperInit();
  this.uVSwiperInit();
  this.dewPointSwiperInit();
  this.aqiSwiperInit();
  this.sunriseSwiperInit();
  this.moonriseSwiperInit();
}

  sunrise:any ="06:00";
  sunset:any="18:00"

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
