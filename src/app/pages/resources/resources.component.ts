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
import { SeoService } from '../../services/seo.service';
import { TranslateService } from '@ngx-translate/core';
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
  { filterkey: "All News", role: null ,sr_no:1,slug:'all',icon:'./img/article_filter/weather.webp'},
  { filterkey: "Weather News", role: null,sr_no:2,slug:'weather-news-and-analysis', icon:'./img/article_filter/weather.webp'},
  { filterkey: "Climate change", role: null,sr_no:3,slug:'climate-change', icon:'./img/article_filter/climate.webp'},
  { filterkey: "La nina", role: null ,sr_no:4,slug:'la-nina', icon:'./img/article_filter/lanina.webp'},
  { filterkey: "Monsoon Update", role: null,sr_no:5,slug:'monsoon-update', icon:'./img/article_filter/monsoon.webp'},
  // { filterkey: "Astronomy", role: null ,sr_no:6,slug:'weather-news-and-analysis', icon:'./img/article_filter/astronomy.webp'},
  // { filterkey: "Mumbai", role: null,sr_no:7,slug:'weather-news-and-analysis', icon:'./img/article_filter/mumbai.webp'},
  // { filterkey: "Delhi", role: null,sr_no:8,slug:'weather-news-and-analysis', icon:'./img/article_filter/delhi.webp'},
  // { filterkey: "Rainfall", role: null,sr_no:9 ,slug:'weather-news-and-analysis', icon:'./img/article_filter/rainfall.webp'},
  // { filterkey: "Eastern India", role: null,sr_no:10,slug:'weather-news-and-analysis', icon:'./img/article_filter/eastern-india.webp'}
];
selectedFilter:any = 1;
selectedLng:any;

sliderArticles=[
  {category:'la-nina',slug:"nino-indices-indian-ocean-dipole-mjo-enso-neutral-la-nina-indian-monsoon-forecast-2025-rainfall-impact-on-agriculture"},
  {category:'climate-change',slug:"cloudburst-glacier-collapse-in-kullu-shimla-lahaul-spiti-uttarkashi-arakot-nainital-himalayas-know-why-extreme-rainfall-climate-change-and-disaster-risk-is-affecting-jammu-kashmir-himachal-pradesh-and-uttarakhand "},
  {category:'climate-change',slug:"sheltering-stray-dogs-in-india-extreme-weather-impact-heatwave-cold-wave-monsoon-deaths-animal-shelters-neuter-vaccinate-release-rabies-prevention-public-safety "},
  {category:'climate-change',slug:"why-despite-climate-risks-jks-orchard-farmers-are-still-excluded-from-pmfby "},
  {category:'climate-change',slug:"india-summer-tourism-climate-change-impact-coastal-erosion-heatwaves-hill-station-floods-resilient-travel-planning"},
  {category:'climate-change',slug:"india-us-trade-deal-agriculture-concerns-climate-impact-farmer-livelihoods-food-security-biosafety-risks"},
  {category:'climate-change',slug:"ai-in-agriculture-bridging-yield-gap-smart-farming-india-2025"},
  {category:'monsoon-update',slug:"mumbai-water-supply-future-beyond-monsoon-dependence-rainfall-catchment-lakes-conservation-urban-planning "},
  {category:'climate-change',slug:"is-the-global-mean-temperature-rise-still-the-right-lens-to-view-the-climate-crisis"},
  {category:'climate-change',slug:"moon-phases-explained-impact-on-weather-climate-truths-and-tracking-from-india "},
]
  constructor(
    private windowService: WindowService,
    private sanitizer: DomSanitizer,
    private cdRef: ChangeDetectorRef,
    public dataService: DataService,
    private router:Router,
    private seoService:SeoService,
    private translateService:TranslateService
  ) {
       this.dataService.selectedLanguages.subscribe((lng: any) => {
      this.translateService.use(lng)
      this.selectedLng = lng;
    });
  }

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
  getPostBySlug(category:any,title:any) {
    this.dataService.bySlug(category,title).subscribe(res => {
       res && this.seoConfig(res)
    })
  }
   async seoConfig(post:any) {
     this.seoService.setArticleMetaTags(await this.formatPostForSEO(post));
    let schema = this.createDynamicSchema(post);
    
    this.seoService.generateSchema(schema);
  }

   async formatPostForSEO(post:any) {    
    return new Promise((resolve,reject) => {
      var x:any = {}
      this.seoService.removedMetaItem.forEach((element:any) => {
        if(post[element.replace(':','_')]) {
          x[element] = post[element.replace(':','_')]
        }
      });
      
      resolve({
        ...x,
        "og:locale": "en_us",
        "og:type": "article",
        "og:site_name": "https://skymetweather.com/",
        "og:image:width":	"1200",
         "og:image:height":	"630",
        "twitter:card": "summary_large_image",
        "twitter:site": "@SkymetWeather",
      })
    })

    
  }

  createDynamicSchema(post:any) {
  return `
{
  "@context": "https://schema.org",
  "@type": "NewsArticle",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "${post.og_url}"
  },
  "headline": "${post.title}",
  "description": "${post.description}",
  "image": [
    "${post.thumbnail_image}"
  ],
  "author": {
    "@type": "Organization",
    "name": "Skymet Weather",
    "url": "https://www.skymetweather.com"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Skymet Weather",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.skymetweather.com/logo.png",
      "width": 200,
      "height": 60
    }
  },
  "datePublished": "${post.DateTime}",
  "dateModified": "${post.updatedAt}"
}`


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
      if(this.selectedFilter === 1) {
        this.allPost(1, this.postLimit + 3);
        this.postLimit += 3;
      } else {
       let slug = this.filters[this.selectedFilter-1].slug;
       console.log(slug,'oooo');
       this.filterNews(slug);
       this.postLimit += 3;
       
      }
    //    this.filters.forEach((item:any) => {
     
    //   if (item.sr_no === this.selectedFilter) {
    //     this.filterNews(item.slug);
    //   }
    // })
    
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
    // forkJoin({
    //   trending: this.dataService.getTrendingNews('Climate-Change', 1, 5),
    //   weather: this.dataService.weatherNews('weather-news-and-analysis', 1, 5),
    //   monsoon: this.dataService.weatherNews('monsoon-update', 1, 5),
    // }).subscribe(({ trending, weather,monsoon }) => {
    //   this.allArticles = [...trending, ...weather];      
    //   this.weatherNewsList = weather;
    //   this.climateChangeList = trending;
    //   this.monsoonUpdateList = monsoon;
    //   this.getPostBySlug(this.weatherNewsList[0]?.categorySlug?.[0],this.weatherNewsList[0]?.titleSlug)
      
    // });


      const requests = this.sliderArticles.map(article =>
    this.dataService.bySlug(article.category, article.slug)
  );

  forkJoin(requests).subscribe({
    next: (results) => {
      console.log('All articles loaded:', results);
      this.allArticles = results; // save in array for UI

   
  },
    error: (err) => {
      console.error('Error fetching slider articles:', err);
    }
  });

  }

  initBannerSwiper() {
    if (this.windowService.isBrowser()) {
      if (this.resourcesSwiper) {
        this.resourcesSwiper.destroy(true, true);
      }
      this.resourcesSwiper = new Swiper('.resourcesSwiper', {
        autoplay: {
          delay: 10000, // Time each slide stays before moving to next (5s)
          disableOnInteraction: false
        },
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
