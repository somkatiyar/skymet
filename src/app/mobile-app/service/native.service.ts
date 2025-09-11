import { Injectable } from '@angular/core';
import { WindowService } from '../../services/window.service';
import { Capacitor } from '@capacitor/core';
import { NavigationEnd, Router } from '@angular/router';
import { Geolocation, Position } from '@capacitor/geolocation';
import { App } from '@capacitor/app';
import { NavigationBar } from '@squareetlabs/capacitor-navigation-bar'
import { SafeArea } from 'capacitor-plugin-safe-area';
import { Toast } from '@capacitor/toast';

import {
  NativeSettings,
  AndroidSettings,
  IOSSettings
} from 'capacitor-native-settings';
import { BehaviorSubject, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class NativeService {
  headerExcludeUrl: string[] = ['/login', '/user-info', '/otp-verification', '/welcome', '/map', '/splash', '/location', '/notification', '/location-enable', '/loading', '/manual-search'];
  footerExcludeUrl: string[] = ['/login', '/user-info', '/otp-verification', '/welcome', '/map', '/splash', '/location', '/notification', '/location-enable', '/loading', '/manual-search']
  isHeader: boolean = true;
  isFooter: boolean = true;
  lngCode = ['hi', 'mr', 'gu', 'en', 'ta', 'te', 'kn', 'ml', 'bn', 'pa'];
  pageTitle: any = ""

  processSubject = new BehaviorSubject(false)

  constructor(private windowService: WindowService,
    private router: Router) {
    this.urlConfig();
    //this.listenAppState()
  }

  userInfoObj: any = {
    mobile: '',
    name: '',
    home: {
      loc: "",
      lat: "",
      lng: ""
    },
    work: ''

  }

  listenAppState() {
    App.addListener('resume', async () => {
      console.log('App resumed from background.');
      let status = await this.checkPermission();
      console.log('Permission after resume (check):', status.location);

      if (status.location === 'denied') {
        status = await this.requestPermission();
        console.log('Permission after resume (request):', status.location);
      }
      if (status.location === 'granted') {
        await this.handleGetLocation();
      } else {
        console.warn('Still denied after resume.');
      }
    });

  }

  getUserInfo() {
    if (this.windowService.isBrowser()) {
      var userInfo = localStorage.getItem("userInfo");
      return userInfo ? JSON.parse(userInfo) : null;
    }
  }

  getNativeState() {
    if (this.windowService.isBrowser()) {
      var userInfo = localStorage.getItem("nativeConfig");
      return userInfo ? JSON.parse(userInfo) : null;
    }
  }

  getLocationFromDtorage() {
    if (this.windowService.isBrowser()) {
      var location = localStorage.getItem("location");
      return location ? JSON.parse(location) : null;
    }
  }

  setUserInfo(key: any, value: any) {
    if (this.windowService.isBrowser()) {
      this.userInfoObj[key] = value;
      let filterObj = JSON.stringify(this.userInfoObj);
      localStorage.setItem("userInfo", filterObj)
    }
  }

  getPlateform() {
    var platform = "";
    if (Capacitor.getPlatform() == "android" || Capacitor.getPlatform() == "ios") {
      platform = "native"
    } else {
      platform = 'web'
    }
    return platform;
  }

  isUserLoggedIn(): boolean {
    return this.getUserInfo()?.mobile ? true : false;
  }

  isUserVisited() {
    return this.getNativeState()?.isVisited ? true : false;
  }

  isManualSearch() {
    return this.getNativeState()?.isManualSearch ? true : false;
  }
  isNotification() {
    return this.getNativeState()?.isNotificationAllowed ? true : false;
  }
  isAutoSearch() {
    return this.getNativeState()?.isAutoSearch ? true : false;
  }




  urlConfig() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (this.headerExcludeUrl.includes(this.router.url) || this.headerExcludeUrl.includes(this.router.url.split('?')[0])) {
          this.isHeader = false;
        } else {
          this.isHeader = true;
        }
        if (this.footerExcludeUrl.includes(this.router.url) || this.footerExcludeUrl.includes(this.router.url.split('?')[0])) {
          this.isFooter = false;
        } else {
          this.isFooter = true;
        }
      }
    })
  }

  isLanguageRoute(): boolean {
    const currentPath = this.router.url.split('/')[1];
    return this.lngCode.some(code => code === currentPath);
  }

  getComponentFromRoute() {
    var cmp = "";
    if (this.router.url.includes('forecast/weather')) {
      cmp = 'forecast'
      this.pageTitle = "Weather Forecast"
    } else if (this.router.url.includes('15-days-rainfall')) {
      cmp = 'forecastmap'
      this.pageTitle = "Forecast Map"
    } else if (this.router.url.includes('resources')) {
      cmp = 'resources';
      this.pageTitle = "Resources"
    } else if (this.router.url.includes('himawari-latest-satellite-images-of-india') ||
      this.router.url.includes('weather-satellite-images-of-india')) {
      cmp = 'satellite';
      this.pageTitle = "Satellite"
    } else if (this.router.url.includes('advertise-with-us')) {
      cmp = 'advertise';
    } else if (this.router.url.includes('contact-us')) {
      cmp = 'contact';
    } else if (this.router.url.includes('map')) {
      cmp = 'map';
      this.pageTitle = "Live Map"
    } else if (this.router.url.includes('video-list')) {
      cmp = 'resources';
      this.pageTitle = "Resources"
    } else
      if (this.router.url.includes('news-list')) {
        cmp = 'resources';
        this.pageTitle = "Resources"
      } else if (this.router.url.includes('content')) {
        cmp = 'article-detail';
        this.pageTitle = "Resources"
      } else if (this.router.url == '/' || this.isLanguageRoute()) {
        cmp = 'home'
        this.pageTitle = "Home"
      } else {
        cmp = 'other'
      }
    return cmp;
  }


  async getPositionNative(isRouteEnable: boolean = false) {
    try {
      const checkPermission = await this.checkPermission();
      console.log('Initial Permission:', checkPermission.location);

      switch (checkPermission.location) {
        case 'granted':
          return await this.handleGetLocation();

        case 'prompt':
          const statusPrompt = await this.requestPermission();
          console.log('After prompt request:', statusPrompt.location);

          if (statusPrompt.location === 'granted') {
            let latLng = await this.handleGetLocation();

            return latLng;
          } else {
            console.warn('User declined after prompt. Redirecting to manual search...');
            isRouteEnable && this.router.navigate(['manual-search'], {
              queryParams: {  replaceUrl: true }
            }).then(() => {
              this.setLocalConfig(false)
            });
          }
          break;

        case 'prompt-with-rationale':
          console.log('Need to show rationale before requesting permission.');

          const userAgreed = await this.showRationaleDialog()

          if (userAgreed) {
            const statusRationale = await this.requestPermission();
            console.log('After rationale request:', statusRationale.location);

            if (statusRationale.location === 'granted') {
              let latLng = await this.handleGetLocation();
              return latLng;
            } else {
              console.warn('User denied after rationale. Redirecting to manual search...');
              isRouteEnable && this.router.navigate(['manual-search'], {
                queryParams: {  replaceUrl: true }
              }).then(() => {
                this.setLocalConfig(false)
              });;
            }
          } else {
            console.log('User refused rationale dialog. Redirecting to manual search...');
            isRouteEnable && this.router.navigate(['manual-search'], {
              queryParams: {  replaceUrl: true }
            }).then(() => {
              this.setLocalConfig(false)
            });;
          }
          break;

        case 'denied':
          this.openSetting()
          console.warn('Permission denied permanently. Redirecting to manual search...');
          isRouteEnable && this.router.navigate(['manual-search'], {
            queryParams: {  replaceUrl: true }
          }).then(() => {
            this.setLocalConfig(false)
          });;
          break;

        default:
          console.error('Unknown permission state:', checkPermission.location);
          isRouteEnable && this.router.navigate(['manual-search'], {
            queryParams: {  replaceUrl: true }
          }).then(() => {
            this.setLocalConfig(false)
          });;
      }
    } catch (err) {
      console.error('Error getting position:', err);
      isRouteEnable && this.router.navigate(['manual-search'], {
        queryParams: {  replaceUrl: true }
      }).then(() => {
        this.setLocalConfig(false)
      });;
    }
  }

  private async handleGetLocation() {
    try {
      this.processSubject.next(true);
      const position: any = await this.getNativeLocation();
      console.log('Got Position:', position);
      this.setLocalConfig(true)
      setTimeout(() => {
        this.processSubject.next(false);
      }, 1500);
      return position.coords;
    } catch (err) {
      console.error('Error fetching location:', err);
    }
  }

  private async showRationaleDialog() {
    console.log('Rationale message popup');
    const agreed = confirm(
      '📍 We use Current location to keep you updated with real time weather data.\n\nDo you want to allow location?'
    );
    return agreed;
  }
  async checkPermission() {
    const permissions = await Geolocation.checkPermissions();
    return permissions;
  }

  async requestPermission() {
    const status = await Geolocation.requestPermissions();
    return status;
  }

  async getNativeLocation() {
    try {
      const position = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 20000
      });
      return position;

    } catch (err: any) {
      console.error('Geolocation error on native:', err);
      this.openSetting();
      return null;
    }
  }

  openSetting() {
    if (this.getPlateform() == 'native') {
      const result = confirm("Do you want to allow open app setting to enable location.");
      if (result) {
        NativeSettings.openAndroid({
          option: AndroidSettings.ApplicationDetails,
        });
      } else {
        console.log("User clicked No");
        return
      }

    }
  }
  getPartOfDay(d = new Date()) {
    const h = d.getHours();
    const m = d.getMinutes();
    const mm = h * 60 + m;

    const toMin = (hh: number, mm: number) => hh * 60 + mm;

    const DAY_START = toMin(6, 0);   // 06:00
    const DAY_END = toMin(11, 59); // 11:59

    const AFTERNOON_START = toMin(12, 0);  // 12:00
    const AFTERNOON_END = toMin(16, 30); // 16:30

    const EVENING_START = toMin(16, 31); // 16:31
    const EVENING_END = toMin(19, 0);  // 19:00

    if (mm >= DAY_START && mm <= DAY_END) return "day";
    if (mm >= AFTERNOON_START && mm <= AFTERNOON_END) return "afternoon";
    if (mm >= EVENING_START && mm <= EVENING_END) return "evening";
    return "night";
  }
  backgroundStyleNative: { [key: string]: string } = {};
  setBackgroundNative() {
    const commonStyle = {
      'background-size': 'cover',
      'background-position': 'center',
      'background-repeat': 'no-repeat'
    };
    const part = this.getPartOfDay();

    switch (part) {
      case "day":
        this.backgroundStyleNative = {
          background: `url(https://skymetweather.com/img/app_background/6_12_am.jpg)`,
          ...commonStyle
        };
        break;
      case "afternoon":
        this.backgroundStyleNative = {
          background: `url(https://skymetweather.com/img/app_background/12_4_pm.jpg)`,
          ...commonStyle
        };

        break;
      case "evening":
        this.backgroundStyleNative = {
          background: `url(https://skymetweather.com/img/app_background/4_7_pm.jpg)`,
          ...commonStyle
        };
        break;
      case "night":
        this.backgroundStyleNative = {
          background: `url(https://skymetweather.com/img/app_background/7_6_am.jpg)`,
          ...commonStyle
        };
        break;
    }

    return this.backgroundStyleNative;

  }

  getWeatherMessage(temp: any, rainChance: any, skyCondition: any, d = new Date()) {
    const h = d.getHours();
    const m = d.getMinutes();
    const mm = h * 60 + m; // total minutes since midnight

    const toMin = (hh: number, mm: number) => hh * 60 + mm;

    // time ranges
    const MORNING_START = toMin(5, 0);    // 5:00 AM
    const MORNING_END = toMin(11, 59);  // 11:59 AM

    const AFTERNOON_START = toMin(12, 0);   // 12:00 PM
    const AFTERNOON_END = toMin(17, 59);  // 5:59 PM

    const EVENING_START = toMin(18, 0);   // 6:00 PM
    const EVENING_END = toMin(21, 0);   // 9:00 PM

    const NIGHT_START = toMin(21, 1);   // 9:01 PM
    const NIGHT_END = toMin(23, 59);  // 11:59 PM

    const MIDNIGHT_START = toMin(0, 0);    // 12:00 AM
    const MIDNIGHT_END = toMin(4, 59);   // 4:59 AM

    let message = "";

    if (mm >= MORNING_START && mm <= MORNING_END) {
      message = `Good morning! It’s ${temp}° outside with a ${rainChance}% chance of rain. Plan your day accordingly.`;
    } else if (mm >= AFTERNOON_START && mm <= AFTERNOON_END) {
      message = `Good afternoon! The weather’s at ${temp}° with a ${rainChance}% chance of rain. Need to decide if you should take a break indoors or enjoy some fresh air?`;
    } else if (mm >= EVENING_START && mm <= EVENING_END) {
      message = `Evening’s here! It’s cooling down to ${temp}° with a ${rainChance}% chance of rain. Perfect moment to wind down or plan your night out.`;
    } else if (mm >= NIGHT_START && mm <= NIGHT_END) {
      message = `Nighttime vibes! It’s around ${temp}° with a ${rainChance}% chance of rain. Time to rest easy, but tap for a peek at tomorrow’s forecast so you’re ready to go.`;
    } else if (mm >= MIDNIGHT_START && mm <= MIDNIGHT_END) {
      message = `Hey, it’s midnight! The temperature is a cool ${temp}° with a ${rainChance}% chance of rain. Perfect for a peaceful night or a late stroll. Tap here to see what’s in store for the morning.`;
    }

    return message;
  }

  getGreetingMessage(): string {
    const hour = new Date().getHours();

    if (hour >= 0 && hour < 5) {
      return "Hey, it’s midnight! 🌙";
    } else if (hour >= 5 && hour < 12) {
      return "Good Morning! ☀️";
    } else if (hour >= 12 && hour < 15) {
      return "Good Afternoon! 🌤️";
    } else if (hour >= 15 && hour < 20) {
      return "Good Evening! 🌆 ";
    } else if (hour >= 20 && hour <= 23) {
      return "Nighttime vibes! 🌌";
    } else {
      return "Hello! Have a great day!"; // fallback
    }
  }

  async setNavigationBarTransparent() {
    await NavigationBar.setTransparency({
      isTransparent: true
    });
  }


  private setLocalConfig(isAllowed: boolean) {
    var isNotification = this.isNotification();
    localStorage.setItem(
      'nativeConfig',
      JSON.stringify({
        isVisited: false,
        isManualSearch: false,
        isNotificationAllowed: isNotification,
        isAutoSearch: isAllowed
      })
    );

  }

async showMessage(text:any) {
     await Toast.show({
            text: JSON.stringify(text),
            duration: 'long',
            position: 'top',
          });
}
async updateFooterInset(bottom: number) {
  var footerBottom;

    if(bottom > 10 && bottom<20 ) {
    footerBottom = 0
    console.log(`bottom-->${bottom}-->❌Navigation bar not found`);
  } else if(bottom>40 && bottom<45) {
    footerBottom = 0
    console.log(`bottom-->${bottom}-->✅Navigation bar  found`);

  
  }else if(bottom>44 && bottom<60) {
      footerBottom = 0


  }
  else if(bottom == 0 ){
    footerBottom = 0
    console.log(`bottom-->${bottom}-->❌Navigation bar not found for Abhishek device`);
  }

  document.documentElement.style.setProperty('--footer-bottom', `${footerBottom}px`);
}


async initSafeArea() {
  const { insets } = await SafeArea.getSafeAreaInsets();
  this.updateFooterInset(insets.bottom);
   console.log(insets,'inset obj');

  SafeArea.addListener('safeAreaChanged', async ( { insets }) => {
   await this.updateFooterInset(insets.bottom);
  });
    setTimeout(async () => {
    const { insets: recheckInsets } = await SafeArea.getSafeAreaInsets();
    await this.updateFooterInset(recheckInsets.bottom);
  }, 300);
}



}
