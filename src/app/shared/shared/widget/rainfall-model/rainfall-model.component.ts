import { Component } from '@angular/core';
import {
  Autoplay,
  Manipulation,
  Navigation,
  Pagination,
  Thumbs,
} from 'swiper/modules';
import Swiper from 'swiper';
import { WindowService } from '../../../../services/window.service';
declare var $: any;
Swiper.use([Autoplay, Navigation, Thumbs]);
@Component({
  selector: 'app-rainfall-model',
  standalone: true,
  imports: [],
  templateUrl: './rainfall-model.component.html',
  styleUrl: './rainfall-model.component.scss',
})
export class RainfallModelComponent {
  rainfallMainSwiper?: Swiper;
  rainfallthumbSwiper?: Swiper;

  constructor(private windowService: WindowService) {
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
        }
      }
    });

    // Main swiper
    this.rainfallMainSwiper = new Swiper('.mySwiper2', {
      spaceBetween: 10,
      autoplay: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      thumbs: {
        swiper: this.rainfallthumbSwiper,
      },
    });
  }
}

}
