import { Component, OnInit, ViewChild} from '@angular/core';
import { CurrentDataComponent } from '../current-data/current-data.component';
import { HourlyDataComponent } from '../hourly-data/hourly-data.component';
import { ForecastDataComponent } from '../forecast-data/forecast-data.component';
import { SatelliteImageComponent } from '../satellite-image/satellite-image.component';
import { WeatherNewsComponent } from '../weather-news/weather-news.component';
import { NavigationEnd, Router } from '@angular/router';
import { SeoService } from '../../services/seo.service';
import { WindowService } from '../../services/window.service';
import { LocationService } from '../../services/location.service';
import { DataService } from '../../services/data.service';
import { CommonModule } from '@angular/common';
import { VideosComponent } from '../videos/videos.component';
import { FooterComponent } from '../footer/footer.component';
import { TranslateService } from '@ngx-translate/core';
import { take } from 'rxjs';
import { SkysenseComponent } from '../skysense/skysense.component';
import { NativeService } from '../../mobile-app/service/native.service';
import { Geolocation, Position } from '@capacitor/geolocation';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,CurrentDataComponent,
    HourlyDataComponent,
    ForecastDataComponent,
    SatelliteImageComponent,
    FooterComponent,SkysenseComponent,
    WeatherNewsComponent,VideosComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  nearestMeta:any;
  latitude:any = 28.7041;
  longitude:any = 77.1025;
  selectedLng:any;
  isLoading = true;

  weatherNewsHeaderConfig:any = {
    title:"Weather Updates",
    isLanguagesSelecter:true,
    isFooterView:true,
    isHeaderView:false
  }
  @ViewChild(CurrentDataComponent) CurrentDataComponent!: CurrentDataComponent;
  @ViewChild(HourlyDataComponent) HourlyDataComponent!: HourlyDataComponent;
  @ViewChild(SkysenseComponent) SkysenseComponent!: SkysenseComponent;


  constructor(
    private seoService: SeoService,
    private router: Router,
    private locationService:LocationService,
    private windowService:WindowService,
    private dataService:DataService,
    private nativeService:NativeService,
    private translateService:TranslateService
  ) {

   
 this.router.events.subscribe((event: any) => {
    if (event instanceof NavigationEnd) {
      this.dataService.selectedLanguages
        .pipe(take(1)) 
        .subscribe(async (lng) => {
          this.selectedLng = lng;
          if(this.nativeService.getPlateform() == "web") {
            let latlng = await this.getPosition(false);     
            await this.initHome(latlng)                    
            this.seoConfig(event); 
          } else {
            let latlng = await this.getPositionNative(false);     
            await this.initHome(latlng)                    
           
          }
          
        });
    }
  });
     
  }


 async refreshWebLocation() {
     let latlng = await this.getPosition(true);     
     await this.initHome(latlng) 
  }

   async refreshWebLocationNative() {
     let latlng = await this.getPositionNative(true);     
     await this.initHome(latlng) 
  }

  async initHome(latlng:any) {
        if (this.windowService.isBrowser()) {
              this.nearestMeta = await this.nearByLocation(latlng);
             
              let forecast:any = await this.getForecastData(this.formatPath(this.nearestMeta));         
              this.CurrentDataComponent?.setForecast(forecast,this.formatPath(this.nearestMeta));
              this.HourlyDataComponent?.setForecast(forecast,this.formatPath(this.nearestMeta));
              this.SkysenseComponent.setCurrentData(forecast?.actual)
            }
  }

    async getSavedLocData(latlng:any) {
        if (this.windowService.isBrowser()) {
              this.nearestMeta = await this.nearByLocation(latlng);
              let forecast:any = await this.getForecastData(this.formatPath(this.nearestMeta));         
              this.CurrentDataComponent?.setForecast(forecast,this.formatPath(this.nearestMeta));
              this.HourlyDataComponent?.setForecast(forecast,this.formatPath(this.nearestMeta));
              this.SkysenseComponent.setCurrentData(forecast?.actual)
            }
  }

   async ngOnInit() {
    
 
  }

 async getPositionNative(prompt:any) {
  return new Promise((resolve,reject) => {
    if( this.windowService.isBrowser()) {
      this.locationService
      .getCurrentPositionNative()
      .then((position:any) => {
        const { latitude, longitude } = position.coords;
        resolve({lat:latitude,lng:longitude});
      })
      .catch((error) => {
         resolve({lat:this.latitude,lng:this.longitude});
         prompt && alert("Unable to retrive your location please enable location in app settings");
          return;
      });
    }
  })

}


  async getPosition(prompt:any) {
  return new Promise((resolve,reject) => {
    if( this.windowService.isBrowser()) {
      this.locationService
      .getCurrentPosition()
      .then((position:any) => {
        const { latitude, longitude } = position.coords;
        resolve({lat:latitude,lng:longitude});
      })
      .catch((error) => {
         resolve({lat:this.latitude,lng:this.longitude});
         prompt &&  alert("Unable to retrieve your location. Please check your browser settings and ensure location services are enabled.");
          return;
      });
    }
  })

  }

  getForecastData(path:any) {
     return new Promise((resolve,reject) =>{
      this.dataService.weatherForecast(path).then( res => {
      resolve(res && res['data'] && res['data']);
      })
    })
 
  }

formatPath(data:any) {
  let path = `${data['Country'].toLowerCase()}/${data['State'].toLowerCase()}/${data['District'].toLowerCase()}/${data['Tehsil'].toLowerCase()}`
  return path;
}

  seoConfig(event:any) {
    this.seoService.setCanonicalLink(event.urlAfterRedirects);
    this.seoService.setSchema('home');
    this.seoService.alternativeLinks(event.urlAfterRedirects);
    this.seoService.setMetaTags('home');
    this.seoService.setSeoTags('home');
   
  }

    async nearByLocation(obj: any) {  
    return new Promise((resolve,reject) => {
      this.dataService.getNearest(obj.lat, obj.lng).subscribe(res => {
          resolve(res && res.data)
        }
      );
      
    })

  }
}
