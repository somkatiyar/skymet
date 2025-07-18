import { AfterViewInit, Component } from '@angular/core';
import {
  Autoplay,
  Manipulation,
  Navigation,
  Pagination,
  Thumbs,
} from 'swiper/modules';
import Swiper from 'swiper';
import { WindowService } from '../../../../services/window.service';
import { CommonModule } from '@angular/common';
import { DataService } from '../../../../services/data.service';
declare var $: any;
Swiper.use([Autoplay, Navigation, Thumbs]);
@Component({
  selector: 'app-rainfall-model',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rainfall-model.component.html',
  styleUrl: './rainfall-model.component.scss',
})
export class RainfallModelComponent implements AfterViewInit {
  rainfallMainSwiper?: Swiper;
  rainfallthumbSwiper?: Swiper;
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
      title: 'temperature',
      imageUrl: './model_forecast/15_temp.png',
    },
    {
      id: 10,
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
  constructor(private windowService: WindowService,public dataService:DataService) {
    this.filteredModelData = this.getMoodelData('rainfall');

  }

  getMoodelData(modelType: string) {
    return this.modelData.filter((model: any) => {
      if (model.title.toLowerCase() === modelType.toLowerCase()) {
        return model;
      }
    })
  }

  onTabChange(tab: any) {
    this.filteredModelData = this.getMoodelData(tab.toLowerCase());
    this.selectedTab = tab.toLowerCase();
    this.initRainfallSwiper();
  }

  ngAfterViewInit(): void {
    this.initRainfallSwiper();
  }



  async initRainfallSwiper() {
    if (this.windowService.isBrowser()) {
      this.rainfallMainSwiper?.destroy(true, true);
      this.rainfallthumbSwiper?.destroy(true, true);

      // Responsive thumbnail swiper
      this.rainfallthumbSwiper = new Swiper('.mySwiper', {
        slidesPerView: 13, // Default for large screens
        spaceBetween: 0,
        freeMode: true,
        watchSlidesProgress: true,
        autoplay: false,

        breakpoints: {
          // When window width is <= 550px
          0: {
          slidesPerGroup: 1,
          slidesPerView: 13,
          },
          551: {
            slidesPerView: 13,
          },
          1024: {

          slidesPerGroup: 2,
          slidesPerView: 13,
          }
        },
        on:{
          slideChange: (event) => {
            this.activeIndex = event.activeIndex;
           
          }
        }

      });

      // Main swiper
      this.rainfallMainSwiper = new Swiper('.mySwiper2', {
        spaceBetween: 10,
        slidesPerView:1,
        autoplay: false,
          breakpoints: {
          // When window width is <= 550px
          0: {
            slidesPerView: 1,
            slidesPerGroup: 1,
          },
          551: {
            slidesPerView: 13,
          },
          1024: {
            slidesPerView: 2,
            slidesPerGroup: 2,
    
          }
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        on: {
          slideChange: (event) => {
            this.activeIndex = event.activeIndex;
            console.log(this.activeIndex, 'this.activeIndex');

          }
        },
        thumbs: {
          swiper: this.rainfallthumbSwiper,
        },
      });
    }
  }

hoveredIndex: number | null = 1;

showOverlay(index: number): void {
  this.hoveredIndex = index;
}

hideOverlay(): void {
  this.hoveredIndex = null;
}

fullScreenImage(index: number, ImageUrl: string): void {
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

  whatsappImageShare(imageUrl: string): void {
    if (!this.windowService.isBrowser()) return;

    if (!imageUrl) {
      alert('No image found to share.');
      return;
    }

    // Just open WhatsApp link with image URL
    const message = encodeURIComponent(`Check this satellite image: ${imageUrl}`);
    const whatsappUrl = `https://wa.me/?text=${message}`;
    window.open(whatsappUrl, '_blank');
  }



}
