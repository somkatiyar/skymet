import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { Autoplay, Navigation, Thumbs } from 'swiper/modules';
import Swiper from 'swiper';
import { DataService } from '../../../../services/data.service';
import { WindowService } from '../../../../services/window.service';
import { NavigationEnd, Router } from '@angular/router';
import { SeoService } from '../../../../services/seo.service';
declare var $: any;
Swiper.use([Autoplay, Navigation, Thumbs]);
@Component({
  selector: 'app-gallary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallary.component.html',
  styleUrl: './gallary.component.scss',
})
export class GallaryComponent implements AfterViewInit {
  patterns: WeatherPattern[] = [
    { title: 'HIMAWARI', isActive: true },
    { title: 'INSAT', isActive: false },
    { title: 'RAINFALL', isActive: false },
  ];

  rainfallImages: any = [];
  satelliteImages: any = [];
  rainfallMainSwiper: any;
  selectedLng: any;
  constructor(
    public dataService: DataService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private seoService: SeoService,
    private windowService: WindowService
  ) {
    this.dataService.selectedLanguages.subscribe((lng) => {
      this.selectedLng = lng;
    });
    this.routerConfig();
  }

  ngAfterViewInit(): void {
    this.corousalconfig();
  }

  routerConfig() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url.includes('weather-satellite-images-of-india')) {
          // this.getSatelliteImage('insat');
          this.seoService.setMetaTags('satellite', 'insat');
          this.seoService.setCanonicalLink(event.urlAfterRedirects);
          setTimeout(() => {
            this.corousalconfig();
          }, 200);
        } else if (
          event.url.includes('himawari-latest-satellite-images-of-india')
        ) {
          // this.getSatelliteImage('himawari');
          this.seoService.setMetaTags('satellite', 'himawari');
          this.seoService.setCanonicalLink(event.urlAfterRedirects);
          setTimeout(() => {
            this.corousalconfig();
          }, 200);
        } else {
          this.getRainfallImages('Rainfall');
          this.seoService.setMetaTags('satellite', 'Rainfall');
          this.seoService.setCanonicalLink(event.urlAfterRedirects);
          setTimeout(() => {
            this.corousalconfig();
          }, 200);
        }
      }
    });
  }

  corousalconfig() {
    if (this.windowService.isBrowser()) {
      const owl = $('.owl-carousel');
      owl.trigger('destroy.owl.carousel');
      owl.find('.owl-stage-outer').children().unwrap();
      $('.rainCrowsel').owlCarousel({
        loop: true,
        margin: 10,
        nav: false,
        dots: false,
        center: true,
        autoplay: false,
        autoplayTimeout: 2000,
        smartSpeed: 3000,
        autoplayHoverPause: false,
        responsive: {
          0: {
            items: 1,
          },
          600: {
            items: 1,
          },
          1000: {
            items: 1,
          },
        },
      });
    }
  }

  changeSatelliteImages(tab: any) {
    if (tab == 'himawari' || tab == 'insat') {
      if (tab == 'insat') {
        this.router.navigate(['/insat/weather-satellite-images-of-india']);
      } else {
        this.router.navigate(['/himawari-latest-satellite-images-of-india']);
      }
    } else {
      this.router.navigate(['/15-days-rainfall-forecast-for-india']);
    }
  }

  getSatelliteImage(tab: any) {
    this.dataService
      .getSatelliteImage(tab)
      .then((res) => {
        var data: any = res;
        res &&
          this.configImage(
            tab == 'himawari' ? data['images'] : data,
            tab,
            data['url']
          );
      })
      .catch((err) => [console.log('error on fetching satellite data')]);
  }
  async configImage(data: any, tab: any, ImageUrl?: any) {
    this.satelliteImages = [];
    if (tab == 'himawari') {
      data.forEach(async (el: any, index: any) => {
        var result = el.split('_')[2].split('.')[0];
        var firstPart = result.substring(0, 2);
        var secondPart = result.substring(2);
        var time = `${firstPart}:${secondPart}`;
        var imagePrefix = el.split('_')[0] + '_' + el.split('_')[1] + '_';
        var date = el.split('=')[1];
        var imageName = el;
        this.rainfallImages.push(
          //   {
          //   time: time,
          //   date: date,
          //   imagePrefix: imagePrefix,
          //   imageName:
          //     'https://www.data.jma.go.jp/mscweb/data/himawari/img/se4/' +
          //     imageName,
          //   index: index,
          // }
          'https://www.data.jma.go.jp/mscweb/data/himawari/img/se4/' + imageName
        );
      });
    }
    if (tab == 'insat') {
      data.forEach((el: any, index: any) => {
        var result = el.split('-India-')[1].split('-');
        var last = result[result.length - 1];
        this.rainfallImages.push(
          el
          //   {
          //   time: last.split('.jpg')[0],
          //   imagePrefix: '',
          //   imageName: el,
          //   index: index,
          // }
        );
      });
    }
  }
  getRainfallImages(tab: any) {
    if (tab == 'Rainfall') {
      this.rainfallImages = this.getImageUrls();
      this.cdr.detectChanges();
      this.corousalconfig();
    }
  }
  getImageUrls(days = 15) {
    const urls = [];
    const now = new Date();
    for (let i = 0; i < days; i++) {
      const folderDate = new Date(now);
      folderDate.setDate(folderDate.getDate() - 1);
      const folderDateString = folderDate
        .toISOString()
        .split('T')[0]
        .replace(/-/g, ''); // Format YYYYMMDD
      const imageDate = new Date(now);
      imageDate.setDate(imageDate.getDate() + i);
      const imageDateString = imageDate
        .toISOString()
        .split('T')[0]
        .replace(/-/g, ''); // Format YYYYMMDD
      const imageUrl = `https://www.skymetweather.com/themes/skymet/images/gfs/${folderDateString}/Rainfall_${imageDateString}.png`;
      urls.push(imageUrl);
    }
    return urls;
  }

  async initRainfallSwiper() {
    if (this.windowService.isBrowser()) {
      this.rainfallMainSwiper?.destroy(true, true);
      this.rainfallMainSwiper = new Swiper('.rainfallMain', {
        // modules: [Autoplay, Navigation, Pagination, Manipulation],
        //spaceBetween: 30,
        autoplay: false,
      });
    }
  }
}
export interface WeatherPattern {
  title: string;
  isActive: boolean;
}
