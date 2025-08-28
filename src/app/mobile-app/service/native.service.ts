import { ChangeDetectorRef, Injectable } from '@angular/core';
import { WindowService } from '../../services/window.service';
import { Capacitor } from '@capacitor/core';
import { platform } from 'os';
import { NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NativeService {
  headerExcludeUrl: string[] = ['/login', '/user-info', '/otp-verification','/welcome','/map','/splash','/location'];
  footerExcludeUrl:string[]=['/login', '/user-info', '/otp-verification','/welcome','/map','/splash','/location']
  isHeader:boolean= true;
  isFooter:boolean = true;
  lngCode = ['hi', 'mr', 'gu', 'en', 'ta', 'te', 'kn', 'ml', 'bn', 'pa'];
  pageTitle:any = ""
  constructor(private windowService: WindowService,
    private router:Router) { 
      this.urlConfig()
    }

  userInfoObj:any = {
    mobile:'',
    name:'',
      home:{
      loc:"",
      lat:"",
      lng:""
    },
    work:''
    
  }

    getUserInfo() {
    if(this.windowService.isBrowser()) {
      var userInfo = localStorage.getItem("userInfo");
      return userInfo ? JSON.parse(userInfo) : null;
    }
   }

   setUserInfo(key:any,value:any) {
    if(this.windowService.isBrowser()) {
      this.userInfoObj[key] = value;
      let filterObj = JSON.stringify(this.userInfoObj);
      localStorage.setItem("userInfo",filterObj)
    }
   }

   getPlateform() {
    var platform = "";
      if(Capacitor.getPlatform() =="android" || Capacitor.getPlatform()=="ios") {
        platform = "native"
      } else {
        platform = 'web'
      }
      return platform;
   }

   isUserLoggedIn():boolean {
    return this.getUserInfo()?.mobile ? true : false;
   }


   urlConfig() {
    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {        
        if(this.headerExcludeUrl.includes(this.router.url) || this.headerExcludeUrl.includes(this.router.url.split('?')[0])) {
          this.isHeader = false;
        } else {
          this.isHeader = true;
        }
        if(this.footerExcludeUrl.includes(this.router.url) || this.footerExcludeUrl.includes(this.router.url.split('?')[0])) {
          this.isFooter = false;
        } else {
          this.isFooter = true;
        }
      }
    })
   }

    isLanguageRoute(): boolean {
    const currentPath = this.router.url.split('/')[1]; // Gets the first path segment
    return this.lngCode.some(code => code === currentPath);
  }

  getComponentFromRoute() {
    var cmp = "";
      if (this.router.url.includes('forecast/weather')) {
      cmp = 'forecast'
      this.pageTitle = "Weather Forecast"
    } else if(this.router.url.includes('15-days-rainfall')){
      cmp = 'forecastmap'
      this.pageTitle = "Forecast Map"
    } else if (this.router.url.includes('resources')) {
      cmp = 'resources';
      this.pageTitle = "Resources"
    } else if (this.router.url.includes('himawari-latest-satellite-images-of-india') ||
      this.router.url.includes('weather-satellite-images-of-india')) {
      cmp = 'satellite';
      this.pageTitle = "Satellite"
    }else if (this.router.url.includes('advertise-with-us')) {
      cmp = 'advertise';
    }else if (this.router.url.includes('contact-us')) {
      cmp = 'contact';
    }else if (this.router.url.includes('map')) {
      cmp = 'map';
      this.pageTitle = "Live Map"
    }else if (this.router.url.includes('video-list')) {
      cmp = 'resources';
      this.pageTitle = "Resources"
    }else
    if (this.router.url.includes('news-list')) {
      cmp = 'resources';
      this.pageTitle = "Resources"
    }else if (this.router.url.includes('content')) {
      cmp = 'article-detail';
      this.pageTitle = "Resources"
    }else if (this.router.url == '/' || this.isLanguageRoute()) {
      cmp = 'home'
      this.pageTitle = "Home"
    }else{
      cmp ='other'
    }
    return cmp;
  }
}
