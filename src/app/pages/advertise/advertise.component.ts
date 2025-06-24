import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import Swiper from 'swiper';
import { WindowService } from '../../services/window.service';

@Component({
  selector: 'app-advertise',
  standalone: true,
  imports: [],
  templateUrl: './advertise.component.html',
  styleUrl: './advertise.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdvertiseComponent {
  constructor(private windowService: WindowService) {}
  swiper: Swiper | undefined;

  ngAfterViewInit(): void {
    if(this.windowService.isBrowser()) {
      this.initializeSwiper();
    }
  }

  initializeSwiper(): void {
    this.swiper = new Swiper('.swiper', {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      }
    });
  }
}
