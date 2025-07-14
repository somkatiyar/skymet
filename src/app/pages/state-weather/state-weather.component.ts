import { AfterViewInit, ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { Autoplay, Manipulation, Navigation, Pagination, Thumbs, } from 'swiper/modules';
import Swiper from 'swiper';
import { WindowService } from '../../services/window.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../services/data.service';
declare var $: any;
Swiper.use([Autoplay, Navigation, Thumbs]);
@Component({
  selector: 'app-state-weather',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './state-weather.component.html',
  styleUrl: './state-weather.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class StateWeatherComponent implements AfterViewInit {
  stateFilterSwiper!: Swiper;
  stateName: any;
  topCitiesList: any;
  filterKey: any = [
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
    "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
  ]
  constructor(private windowService: WindowService, private router: Router,
    private dataService: DataService,
    private cd:ChangeDetectorRef,
    private route: ActivatedRoute) {

  }

  ngAfterViewInit(): void {
    this.initStateFilterSwiper();
      this.route.paramMap.subscribe(params => {
    const state = params.get('state');
    if (state) {
      this.stateName = state;
      this.getStateWiseList(this.stateName);
      this.cd.detectChanges();
    }
  })
  }
  initStateFilterSwiper() {
    if (this.windowService.isBrowser()) {
      if (this.stateFilterSwiper) {
        this.stateFilterSwiper.destroy(true, true);
      }
      this.stateFilterSwiper = new Swiper(".stateFilterSwiper", {
        slidesPerView: 26,
      });
    }
  }
  getStateWiseList(state: any) {
    this.dataService.stateWeather(state).subscribe(res => {
      this.topCitiesList = res && res['data'] && res['data'];
    
      var arr =  this.topCitiesList.TopCities.map((el:any) =>{
        return this.dataService.bindIcon([el.data])
      })
      arr.forEach((el:any,index:any) => {
        this.topCitiesList.TopCities[index].data = el[0];
      })
      console.log(this.topCitiesList,'this.topCitiesList');
      
      })
  }
}
