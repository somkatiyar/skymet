import { AfterViewInit, Component, ViewEncapsulation } from '@angular/core';
import { Autoplay, Manipulation, Navigation, Pagination, Thumbs, } from 'swiper/modules';
import Swiper from 'swiper';
import { WindowService } from '../../services/window.service';
import { CommonModule } from '@angular/common';
declare var $:any;
Swiper.use([Autoplay, Navigation, Thumbs]);
@Component({
  selector: 'app-state-weather',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './state-weather.component.html',
  styleUrl: './state-weather.component.scss',
  encapsulation:ViewEncapsulation.None
})
export class StateWeatherComponent implements AfterViewInit {
  stateFilterSwiper!:Swiper;
  filterKey:any = [
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
    "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
  ]
constructor(private windowService:WindowService) {

}

ngAfterViewInit(): void {
  this.initStateFilterSwiper();
}
    initStateFilterSwiper() {
      if(this.windowService.isBrowser()) {
         if (this.stateFilterSwiper) {
          this.stateFilterSwiper.destroy(true, true);
         }
        this.stateFilterSwiper =  new Swiper(".stateFilterSwiper", {
        slidesPerView: 26,
     
      });
  }

  }
}
