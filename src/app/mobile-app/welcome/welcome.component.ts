import { Component, OnInit } from '@angular/core';
import { WindowService } from '../../services/window.service';
import { CommonModule } from '@angular/common';
import { NativeService } from '../service/native.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DataService } from '../../services/data.service';
@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss'
})
export class WelcomeComponent implements OnInit {
  welcomeText: any = "";
  advisory: any;
  weatherData: any;
  backgroundStyle: { [key: string]: string } = {};
  constructor(private windoService: WindowService,
    private dataService: DataService,
    public nativeService: NativeService, private route: ActivatedRoute) {
 

  }

  ngOnInit(): void {
    this.getLatLng();

  }



  getLatLng() {
    this.route.queryParams.subscribe(params => {
      const lat = params['lat'];
      const lng = params['lng'];
      const isManualSearch = params['isManualSearch'] == "true" ? true : false;
      // console.log('Latitude:', lat, 'Longitude:', lng,typeof isManualSearch,'isManualSearch');
      if(lat && lng) {
         this.configForecast({ lat: lat, lng: lng },isManualSearch);
      } else {
        var loc = this.nativeService.getLocationFromDtorage();
        var manualSearch = this.nativeService.isManualSearch();
        this.configForecast({ lat: loc?.metainfo?.LATITUDE, lng: loc?.metainfo?.LONGITUDE },manualSearch);

      }

    });
  }

  async configForecast(latlng: any,isManualSearch:any) {
    let nearestMeta = await this.nearByLocation(latlng);
    let path = this.formatPath(nearestMeta);
    let forecast: any = path && await this.getForecastData(path);
    await this.setForecastData(forecast,isManualSearch);
    this.advisory = forecast && forecast?.forecast && forecast?.forecast[0];
    let actual = this.dataService.bindIcon([forecast && forecast?.actual]);
    this.weatherData = actual[0];
    console.log(this.weatherData,'weatherData');
    
  }

  async setForecastData(data: any,isManualSearch:any) {
    if (this.windoService.isBrowser()) {
      localStorage.setItem('location', JSON.stringify(data));
      localStorage.setItem('nativeConfig', JSON.stringify({isVisited:true,isManualSearch:isManualSearch}));
    }
  }
  getForecastData(path: any) {
    return new Promise((resolve, reject) => {
      this.dataService.weatherForecast(path).then(res => {
        resolve(res && res['data'] && res['data']);
      })
    })
  }

  formatPath(data: any) {
    let path = [
      data?.Country?.toLowerCase(),
      data?.State?.toLowerCase(),
      data?.District?.toLowerCase(),
      data?.Tehsil?.toLowerCase()
    ].filter(Boolean).join('/');
    return path;
  }

  async nearByLocation(obj: any) {
    return new Promise((resolve, reject) => {
      this.dataService.getNearest(obj.lat, obj.lng).subscribe((res: any) => {
        resolve(res && res.data)
      }
      );
    })
  }

  getDeviceType() {
    var device = '';
    if (window.innerWidth <= 768) {
      device = 'mobile'
    } else {
      device = 'desktop'
    }
    return 'background_banner/' + device;
  }
}
