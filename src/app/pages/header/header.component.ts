import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { WindowService } from '../../services/window.service';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  filter,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  catchError,
  of,
} from 'rxjs';
import { DataService } from '../../services/data.service';

import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterModule,
} from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

declare var window: any;

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    TranslateModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  searchCtrl: string = '';
  searchForm: any = FormGroup;
  recognition: any;
  locations: any = [];
  @ViewChild('locationList') locationList!: ElementRef;
  @HostListener('document:click', ['$event'])
  @HostListener('window:scroll', [])
  onScroll(): void {
    this.scrollFunction();
  }

  onDocumentClick(event: MouseEvent): void {
    const clickedInside = this.locationList?.nativeElement.contains(
      event.target
    );
    if (!clickedInside) {
      this.searchForm.get('searchCtrl').patchValue('');
      this.locations = [];
    }
  }
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private windowService: WindowService,
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private translate: TranslateService,
    private fb: FormBuilder
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.onscrollHeaderFix();
    }
    this.seturlConfig();
    this.configListning();
    this.searchDataInput();
    this.initSearchCtrl();
  }

  volatileUrl = [
    'himawari-latest-satellite-images-of-india',
    'weather-satellite-images-of-india',
    '15-days-rainfall-forecast-for-india',
    'content/stories',
    'content/weather-news-and-analysis/',
    'legal/term-and-condiation',
    'legal/privacy-and-policy',
  ];
  isUrlChangable() {
    if (this.windowService.isBrowser()) {
      const currentUrl = window.location.pathname;
      var status;
      const isVolatileUrl = this.volatileUrl.some((url) =>
        currentUrl.includes(url)
      );
      if (isVolatileUrl) {
        status = false;
      } else {
        status = true;
      }
    }

    return status;
  }

  onSearch(ev: any) {
    ev.target.value.length < 2 && (this.locations = []);
    if (ev.target.value.length == 0) {
      this.locations = [];
    }
  }

  onscrollHeaderFix() {
    this.scrollFunction();
  }

  scrollFunction() {
    const scrollTop =
      window.document.documentElement.scrollTop ||
      window.document.body.scrollTop;

    const header = window.document.getElementById('Header');
    if (!header) return;

    if (scrollTop > 50) {

      header.style.background = 'rgb(241 247 249)';


      header.classList.add('navActive');
      // (
      //   window.document.querySelector('.navmenu ul a') as HTMLElement
      // ).style.color = '#000';
    } else {
      header.classList.remove('navActive');

    // header.style.background = "transparent"
      // if(window.inner)
      header.style.background = `linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.6) 52.29%,
    rgba(255, 255, 255, 0) 100%
  )`;

    }
  }

  configListning() {
    if (this.windowService.isBrowser()) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        this.recognition = new SpeechRecognition();
        this.recognition.lang = 'en-US';
        this.recognition.interimResults = false;
        this.recognition.maxAlternatives = 1;

        this.recognition.onstart = (event: any) => {};
        this.recognition.onresult = (event: any) => {
          this.searchForm
            .get('searchCtrl')
            .patchValue(event.results[0][0].transcript);
        };

        this.recognition.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error);
        };
      } else {
        console.warn('Speech Recognition not supported in this browser.');
      }
    }
  }

  startListening() {
    if (this.recognition) {
      this.recognition.start();
    }
  }

  searchDataInput() {
    this.searchForm = this.fb.group({
      searchCtrl: [''],
    });
  }

  initSearchCtrl() {
    this.searchForm
      .get('searchCtrl')
      ?.valueChanges.pipe(
        filter((text: any) => text.length >= 2),
        debounceTime(1000),
        distinctUntilChanged(),
        switchMap((searchTxt: any) =>
          this.dataService.searchLocation(searchTxt.replace(/\s/g, ' ')).pipe(
            catchError((error) => {
              console.error('Error:', error);
              return of([]);
            })
          )
        )
      )
      .subscribe((res: any) => {
        this.locations = res['data'];
      });
  }

  toggleSearch() {
    console.log('clicked');
    const search = document.querySelector('.search') as HTMLElement;
    const logo = document.querySelector('.logo') as HTMLElement;
    const search_icon = document.querySelector('#search_icon') as HTMLElement;
    const close = document.querySelector('#close') as HTMLElement;
    if (search.style.display === 'block') {
      search.style.display = 'none';
      logo.style.display = 'block';
      search_icon.style.display = 'block';
      close.style.display = 'none';
    } else {
      search.style.display = 'block';
      logo.style.display = 'none';
      search_icon.style.display = 'none';
      close.style.display = 'block';
    }
  }

  selectedLng: any;
  lngCode = ['hi', 'mr', 'gu', 'en', 'ta', 'te', 'kn', 'ml', 'bn', 'pa'];

  seturlConfig() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        var len = this.router.url.length;
        if (this.isUrlChangable()) {
          var lng = this.lngCode.includes(this.router.url.slice(1, 3))
            ? this.router.url.slice(1, 3)
            : 'en';

          if (len == 1) {
            this.dataService.selectedLanguages.next('en');
            this.translate.use('en');
            this.selectedLng = 'en';
          } else if (len == 3 || len > 3) {
            this.dataService.selectedLanguages.next(lng);
            this.translate.use(lng);
            this.selectedLng = lng;
          }
        } else {
          this.dataService.selectedLanguages.subscribe((lng: any) => {
            this.selectedLng = lng;
            this.translate.use(lng);
          });
        }
      }
    });
  }

  onLanguagesChange(event: any) {
    var code = event.target.value;
    if (this.isUrlChangable()) {
      this.dataService.selectedLanguages.next(code);
      var len = this.router.url.split('/').length;
      if (this.router.url == '/' || len == 2) {
        this.router.navigate([`${code}`], {
          replaceUrl: true,
        });
      } else {
        var x = this.router.url.slice(3, this.router.url.length);
        this.router.navigate([`${code}${decodeURIComponent(x)}`], {
          replaceUrl: false,
        });
      }
    } else {
      this.dataService.selectedLanguages.next(code);
      this.translate.use(code);
    }
  }
}
