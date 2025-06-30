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
      title: 'temperature',
      imageUrl: './model_forecast/15_temp.png',
    },
    {
      id: 4,
      title: 'temperature',
      imageUrl: './model_forecast/15_temp.png',
    },
    {
      id: 5,
      title: 'winds',
      imageUrl: './model_forecast/15_winds.png',
    },
    {
      id: 6,
      title: 'winds',
      imageUrl: './model_forecast/15_winds.png',
    },
  ];
  filteredModelData: any = [];
  selectedTab: string = 'rainfall';
  constructor(private windowService: WindowService) {
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
            slidesPerView: 4,
          },
          551: {
            slidesPerView: 13,
          },
          1024: {
            slidesPerView: 3,
          }
        },

      });

      // Main swiper
      this.rainfallMainSwiper = new Swiper('.mySwiper2', {
        spaceBetween: 10,
        slidesPerView:2,
        autoplay: false,
          breakpoints: {
          // When window width is <= 550px
          0: {
            slidesPerView: 4,
          },
          551: {
            slidesPerView: 13,
          },
          1024: {
            slidesPerView: 3,
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

}
