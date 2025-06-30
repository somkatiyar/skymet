import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import {
  Autoplay,
  Manipulation,
  Navigation,
  Pagination,
  Thumbs,
} from 'swiper/modules';
import Swiper from 'swiper';
import { WindowService } from '../../../../services/window.service';
import { CommonModule, Location } from '@angular/common';
import { DataService } from '../../../../services/data.service';
declare var $: any;
Swiper.use([Autoplay, Navigation, Thumbs]);
@Component({
  selector: 'app-gallary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallary.component.html',
  styleUrl: './gallary.component.scss',
})
export class GallaryComponent implements AfterViewInit {
  satelliteMainSwiper?: Swiper;
  satelliteThumbSwiper?: Swiper;
  satelliteImages: any[] = [];
  activeIndex: number = 0;
  viewType:any = 'swiper';
  selectedTab: string = 'himawari';
  constructor(private windowService: WindowService,
    private cdRef:ChangeDetectorRef,
    private location:Location,
    public dataService: DataService) {

  }

  ngAfterViewInit(): void {
    this.getsatelliteImage('himawari');
  }
  
  refreshUrl(tab:any) { 
    if(tab == 'insat') {
      this.location.replaceState(
        `insat/weather-satellite-images-of-india`
      );
    }else if(tab == 'himawari') { 
    this.location.replaceState(
       `himawari-latest-satellite-images-of-india`
   )
   }
  }

  getsatelliteImage(tab: any) {
    this.satelliteImages = [];
    this.selectedTab = tab;
    this.dataService.getSatelliteImage(tab).then((res) => {
      if (res && res.length > 0 && tab == 'insat') {
        this.satelliteImages = this.extractInsatTimeDate(res);
        this.initSatelliteSwiper();
        this.refreshUrl(tab);
        setTimeout(() => this.cdRef.detectChanges());

      } else if (res && res.images && res.images.length > 0 && tab == 'himawari') {
        this.satelliteImages = this.extractHimawariTimeDate(res['images'], res.url);
        this.initSatelliteSwiper();
        this.refreshUrl(tab);
        setTimeout(() => this.cdRef.detectChanges());
      }
     
    })

  }


  extractHimawariTimeDate(imagesArray: any, url: string) {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return imagesArray.slice(0,24).map((image: any) => {
      const timeMatch = image.match(/_(\d{4})\.jpg/);
      const rawTime = timeMatch ? timeMatch[1] : null;
      const dateStr = image.split('v=')[1];
      const year = dateStr.slice(0, 4);
      const month = dateStr.slice(4, 6);
      const day = dateStr.slice(6, 8);


      const formattedDate = `${parseInt(day)} ${months[parseInt(month) - 1]} ${year}`;

      let formattedTime = '';
      if (rawTime) {
        const hour = rawTime.slice(0, 2);
        const minute = rawTime.slice(2, 4);
        formattedTime = `${hour}:${minute}`;
      }

      return {
        image: url + image,
        date: formattedDate,
        time: formattedTime
      };
    });


  }

  extractInsatTimeDate(imagesArray: any) {
    const regex = /(\d{4})\/(\d{2})\/(\d{2})\/.*-(\d{2})[:.](\d{2})\.jpg$/;

    return imagesArray.map((image: any) => {
      const match = image.match(regex);
      if (match) {
        const [_, year, month, day, hour, minute] = match;
        const formattedDate = `${parseInt(day)} ${new Date(`${year}-${month}-01`).toLocaleString('default', { month: 'long' })} ${year}`;
        const formattedTime = `${hour}:${minute}`;
        return {
          image: image,
          date: formattedDate,
          time: formattedTime
        };
      } else {
        console.log("Could not extract date/time from the URL.");
        return { image: image, date: '', time: '' };
      }
    });
  }  


  async initSatelliteSwiper() {
    if (this.windowService.isBrowser()) {
      this.satelliteMainSwiper?.destroy(true, true);
      this.satelliteThumbSwiper?.destroy(true, true);

      this.satelliteThumbSwiper = new Swiper('.mySwiper', {
        slidesPerView: 13,
        spaceBetween: 0,
        freeMode: true,
        watchSlidesProgress: true,
        autoplay: true,
        loop: true,

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
      this.satelliteMainSwiper = new Swiper('.mySwiper2', {
        spaceBetween: 10,
        autoplay: true,
        loop: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        thumbs: {
          swiper: this.satelliteThumbSwiper,
        },
        on: {
          slideChange: () => {
            this.activeIndex = this.satelliteMainSwiper?.activeIndex ?? 0;

          }
        }
      });
    }
  }

  openFullscreen() {
    if (this.windowService.isBrowser()) {
      var elem: any = this.viewType == 'swiper' ?
       document.getElementById('img' + this.activeIndex):
       document.getElementById('gridContainer');
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      }
    }
  }

  scale = 1;
  zoomIn() {
    if (this.windowService.isBrowser()) {

      this.satelliteMainSwiper?.autoplay.stop();
      this.satelliteThumbSwiper?.autoplay.stop();
      const img = document.getElementById('img' + this.activeIndex) as HTMLElement;
      this.scale += 0.1;
      img.style.transform = `scale(${this.scale})`;
    }

  }

  zoomOut() {
    if (this.windowService.isBrowser()) {
      const img = document.getElementById('img' + this.activeIndex) as HTMLElement;
      this.satelliteMainSwiper?.autoplay.stop();
      this.satelliteThumbSwiper?.autoplay.stop();
      this.scale = Math.max(0.1, this.scale - 0.1);
      img.style.transform = `scale(${this.scale})`;
    }
  }

 whatsappImageShare() {
  if (!this.windowService.isBrowser()) return;

  const imageUrl = this.satelliteImages?.[this.activeIndex]?.image;
  if (!imageUrl) {
    alert('No image found to share.');
    return;
  }

  // Just open WhatsApp link with image URL
  const message = encodeURIComponent(`Check this satellite image: ${imageUrl}`);
  const whatsappUrl = `https://wa.me/?text=${message}`;
  window.open(whatsappUrl, '_blank');
}



   selectedImages: string[] = [];

  toggleImageSelection(url: string) {
    const index = this.selectedImages.indexOf(url);
    if (index > -1) {
      this.selectedImages.splice(index, 1);
    } else {
      this.selectedImages.push(url);
    }
  }

    isSelected(url: string): boolean {
    return this.selectedImages.includes(url);
  }

async shareFiles() {
 const urls = this.selectedImages;
  if (!urls.length) {
    alert('No images selected.');
    return;
  }

  const message = encodeURIComponent(`Check these satellite images:\n${urls.join('\n')}`);
  const whatsappUrl = `https://wa.me/?text=${message}`;
  window.open(whatsappUrl, '_blank');
}


}
