import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { Autoplay, Manipulation, Navigation, Pagination, Thumbs, } from 'swiper/modules';
import Swiper from 'swiper';
import { WindowService } from '../../services/window.service';
import { DataService } from '../../services/data.service';
import { forkJoin } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-resources',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resources.component.html',
  styleUrl: './resources.component.scss'
})
export class ResourcesComponent implements AfterViewInit {
  @ViewChild('videosSwiperContainer') videosSwiperContainer!: ElementRef;

  resourcesSwiper!: Swiper;
  topchannel!: Swiper;
  weatherNewsSwiper!: any;
  climateNewsSwiper!: any;
  ytSwiper!: any;
  allArticles: any;
  weatherNewsList:any;
  climateChangeList:any;
  videos: any;
  url!: SafeResourceUrl;
  constructor(private windowService: WindowService,
    private sanitizer: DomSanitizer,
    private cdRef: ChangeDetectorRef,
    public dataService: DataService) {

  }

  ngAfterViewInit(): void {
    this.initSwiper();
    this.top_channelInit();
    this.getArticles();
    this.getVideos();
    this.weatherNewsSwiperInit();
    this.climateNewsSwiperInit();
    this.videosSwiper();
    this.cdRef.detectChanges();

  }

  getVideos() {
    this.dataService.getYoutubeVideo(9).subscribe(res => {
      if (res && res['data']) {
        this.videos = res['data'].map((item: any) => {
          const attrs = item.attributes;
          return {
            ...attrs,
            id: item.id,
            safeUrl: this.sanitizer.bypassSecurityTrustResourceUrl(attrs.link)
          };
        });
        console.log(this.videos);

      }
    });
  }

  getArticles() {
    forkJoin({
      trending: this.dataService.getTrendingNews('Climate-Change', 1, 5),
      weather: this.dataService.weatherNews('weather-news-and-analysis', 1, 4)
    }).subscribe(({ trending, weather }) => {
      this.allArticles = [...trending, ...weather];
      this.weatherNewsList = weather;
      this.climateChangeList = trending;
      console.log('Combined Articles:', this.allArticles);
    });
  }


  initSwiper() {
    if (this.windowService.isBrowser()) {
      if (this.resourcesSwiper) {
        this.resourcesSwiper.destroy(true, true);
      }
      this.resourcesSwiper = new Swiper(".resourcesSwiper", {
        autoplay: false,
        effect: "fade",
        slidesPerView: 1,
          pagination: {
         el: ".swiper-pagination",
      },
      });
    }

  }
  top_channelInit() {
    if (this.windowService.isBrowser()) {
      if (this.topchannel) {
        this.topchannel.destroy(true, true);
      }
      this.topchannel = new Swiper('.channel', {
        slidesPerView: 7,
        spaceBetween: 0,
        breakpoints: {
          0: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 5,
          },

          1024: {
            slidesPerView: 7,

          },
          1025: {
            slidesPerView: 8,

          }
        }
      });
    }

  }
  weatherNewsSwiperInit() {
    if (this.windowService.isBrowser()) {
      if (this.weatherNewsSwiper) {
        this.weatherNewsSwiper.destroy(true, true);
      }
      this.weatherNewsSwiper = new Swiper('.weatherNewsSwiper', {
        slidesPerView: 7,
        spaceBetween: 0,
        breakpoints: {
          0: {
            slidesPerView: 1.3,
            spaceBetween: 5,
          },
          768: {
            slidesPerView: 5,
          },

          1024: {
            slidesPerView: 7,

          },
          1025: {
            slidesPerView: 3,
            spaceBetween: 5,

          }
        }
      });
    }
  }

    climateNewsSwiperInit() {
    if (this.windowService.isBrowser()) {
      if (this.climateNewsSwiper) {
        this.climateNewsSwiper.destroy(true, true);
      }
      this.climateNewsSwiper = new Swiper('.climateChange', {
        slidesPerView: 7,
        spaceBetween: 0,
        breakpoints: {
          0: {
            slidesPerView: 1.3,
            spaceBetween: 5,
          },
          768: {
            slidesPerView: 5,
          },

          1024: {
            slidesPerView: 7,

          },
          1025: {
            slidesPerView: 3,
            spaceBetween: 5,

          }
        }
      });
    }
  }
  videosSwiper() {
      if (this.windowService.isBrowser() && this.videosSwiperContainer?.nativeElement) {

      if (this.ytSwiper) {
        this.ytSwiper.destroy(true, true);
      }
      this.ytSwiper = new Swiper(this.videosSwiperContainer.nativeElement, {
        slidesPerView: 7,
        spaceBetween: 0,
        breakpoints: {
          0: {
            slidesPerView: 1.3,
            spaceBetween: 5,
          },
          768: {
            slidesPerView: 5,
          },

          1024: {
            slidesPerView: 7,

          },
          1025: {
            slidesPerView: 3,
            spaceBetween: 5,

          }
        }
      });
    }
  }
}

