import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import {
  Autoplay,
  Manipulation,
  Navigation,
  Pagination,
  Thumbs,
} from 'swiper/modules';
import Swiper from 'swiper';
import { WindowService } from '../../../../services/window.service';
import { CommonModule, Location } from '@angular/common';
import { DataService } from '../../../../services/data.service';
import { SeoService } from '../../../../services/seo.service';
import { WeatherNewsComponent } from '../../../../pages/weather-news/weather-news.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AdsenseDirective } from '../../directive/ads.directive';
import { NativeService } from '../../../../mobile-app/service/native.service';
import { Router } from '@angular/router';
declare var $: any;
Swiper.use([Autoplay, Navigation, Thumbs]);
@Component({
  selector: 'app-rainfall-model',
  standalone: true,
  imports: [CommonModule, WeatherNewsComponent, TranslateModule, AdsenseDirective ],
  templateUrl: './rainfall-model.component.html',
  styleUrl: './rainfall-model.component.scss',
})
export class RainfallModelComponent implements AfterViewInit {
  rainfallMainSwiper?: Swiper;
  rainfallthumbSwiper?: Swiper;
  rainfallMainSwiperFullScreen?: Swiper;
  activeIndex: number = 0;
  modelData: any = [
    {
      id: 1,
      title: 'Rainfall',
      imageUrl: './model_forecast/15_rainfall.png',
    },
    {
      id: 2,
      title: 'Rainfall',
      imageUrl: './model_forecast/15_rainfall.png',
    },
    {
      id: 3,
      title: 'Rainfall',
      imageUrl: './model_forecast/15_rainfall.png',
    },
    {
      id: 4,
      title: 'Rainfall',
      imageUrl: './model_forecast/15_rainfall.png',
    },
    {
      id: 5,
      title: 'Rainfall',
      imageUrl: './model_forecast/15_rainfall.png',
    },
    {
      id: 6,
      title: 'Rainfall',
      imageUrl: './model_forecast/15_rainfall.png',
    },
    {
      id: 7,
      title: 'Rainfall',
      imageUrl: './model_forecast/15_rainfall.png',
    },
    {
      id: 8,
      title: 'Rainfall',
      imageUrl: './model_forecast/15_rainfall.png',
    },
    {
      id: 9,
      title: 'Rainfall',
      imageUrl: './model_forecast/15_rainfall.png',
    },
    {
      id: 10,
      title: 'Rainfall',
      imageUrl: './model_forecast/15_rainfall.png',
    },
    {
      id: 11,
      title: 'Rainfall',
      imageUrl: './model_forecast/15_rainfall.png',
    },
    {
      id: 12,
      title: 'Rainfall',
      imageUrl: './model_forecast/15_rainfall.png',
    },
    {
      id: 13,
      title: 'Rainfall',
      imageUrl: './model_forecast/15_rainfall.png',
    },
    {
      id: 14,
      title: 'Rainfall',
      imageUrl: './model_forecast/15_rainfall.png',
    },
    {
      id: 15,
      title: 'Rainfall',
      imageUrl: './model_forecast/15_rainfall.png',
    },
    {
      id: 16,
      title: 'Rainfall',
      imageUrl: './model_forecast/15_rainfall.png',
    },
    {
      id: 17,
      title: 'Rainfall',
      imageUrl: './model_forecast/15_rainfall.png',
    },
    {
      id: 18,
      title: 'Rainfall',
      imageUrl: './model_forecast/15_rainfall.png',
    },
    {
      id: 19,
      title: 'Rainfall',
      imageUrl: './model_forecast/15_rainfall.png',
    },
    {
      id: 20,
      title: 'Rainfall',
      imageUrl: './model_forecast/15_rainfall.png',
    },
    {
      id: 21,
      title: 'Rainfall',
      imageUrl: './model_forecast/15_rainfall.png',
    },
    {
      id: 22,
      title: 'Rainfall',
      imageUrl: './model_forecast/15_rainfall.png',
    },
    {
      id: 23,
      title: 'temperature',
      imageUrl: './model_forecast/15_temp.png',
    },
    {
      id: 24,
      title: 'temperature',
      imageUrl: './model_forecast/15_temp.png',
    },
    {
      id: 11,
      title: 'winds',
      imageUrl: './model_forecast/15_winds.png',
    },
    {
      id: 12,
      title: 'winds',
      imageUrl: './model_forecast/15_winds.png',
    },
  ];
  filteredModelData: any = [];
  selectedTab: string = 'rainfall';
  viewType: any = 'swiper';

  weatherNewsHeaderConfig: any = {
    title: "Suggested Resources",
    isLanguagesSelecter: false,
    isFooterView: true,
    isHeaderView: false
  }
  dateRange: any = [];
  isFullScreen: boolean = false;
  constructor(private windowService: WindowService,
    private seoService: SeoService,
    private translateService: TranslateService,
    private location: Location,
    public nativeService: NativeService,
    private router: Router,
    public dataService: DataService) {
    this.dataService.selectedLanguages.subscribe(lng => {
      this.translateService.use(lng);
    });
    //  this.filteredModelData = this.getMoodelData('Rainfall');
    this.filteredModelData = this.getImageUrls(16, 'Rainfall_', 'Rain');

    this.filteredModelData && this.filteredModelData[0] && this.setRange();

  }

  setRange() {
    this.dateRange[0] = this.filteredModelData[0].date;
    this.dateRange[1] = this.filteredModelData[this.filteredModelData.length - 1].date;
  }

  getMoodelData(modelType: string) {
    return this.modelData.filter((model: any) => {
      if (model.title.toLowerCase() === modelType.toLowerCase()) {
        return model;
      }
    })
  }

  getImageUrls(days: any, fileName: any, weatherParam: any) {
    const urls = [];
    const now = new Date();
    for (let i = 0; i < days; i++) {
      const folderDate = new Date(now);
      folderDate.setDate(folderDate.getDate() - 1);
      const folderDateString = folderDate.toISOString().split('T')[0].replace(/-/g, '');
      const imageDate = new Date(now);
      imageDate.setDate(imageDate.getDate() + i - 1);
      const imageDateString = imageDate.toISOString().split('T')[0].replace(/-/g, '');
      const imageUrl = `https://www.skymetweather.com/themes/skymet/images/gfs/new/${folderDateString}/${weatherParam}/daily/${fileName}${imageDateString}.png`;
      urls.push(this.formatForecastMapDate(imageUrl, fileName));
    }
    return urls.slice(1);
  }

  formatForecastMapDate(el: string, fileName: any) {
    var dt = "";
    if (fileName == "Rainfall_") {
      dt = el.split('_')[1].split('.')[0];
    } else if (fileName == "daily_temp_india_") {
      dt = el.split('daily_temp_india_')[1].split('.')[0];

    }
    var timeSpan = dt;
    const year = parseInt(timeSpan.substring(0, 4), 10);
    const month = parseInt(timeSpan.substring(4, 6), 10) - 1;
    const day = parseInt(timeSpan.substring(6, 8), 10);
    const dateObj = new Date(year, month, day);
    const formattedDate = dateObj.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
    return {
      url: el,
      date: formattedDate,
    }


  }

  onTabChange(tab: any, fileName: any, param: any) {
    if (this.windowService.isBrowser()) {
      this.filteredModelData = tab == 'winds' ? this.generateImageWinds() : this.getImageUrls(16, fileName, param);
      this.filteredModelData && this.filteredModelData[0] && this.setRange();
      this.selectedTab = tab.toLowerCase();
      setTimeout(() => {
        this.initRainfallSwiper();
      }, 50);
    }

    tab == 'rainfall' && this.seoService.setMetaTags('satellite', 'Rainfall');
    tab == 'temperature' && this.seoService.setMetaTags('satellite', 'temperature');
    tab == 'winds' && this.seoService.setMetaTags('satellite', 'winds');
    this.seoService.setSchema('satellite');
    this.refreshUrl(tab);
  }


  refreshUrl(tab: any) {
    if (tab == 'rainfall') {
      this.location.replaceState(
        `15-days-rainfall-forecast-for-india`
      );

    } else if (tab == 'temperature') {
      this.location.replaceState(
        `15-days-temperature-forecast-for-india`
      );
    } else if (tab == 'winds') {
      this.location.replaceState(
        `24-hours-winds-forecast-for-india`
      );
    }
  }

  generateImageWinds() {
    var imageUrl = "https://www.skymetweather.com/themes/skymet/images/gfs/new/";
    const now = new Date();
    const folderDate = new Date(now);
    folderDate.setDate(folderDate.getDate());
    const pickUpFolder:any = new Date(now);
    pickUpFolder.setDate(pickUpFolder.getDate()-1);
    const pickUpfolderString = pickUpFolder.toISOString().split('T')[0].replace(/-/g, '');
    const folderDateString = folderDate.toISOString().split('T')[0].replace(/-/g, '');
    const datePart = `frame_${folderDateString}_`;
        

    // const datePart = 'frame_20250724_';
    const imageObjects = [];
    for (let hour = 0; hour < 24; hour++) {
      const hourStr = String(hour).padStart(2, '0');
      const date = `${hourStr}:00`;
      const url = `${imageUrl}${pickUpfolderString}/Wind/${folderDateString}/${datePart}${date}:00.png`;
      imageObjects.push({ url, date });
    }
    return imageObjects;
  }







  ngAfterViewInit(): void {
    this.initRainfallSwiper();
    this.initfullScreenSwiper();
    this.seoService.setMetaTags('satellite', 'Rainfall');
    this.seoService.setSchema('satellite');
  }



  initRainfallSwiper() {
    if (this.windowService.isBrowser()) {
      this.rainfallMainSwiper?.destroy(true, true);
      this.rainfallthumbSwiper?.destroy(true, true);
      this.rainfallthumbSwiper = new Swiper('.mySwiper', {
        //loop: true,
        //spaceBetween: 10,
        slidesPerView: 4,
        freeMode: true,
        autoplay: false,
        breakpoints: {
          1024: {
            slidesPerView: 13,
          }
        },
        watchSlidesProgress: true,
        on: {
          slideChange: (event) => {
            this.activeIndex = event.activeIndex;

          }
        }

      });


      this.rainfallMainSwiper = new Swiper('.mySwiper2', {
        // loop: true,
        autoplay: false,
        // spaceBetween: 10,
        breakpoints: {
          1024: {
            slidesPerView: 2,
          }
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        on: {
          slideChange: (event) => {
            this.activeIndex = event.activeIndex;


          }
        },
        thumbs: {
          swiper: this.rainfallthumbSwiper,
        },
      });
    }
  }
  initfullScreenSwiper() {
    if (this.windowService.isBrowser()) {
      this.rainfallMainSwiperFullScreen?.destroy(true, true);


      this.rainfallMainSwiperFullScreen = new Swiper('.fullscreenSwiper', {
        // loop: true,
        autoplay: false,
        // spaceBetween: 10,
        breakpoints: {
          1024: {
            slidesPerView: 1,
          }
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        on: {
          slideChange: (event) => {
            this.activeIndex = event.activeIndex;


          }
        }
      });
    }
  }

  hoveredIndex: number | null = 1;

  showOverlay(index: number): void {

    this.hoveredIndex = index;
    this.rainfallMainSwiper?.autoplay.stop();
    this.rainfallthumbSwiper?.autoplay.stop();


  }

  hideOverlay(): void {

    this.hoveredIndex = null;
    this.rainfallMainSwiper?.autoplay.start();
    this.rainfallthumbSwiper?.autoplay.start();


  }

  @ViewChild('fullscreenEl', { static: false }) fullscreenEl!: ElementRef<HTMLElement>;
  @HostListener('document:fullscreenchange', ['$event'])
  onFullscreenChange(event: Event) {
    if (this.windowService.isBrowser()) {
      if (document.fullscreenElement) {
        this.isFullScreen = true;

        console.log('Entered fullscreen:');
      } else {
        // this.initRainfallSwiper();
        this.isFullScreen = false;
        this.rainfallMainSwiper?.slideTo(this.activeIndex);
        console.log('Exited fullscreen');

      }
    }

  }

  goBack() {
    if (this.windowService.isBrowser()) {
      if (document.fullscreenElement) {
        this.isFullScreen = false;
        document.exitFullscreen();
      }
    }

  }
  openFullscreen(index?: number): void {
    if (this.windowService.isBrowser()) {

      if (!document.fullscreenElement) {
        this.rainfallMainSwiperFullScreen?.slideTo(index || 0);
        this.fullscreenEl.nativeElement.requestFullscreen();
        this.windowService.isFullScreen.next(true)
      } else {
        document.exitFullscreen();
        this.windowService.isFullScreen.next(false)
      }
    }
  }

  fullScreenImage(index?: number): void {
    if (this.windowService.isBrowser()) {
      const elem = document.getElementById('main' + index) as HTMLElement;

      if (elem) {
        if (elem.requestFullscreen) {
          elem.requestFullscreen();
        } else if ((elem as any).webkitRequestFullscreen) {
          (elem as any).webkitRequestFullscreen(); // Safari
        } else if ((elem as any).msRequestFullscreen) {
          (elem as any).msRequestFullscreen(); // IE11
        }
      } else {
        console.warn('Element not found for fullscreen:', 'main' + index);
      }
    }
  }

  whatsappImageShare(index?: number): void {
    if (this.windowService.isBrowser()) {
      let imageUrl: string | undefined;
      imageUrl = this.filteredModelData[index ? index : this.activeIndex]?.url;
      let date = this.filteredModelData[index ? index : this.activeIndex]?.date;
      var fullUrl = "https://www.skymetweather.com" + this.router.url;
      if (!imageUrl) {
        alert('No image found to share.');
        return;
      } else {
        const message = encodeURIComponent(`Check the ${this.selectedTab} forecast for ${date}.Click on the link ${fullUrl} to check more details- Team Skymet`);
        const whatsappUrl = `https://wa.me/?text=${message}`;
        window.open(whatsappUrl, '_blank');
      }
    }
  }

  selectedImages: string[] = [];

  toggleImageSelection(index: number): void {
    if (this.windowService.isBrowser()) {
      this.openFullscreen(index)
    }


  }

  isSelected(url: string): boolean {
    return this.selectedImages.includes(url);
  }



  async shareUrl() {
    if (this.windowService.isBrowser()) {
      const urls =  "https://www.skymetweather.com" + this.router.url;
      if (!urls.length) {
        alert('No images selected.');
        return;
      } else {
        const message = encodeURIComponent(`Check the ${this.selectedTab} forecast from ${this.dateRange[0]} to ${this.dateRange[1]}.Click on the link ${urls} to check more details- Team Skymet`);
        const whatsappUrl = `https://wa.me/?text=${message}`;
        window.open(whatsappUrl, '_blank');
      }
    }
  }
  scale = 1;
  zoomIn() {
    if (this.windowService.isBrowser()) {

      this.rainfallMainSwiper?.autoplay.stop();
      this.rainfallthumbSwiper?.autoplay.stop();
      const img = document.getElementById('main' + this.activeIndex) as HTMLElement;
      this.scale += 0.1;
      img.style.transform = `scale(${this.scale})`;
    }

  }

  zoomOut() {
    if (this.windowService.isBrowser()) {
      const img = document.getElementById('main' + this.activeIndex) as HTMLElement;
      this.rainfallMainSwiper?.autoplay.stop();
      this.rainfallthumbSwiper?.autoplay.stop();
      this.scale = Math.max(0.1, this.scale - 0.1);
      img.style.transform = `scale(${this.scale})`;
    }
  }

  refreshTab() {
    if (this.windowService.isBrowser()) {
      if (this.viewType === 'swiper') {
        setTimeout(() => {
          this.initRainfallSwiper();
        }, 50);
      }
    }
  }
  toggleFullscreen(element: HTMLElement) {
    if (this.windowService.isBrowser()) {
      if (!document.fullscreenElement) {
        element.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    }
  }
}
