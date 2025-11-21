import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, catchError, delay, Observable, of, retryWhen, Subject, switchMap, take, timeout } from 'rxjs';
import { WindowService } from './window.service';
import { Router } from '@angular/router';
import { WebAuthn } from '@darkedges/capacitor-native-webauthn';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient,
    private translationService: TranslateService,
    private router: Router,
    private windowService: WindowService) {
    this.selectedLanguages.subscribe(lng => {
      this.translationService.use(lng)
    })
  }

  baseURL = "https://api.skymetweather.com/api/";
  utilityUrl = "https://skymetglobalweather.com/skymet_utility/";
  postURL = `https://skymetglobalweather.com/strapi_skymet`;
  //postURL  = `http://192.168.105.3:1337`;
  localBaseUrl = `http://localhost:3011/`;





  selectedLanguages = new BehaviorSubject('en');
  nearestMeta = new BehaviorSubject('');
  currentPositionObservable = new Subject<any>();

  submitForm(body: any): Observable<any> {
    return this.http.post(this.baseURL + 'add_contactus_websiteuser', body)
  }



  weatherForecast(locations: any): Promise<any> {
    return this.http.get(
      this.baseURL + `getlocation/${locations}`
    ).toPromise();
  }

  districtwiseList(state: string, district: string): Observable<any> {

    return this.http.get(
      this.baseURL + `getlocation/india/${state}/${district}`
    );
  }

  getNearest(lat: any, lng: any): Observable<any> {
    return this.http.get(
      this.baseURL + `nearestgpslocation/${lat},${lng}`
    );
  }

  getDataByLatlng(latLng: any): Observable<any> {
    return this.http.get<any>(`https://ngswims.skymetweather.com/serviceapi/v1/dashboard?latlon=${latLng.lat},${latLng.lng}`)
  }

  allPost(currentPage: any, limit: any, lng?: any): Observable<any> {
    const randomNumber = Math.floor(Math.random() * 100000);
    return this.http.get(this.postURL + '/api/allPost' + `?start=${currentPage}&limit=${limit}&language=${lng ? lng : ''}&random=${randomNumber}`);
  }

  getTrendingNews(category: any, currentPage: any, limit: any): Observable<any> {
    const randomNumber = Math.floor(Math.random() * 100000);
    return this.http.get(this.postURL + '/api/posts/' + category + `?start=${currentPage}&limit=${limit}`);
  }

  weatherNews(category: any, currentPage: any, limit: any, lng?: any): Observable<any> {
    return this.http.get(this.postURL + '/api/posts/' + category + `?start=${currentPage}&limit=${limit}&language=${lng ? lng : ''}`);
  }
  getArchivePost(currentPage: any, limit: any): Observable<any> {
    return this.http.get(this.postURL + '/api/getArchivePost' + `?start=${currentPage}&limit=${limit}`);
  }
  getArchivePostBySlug(category: any, title: any): Observable<any> {
    return this.http.get(
      this.postURL +
      '/api/' +
      'getArchivePostBySlug/' +
      category +
      '/' +
      title
    )
  }


  bySlug(category: any, title: any): Observable<any> {
    return this.http.get(
      this.postURL + '/api/posts/' + category + '/' + title
    );
  }

  stateWeather(state: any): Observable<any> {
    return this.http.get(this.baseURL + `topcities?state=${state}`);
  }

  searchLocation(key: string): Observable<any> {
    return this.http.get(
      // this.baseURL+ `getlocationlist/${key}`
      this.utilityUrl + `search?search=${key}`
    );
  }

  getYoutubeVideo(limit?: any): Observable<any> {
    return this.http.get(this.postURL + `/api/videos?pagination[limit]=${limit}`)
  }

  //   getSatelliteImage(type: any): Observable<any> {
  //    return this.http.get(this.baseURL+`satellite/source?type=${type}`).pipe(
  //     timeout(3000),
  //     retryWhen(errors => 
  //       errors.pipe(
  //         delay(2000),
  //         take(5),
  //         switchMap((error, index) => {
  //           if (index < 4) {
  //             return of(error);  
  //           } else {
  //             throw error; 
  //           }
  //         })
  //       )
  //     ),
  //     catchError(error => {
  //       console.error('Request failed after 5 retries:', error);
  //       return of(null);
  //     })
  //   );

  // }
  getSatelliteImage(type: any): Promise<any> {
    return this.http.get(this.baseURL + `satellite/source?type=${type}`).toPromise();

  }
  formatDateTime(dateTimeStr: any) {
    const date = new Date(dateTimeStr && dateTimeStr.replace(' ', 'T'));
    const time = date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
    const datePart = date.toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
    return `${time}, ${datePart}`;
  }

  formatDateTrending(input: string): string {
    const date = new Date(input);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  getToOrderDate(inputDate: any) {

    const date = new Date(inputDate.replace(" ", "T"));
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const formattedDate = `${day} ${month}`;
    return formattedDate;
  }

  convertToAmPm(time24: any) {
    if (time24) {
      const [hourStr, minuteStr] = time24.split(':');
      let hour = parseInt(hourStr, 10);
      const minute = minuteStr.padStart(2, '0');
      const ampm = hour >= 12 ? 'PM' : 'AM';

      hour = hour % 12;
      hour = hour === 0 ? 12 : hour;

      return `${ampm}`;
    } else {
      return '-';
    }

  }

  onError(event: Event) {
    const element = event.target as HTMLImageElement;
    element.src = 'https://d33v4339jhl8k0.cloudfront.net/docs/assets/55843a0fe4b027e1978e93c6/images/5d3a11f92c7d3a2ec4bf6e06/file-h1Q3OCdYwG.jpg';
  }

  // bindIcon(data: any, name?: any) {
  //   return data.map((element: any) => {
  //     const timeOfDay = element?.night ? 'night' : 'day';
  //     element['iconImage'] = `img/${timeOfDay}/${element?.icon.replaceAll(" ","").toLowerCase()}.webp`
  //     name =='mobile' &&( element.mobileIcon = `assets/img/weather_icon/${element.icon.replaceAll(" ","").toLowerCase()}.webp`)
  //     return element;
  //   });
  // }

  bindIcon(data: any[], name?: any) {
    if (!Array.isArray(data)) return [];

    return data
      .filter(element => element && element.icon)
      .map((element: any) => {
        const timeOfDay = element?.night ? 'night' : 'day';

        element.iconImage = `https://skymetweather.com/img/${timeOfDay}/${element.icon.replaceAll(" ", "").toLowerCase()}.webp`;

        if (name === 'mobile') {
          element.mobileIcon = `assets/img/weather_icon/${element.icon.replaceAll(" ", "").toLowerCase()}.webp`;
        }

        return element;
      });
  }


  getGradient() {
    let item: any = [
      {
        ist: '11 PM',
        gradient: 'linear-gradient(180deg, #FFF 1.92%, #8B9FB6 23.56%, #F5FBFF 78.85%, #FFF 95.67%)'
      },
      {
        ist: '12 PM',
        gradient: 'linear-gradient(180deg, #FFFFFF 1.92%, #B0BCC9 23.56%, #F5FBFF 78.85%);'
      },
      {
        ist: '1 AM',
        gradient: 'linear-gradient(180deg, #FFF 1.92%, #8B9FB6 23.56%, #F5FBFF 78.85%, #FFF 95.67%)'
      },
      {
        ist: '2 AM',
        gradient: 'linear-gradient(180deg, #FFF 1.92%, #8B9FB6 23.56%, #F5FBFF 78.85%, #FFF 95.67%)'
      },
      {
        ist: '3 AM',
        gradient: 'linear-gradient(180deg, #FFF 1.92%, #8B9FB6 23.56%, #F5FBFF 78.85%, #FFF 95.67%)'
      },
      {
        ist: '4 AM',
        gradient: 'linear-gradient(180deg, #FFF 1.92%, #8B9FB6 23.56%, #F5FBFF 78.85%, #FFF 95.67%)'
      },
      {
        ist: '5 AM',
        gradient: 'linear-gradient(180deg, #FFFFFF 1.92%, #FFD3C3 23.56%, rgba(242, 184, 163, 0.05) 78.85%)'
      },
      {
        ist: '6 AM',
        gradient: 'linear-gradient(180deg, #FFFFFF 1.92%, #FFD3C3 23.56%, rgba(242, 184, 163, 0.05) 78.85%)'
      },
      {
        ist: '7 AM',
        gradient: 'linear-gradient(180deg, #FFFFFF 1.92%, #C9EAFF 24.04%, #F5FBFF 67.79%)'
      },
      {
        ist: '8 AM',
        gradient: 'linear-gradient(180deg, #FFFFFF 1.92%, #C9EAFF 24.04%, #F5FBFF 67.79%)'
      },
      {
        ist: '9 AM',
        gradient: 'linear-gradient(180deg, #FFFFFF 1.92%, #C9EAFF 24.04%, #F5FBFF 67.79%)'
      },
      {
        ist: '10 AM',
        gradient: 'linear-gradient(180deg, #FFFFFF 1.92%, #C9EAFF 24.04%, #F5FBFF 67.79%)'
      },
      {
        ist: '11 AM',
        gradient: 'linear-gradient(180deg, #FFFFFF 1.92%, #C9EAFF 24.04%, #F5FBFF 67.79%)'
      },
      //  {ist:'12 AM',
      //    gradient:'linear-gradient(180deg, #FFFFFF 1.92%, #FFF4C3 23.56%, #FFFCF6 78.85%)'
      // },
      {
        ist: '12 AM',
        gradient: 'linear-gradient(180deg, #FFF 1.92%, #8B9FB6 23.56%, #F5FBFF 78.85%, #FFF 95.67%)'
      },
      {
        ist: '1 PM',
        gradient: 'linear-gradient(180deg, #FFFFFF 1.92%, #FFF4C3 23.56%, #FFFCF6 78.85%)'
      },
      {
        ist: '2 PM',
        gradient: 'linear-gradient(180deg, #FFFFFF 1.92%, #FFF4C3 23.56%, #FFFCF6 78.85%)'
      },
      {
        ist: '3 PM',
        gradient: 'linear-gradient(180deg, #FFFFFF 1.92%, #FFF4C3 23.56%, #FFFCF6 78.85%)'
      },
      {
        ist: '4 PM',
        gradient: 'linear-gradient(180deg, #FFFFFF 1.92%, #FFF4C3 23.56%, #FFFCF6 78.85%)'
      },
      {
        ist: '5 PM',
        gradient: 'linear-gradient(180deg, #FFFFFF 1.92%, #FFD3C3 23.56%, rgba(242, 184, 163, 0.05) 78.85%)'
      },
      {
        ist: '6 PM',
        gradient: 'linear-gradient(180deg, #FFFFFF 1.92%, #FFD3C3 23.56%, rgba(242, 184, 163, 0.05) 78.85%)'
      },
      {
        ist: '7 PM',
        gradient: 'linear-gradient(180deg, #FFFFFF 1.92%, #94B2D6 23.56%, #F5FBFF 78.85%)'
      },
      {
        ist: '8 PM',
        gradient: 'linear-gradient(180deg, #FFFFFF 1.92%, #94B2D6 23.56%, #F5FBFF 78.85%)'
      },
      {
        ist: '9 PM',
        gradient: 'linear-gradient(180deg, #FFFFFF 1.92%, #94B2D6 23.56%, #F5FBFF 78.85%)'
      },
      {
        ist: '10 PM',
        gradient: 'linear-gradient(180deg, #FFF 1.92%, #8B9FB6 23.56%, #F5FBFF 78.85%, #FFF 95.67%)'
      }
    ];
    return item
  }

  formatDateArticleList(dateInput: any) {
    const date = new Date(dateInput);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();

    const getOrdinalSuffix = (n: any) => {
      if (n > 3 && n < 21) return 'th';
      switch (n % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
      }
    };

    return `${day}${getOrdinalSuffix(day)} ${month} ${year}`;
  }


  shareOnWhatsApp(item: any): void {
    if (this.windowService.isBrowser()) {
      const relativePath = `/content/${item.categorySlug[0]}/${item.titleSlug}`;
      const absoluteUrl = `https://www.skymetweather.com${relativePath}`;
      const encodedText = encodeURIComponent(`Check this out: ${absoluteUrl}`);
      const whatsappUrl = `https://wa.me/?text=${encodedText}`;
      window.open(whatsappUrl, '_blank');
    }
  }

  nativeShare() {
    if (this.windowService.isBrowser()) {
      console.log(this.router.url, 'sharing url in native share');

      if (navigator.share) {
        navigator.share({
          title: 'Check this out',
          url: "https://www.skymetweather.com" + this.router.url,
        }).then(() => console.log('✅ Shared!'))
          .catch(err => console.error('❌ Error sharing', err));
      } else {
        alert('Sharing not supported on this browser.');
      }
    }
  }

  getDeviceType() {
    if (this.windowService.isBrowser()) {
      var device;
      if (window.innerWidth <= 768) {
        device = 'mobile';
      } else {
        device = 'desktop';
      }
    }
    return device;
  }


  getRegistrationChallenge(userId: string, username: string) {
    return this.http.post('http://192.168.0.139:3011/auth/register-challenge', { userId, username }).toPromise();
  }

  verifyRegistration(userId: string, response: any) {
    return this.http.post('http://192.168.0.139:3011/auth/register-verify', { userId, response }).toPromise();
  }

  getLoginChallenge(userId: string) {
    return this.http.post('http://192.168.0.139:3011/auth/login-challenge', { userId }).toPromise();
  }

  verifyLogin(body: any) {
    return this.http.post('http://192.168.0.139:3011/auth/login-verify', body).toPromise();
  }

  // FIDO2 Native calls
  async registerPasskey(backendResponse: any) {
    const options: any = {
      rp: backendResponse.rp,
      user: {
        id: backendResponse.user.id,
        name: backendResponse.user.name,
        displayName: backendResponse.user.displayName,
      },
      challenge: backendResponse.challenge,
      pubKeyCredParams: backendResponse.pubKeyCredParams,
      timeout: backendResponse.timeout,
      excludeCredentials: backendResponse.excludeCredentials,
      authenticatorSelection: backendResponse.authenticatorSelection,
      attestation: backendResponse.attestation,
      extensions: backendResponse.extensions.credProps,
    };

    console.log(options, 'options in registerPasskey');

    const credential = await WebAuthn.startRegistration(options);

    return credential;
  }

  async registerLoginPasskey(backendResponse: any) {
    console.log(backendResponse, 'backendResponse in loginPasskey');

    const option: any = {
      challenge: backendResponse.challenge,
      timeout: backendResponse.timeout,
      rpId: backendResponse.rpId,
      allowCredentials: backendResponse.allowCredentials,
      userVerification: backendResponse.userVerification
    }
    const credential = await WebAuthn.startAuthentication(option);

    return credential;
  }



}
