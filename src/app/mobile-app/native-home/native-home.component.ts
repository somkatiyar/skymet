import { AfterViewInit, Component } from '@angular/core';
import { Autoplay, Manipulation, Navigation, Pagination, Thumbs, } from 'swiper/modules';
import Swiper from 'swiper';
import { CommonModule } from '@angular/common';
import { WindowService } from '../../services/window.service';
Swiper.use([Autoplay, Navigation, Thumbs]);
@Component({
  selector: 'app-native-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './native-home.component.html',
  styleUrl: './native-home.component.scss'
})
export class NativeHomeComponent implements AfterViewInit {
  hourlySwiper!: Swiper;
  savedLocation: any = [
    {
      locationName: '/india/uttar%20pradesh/gautam%20buddha%20nagar/saidabad%20ct',
      locationAlias: 'Home'
    },
    {
      locationName: '/india/uttar%20pradesh/kasganj/nagala%20patvariyan',
      locationAlias: 'Office'
    },
  ]
  constructor(private windowService: WindowService) { }
  ngAfterViewInit(): void {
    this.initSwiper();
  }
  initSwiper() {
    if (this.windowService.isBrowser()) {
      this.hourlySwiper && this.hourlySwiper?.destroy(true, true);
      this.hourlySwiper = new Swiper('.hourly_swiper', {
         slidesPerView: 4.5,
          spaceBetween: 10,
   
      });
    }
  }
}
