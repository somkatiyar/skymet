import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
import { take } from 'rxjs';
import { SkysenseComponent } from '../skysense/skysense.component';
import { NativeService } from '../../mobile-app/service/native.service';
import { Meta, Title } from '@angular/platform-browser';
import { SplashScreen } from '@capacitor/splash-screen';
import { AnalyticsService } from '../../services/analytics.service';
import { AdsenseDirective } from '../../shared/shared/directive/ads.directive';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CurrentDataComponent,
    HourlyDataComponent,
    ForecastDataComponent,
    SatelliteImageComponent,
    AdsenseDirective,
    FooterComponent, SkysenseComponent,
    WeatherNewsComponent, VideosComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, AfterViewInit {
  nearestMeta: any;
  latitude: any = 28.7041;
  longitude: any = 77.1025;
  selectedLng: any;
  isLoading = true;

  weatherNewsHeaderConfig: any = {
    title: "Weather Updates",
    isLanguagesSelecter: true,
    isFooterView: true,
    isHeaderView: false
  }
  @ViewChild(CurrentDataComponent) CurrentDataComponent!: CurrentDataComponent;
  @ViewChild(HourlyDataComponent) HourlyDataComponent!: HourlyDataComponent;
  @ViewChild(SkysenseComponent) SkysenseComponent!: SkysenseComponent;
  @ViewChild('videoContainer', { static: true }) videoContainer!: ElementRef;
  showVideo = false;



  constructor(
    private seoService: SeoService,
    private router: Router,
    private titie: Title,
    private metaService: Meta,
    public locationService: LocationService,
    private windowService: WindowService,
    public dataService: DataService,
    public nativeService: NativeService,
    private analyticsService:AnalyticsService
  ) {

    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.dataService.selectedLanguages
          .pipe(take(1))
          .subscribe(async (lng) => {
            this.selectedLng = lng;
            if (this.nativeService.getPlateform() == "web") {
              let latlng = await this.getPosition(false);
              await this.initHome(latlng)
              this.seoConfig(event);
            } else {

                 await SplashScreen.hide();
                //  await this.nativeService.setNavigationBarTransparent();
                 let savedData = JSON.parse(localStorage.getItem('location') || '{}');
                  let pathSegment = savedData?.metainfo;
                  let path = pathSegment && "india/" + pathSegment.STATE_NAME.toLowerCase() + '/' + pathSegment.DISTRICT_NAME.toLowerCase() + '/' + pathSegment.TEHSIL_ALIAS_NAME.toLowerCase();
                  let forecast: any = await this.getForecastData(path);                
                   await this.setStaticForecast(forecast);
                  this.CurrentDataComponent?.setForecast(forecast,path);
                  this.HourlyDataComponent?.setForecast(forecast, path);
                  this.SkysenseComponent?.setCurrentData(forecast?.actual)
                  this.analyticsService.logFirebaseEvent('user_location', { position: path });

              
            }
          });
      }
    });

  }

  ngAfterViewInit(): void {
    this.loadVideo();
    this.firstLoad();
  }


  loadVideo() {
    if (this.windowService.isBrowser()) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.showVideo = true;
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.2 }
      );
      observer.observe(this.videoContainer.nativeElement);
    }
  }



  async refreshWebLocation() {
    let latlng = await this.getPosition(true);
    await this.initHome(latlng)
  }

  async refreshWebLocationNative() {    
    let latlng = await this.nativeService.getNativeLocation();
    let position = latlng?.coords
    await this.initHome({lat:position?.latitude,lng:position?.longitude})
  }

  async initHome(latlng: any) {
    if (this.windowService.isBrowser()) {
      this.nearestMeta = await this.nearByLocation(latlng);
      let forecast: any = await this.getForecastData(this.formatPath(this.nearestMeta));
      await this.setStaticForecast(forecast);
      this.CurrentDataComponent?.setForecast(forecast, this.formatPath(this.nearestMeta));
      this.HourlyDataComponent?.setForecast(forecast, this.formatPath(this.nearestMeta));
      this.SkysenseComponent.setCurrentData(forecast?.actual)
    }
  }

  async setStaticForecast(data: any) {
    if (this.windowService.isBrowser()) {
      localStorage.setItem('location', JSON.stringify(data));
    }
  }



  async ngOnInit() {
    this.setMetaTitle();
    this.seoService.generateSchema();
    if (this.windowService.isBrowser()) {
      setTimeout(() => {
        this.openOverlay(this.dataService.getDeviceType() == 'mobile' ? 'https://www.skymetweather.com/img/loc_popup_mobile.webp' : 'https://www.skymetweather.com/img/loc_popup-desktop.webp');
      }, 2000);
    }
  }



  firstLoad(metaPath?:any) {
    if (this.windowService.isBrowser()) {
      let forecast = JSON.parse(localStorage.getItem('location') || '{}');
      let pathSegment = forecast?.metainfo;
      let path = pathSegment && "india/" + pathSegment.STATE_NAME.toLowerCase() + '/' + pathSegment.DISTRICT_NAME.toLowerCase() + '/' + pathSegment.TEHSIL_ALIAS_NAME.toLowerCase();
      this.CurrentDataComponent?.setForecast(forecast, metaPath ? metaPath :path);
      this.HourlyDataComponent?.setForecast(forecast, metaPath ? metaPath :path);
      this.SkysenseComponent?.setCurrentData(forecast?.actual)


    }

  }

  async getPositionNative(prompt: any) {
    return new Promise((resolve, reject) => {
      if (this.windowService.isBrowser()) {
        this.locationService
          .getCurrentPositionNative()
          .then((position: any) => {
            const { latitude, longitude } = position.coords;
            resolve({ lat: latitude, lng: longitude });
          })
          .catch((error) => {
           // resolve({ lat: this.latitude, lng: this.longitude });
            prompt && alert("Unable to retrive your location please enable location in app settings");
            return;
          });
      }
    })

  }
  isOverlayVisible: boolean = false;

  async getPosition(prompt: any) {
    return new Promise((resolve, reject) => {
      if (this.windowService.isBrowser()) {
        this.locationService
          .getCurrentPosition()
          .then((position: any) => {
            const { latitude, longitude } = position.coords;
            resolve({ lat: latitude, lng: longitude });
            this.isOverlayVisible = false;
          })
          .catch((error) => {
            console.log({ lat: this.latitude, lng: this.longitude }, 'error position (static lat lng)');
            resolve({ lat: this.latitude, lng: this.longitude });

            //  prompt &&  alert("Unable to retrieve your location. Please check your browser settings and ensure location services are enabled.");
            prompt && (this.isOverlayVisible = true);
            return;
          });
      }
    })

  }

  getForecastData(path: any) {
    return new Promise((resolve, reject) => {
      this.dataService.weatherForecast(path).then(res => {
        resolve(res && res['data'] && res['data']);
      })
    })

  }

  formatPath(data: any) {
    let path = `${data['Country'].toLowerCase()}/${data['State'].toLowerCase()}/${data['District'].toLowerCase()}/${data['Tehsil'].toLowerCase()}`
    return path;
  }

  seoConfig(event: any) {
    this.seoService.setCanonicalLink(event.urlAfterRedirects);
    this.seoService.alternativeLinks(event.urlAfterRedirects);
    //this.seoService.setMetaTags('home');
    //this.setMetaTitle()
    this.seoService.setSeoTags('home');

  }

  setMetaTitle() {

    this.titie.setTitle("Weather Forecast | Weather in India and World | Skymet Weather");
    this.metaService.updateTag({ name: 'keywords', content: "Weather Forecast | Weather in India and World | Skymet Weather" });
    this.metaService.updateTag({ name: 'description', content: "Weather Forecast for India, weather news and temperature in major cities across the world. Live weather News and Updates about weather from India and across the world." });
  }

  async nearByLocation(obj: any) {
    return new Promise((resolve, reject) => {
      this.dataService.getNearest(obj.lat, obj.lng).subscribe(res => {
        resolve(res && res.data)
      }
      );

    })

  }


  selectedImage = '/assets/sample.jpg';

  openOverlay(imageUrl?: string) {
    this.selectedImage = imageUrl || '/assets/sample.jpg';
  }

  closeOverlay() {
    this.isOverlayVisible = false;
  }

  goToSetting() {
    if (this.windowService.isBrowser()) {
      if (this.getOS() == "Android") {
        window.open('https://share.google/fy0kNfEP2RPP9Uit7', '_blank');

      } else if (this.getOS() == "iOS") {
        window.open('https://share.google/Vf2M3P6kuy26n4K7k', '_blank');
      }
    }
  }



  getOS(): string {
    if (this.windowService.isBrowser()) {
      const ua = navigator.userAgent || navigator.vendor || (window as any).opera;
      if (/android/i.test(ua)) {
        return 'Android';
      }
      if (/iPhone|iPad|iPod/i.test(ua)) {
        return 'iOS';
      }
      if (/Win(dows )?/i.test(ua)) {
        return 'Windows';
      }
      if (/Macintosh|Mac OS X/i.test(ua)) {
        return 'MacOS';
      }
      if (/Linux/i.test(ua)) {
        return 'Linux';
      }
    }
    return 'Unknown';
  }
}
