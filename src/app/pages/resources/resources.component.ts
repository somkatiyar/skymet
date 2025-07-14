import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';

import Swiper from 'swiper';
import { WindowService } from '../../services/window.service';
import { DataService } from '../../services/data.service';
import { forkJoin } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
@Component({
  selector: 'app-resources',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './resources.component.html',
  styleUrl: './resources.component.scss',
})
export class ResourcesComponent implements AfterViewInit {
  @ViewChild('videosSwiperContainer') videosSwiperContainer!: ElementRef;

  resourcesSwiper!: Swiper;
  topchannel!: Swiper;
  weatherNewsSwiper!: any;
  climateNewsSwiper!: any;
  monsoonNewsSwiper!: any;
  ytSwiper!: any;
  allArticles: any;
  weatherNewsList: any;
  climateChangeList: any;
  monsoonUpdateList:any;
  videos: any;
  url!: SafeResourceUrl;
  activeIndex: any = 0;
  allNews:any;
  postLimit:any = 9;
  filters = [
  { filterkey: "All News", role: null ,sr_no:1,slug:'all'},
  { filterkey: "Weather News", role: null,sr_no:2,slug:'weather-news-and-analysis' },
  { filterkey: "Climate change", role: null,sr_no:3,slug:'climate-change' },
  { filterkey: "La nina", role: null ,sr_no:4,slug:'la-nina'},
  { filterkey: "Monsoon Update", role: null,sr_no:5,slug:'monsoon-update' },
  { filterkey: "Astronomy", role: null ,sr_no:6,slug:'weather-news-and-analysis'},
  { filterkey: "Mumbai", role: null,sr_no:7,slug:'weather-news-and-analysis' },
  { filterkey: "Delhi", role: null,sr_no:8,slug:'weather-news-and-analysis' },
  { filterkey: "Rainfall", role: null,sr_no:9 ,slug:'weather-news-and-analysis'},
  { filterkey: "Eastern India", role: null,sr_no:10,slug:'weather-news-and-analysis' }
];
selectedFilter:any = 1;
  constructor(
    private windowService: WindowService,
    private sanitizer: DomSanitizer,
    private cdRef: ChangeDetectorRef,
    public dataService: DataService,
    private router:Router
  ) {}

  ngAfterViewInit(): void {
    this.initBannerSwiper();
    this.top_channelInit();
    this.getArticles();
    this.allPost(1,this.postLimit);
    this.getVideos();
    this.weatherNewsSwiperInit();
    this.climateNewsSwiperInit();
    this.monsoonUpdateSwiperInit();
    this.videosSwiper();
    this.cdRef.detectChanges();
  }

  allPost(currentPage:any,limit:any) {
    this.dataService.allPost(currentPage,limit).subscribe(res => {
      this.allNews = res;
    })
  }

  filterNews(category:any) {
    this.dataService.getTrendingNews(category, 1,this.postLimit).subscribe(res => {
      this.allNews = res;
    })
  }

newsText() {
  const selected = this.filters.find(e => e.sr_no === this.selectedFilter);
  return selected ? selected?.filterkey : '';
}

  handlePostClick() {
  if (this.dataService.getDeviceType() === 'desktop') {
    this.allPost(1, this.postLimit + 3);
    this.postLimit += 3;
  } else {
    this.goToViewPage();
  }
}

  goToViewPage() {
    this.router.navigate(['news-list',this.filters.find(e => e.sr_no === this.selectedFilter)?.slug]);
  }

  getVideos() {
    this.dataService.getYoutubeVideo(9).subscribe((res) => {
      if (res && res['data']) {
        this.videos = res['data'].map((item: any) => {
          const attrs = item.attributes;
          return {
            ...attrs,
            id: item.id,
            safeUrl: this.sanitizer.bypassSecurityTrustResourceUrl(attrs.link),
          };
        });
      }
    });
  }

  getArticles() {
    forkJoin({
      trending: this.dataService.getTrendingNews('Climate-Change', 1, 5),
      weather: this.dataService.weatherNews('weather-news-and-analysis', 1, 5),
      monsoon: this.dataService.weatherNews('monsoon-update', 1, 5),
    }).subscribe(({ trending, weather,monsoon }) => {
      this.allArticles = [...trending, ...weather];      
      this.weatherNewsList = weather;
      this.climateChangeList = trending;
      this.monsoonUpdateList = monsoon;
    });
  }

  initBannerSwiper() {
    if (this.windowService.isBrowser()) {
      if (this.resourcesSwiper) {
        this.resourcesSwiper.destroy(true, true);
      }
      this.resourcesSwiper = new Swiper('.resourcesSwiper', {
        autoplay: true,
        effect: 'fade',
        slidesPerView: 1,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        on: {
          slideChange: () => {
            this.activeIndex = this.resourcesSwiper?.activeIndex ?? 0;
            

          }
        }
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
          },
        },
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
            slidesPerView: 2,
          },

          1024: {
            slidesPerView: 3,
            spaceBetween: 25
          },
          // 1025: {
          //   slidesPerView: 3,
          //   spaceBetween: 5,
          // },
        },
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
            slidesPerView: 2,
          },

          1024: {
            slidesPerView: 3,
            spaceBetween: 25

          },
        },
      });
    }
  }

  monsoonUpdateSwiperInit() {
    if (this.windowService.isBrowser()) {
      if (this.monsoonNewsSwiper) {
        this.monsoonNewsSwiper.destroy(true, true);
      }
      this.monsoonNewsSwiper = new Swiper('.monsoonUpdate', {
        slidesPerView: 7,
        spaceBetween: 0,
        breakpoints: {
          0: {
            slidesPerView: 1.3,
            spaceBetween: 5,
          },
          768: {
            slidesPerView: 2,
          },

          1024: {
            slidesPerView: 3,
            spaceBetween: 25

          },
        },
      });
    }
  }
  videosSwiper() {
    if (
      this.windowService.isBrowser() &&
      this.videosSwiperContainer?.nativeElement
    ) {
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
            slidesPerView: 2,
          },

          1024: {
          slidesPerView: 3,
            spaceBetween: 25
          },
          // 1025: {
          //   slidesPerView: 3,
          //   spaceBetween: 5,
          // },
        },
      });
    }
  }

  getPreviewText(str: any, maxWords: any, maxChars: any) {
    const words = str.split(' ');
    let result = '';

    for (let i = 0; i < words.length && i < maxWords; i++) {
      const nextWord = result ? result + ' ' + words[i] : words[i];
      if (nextWord.length <= maxChars) {
        result = nextWord;
      } else {
        break;
      }
    }

    return result;
  }

   shareOnWhatsApp(item: any): void {
    const relativePath = `/content/${item.categorySlug[0]}/${item.titleSlug}`;
    const absoluteUrl = `${window.location.origin}${relativePath}`;
    const encodedText = encodeURIComponent(`Check this out: ${absoluteUrl}`);
    const whatsappUrl = `https://wa.me/?text=${encodedText}`;
    window.open(whatsappUrl, '_blank');
  }
}
