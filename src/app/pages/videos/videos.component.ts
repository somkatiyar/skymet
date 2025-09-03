import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';
import { WindowService } from '../../services/window.service';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AdsenseDirective } from '../../shared/shared/directive/ads.directive';
import { NativeService } from '../../mobile-app/service/native.service';

@Component({
  selector: 'app-videos',
  standalone: true,
  imports: [CommonModule,RouterLink,TranslateModule,AdsenseDirective],
  templateUrl: './videos.component.html',
  styleUrl: './videos.component.scss'
})
export class VideosComponent {
  videos:any;
  url!: SafeResourceUrl;
  selectedLanguage: any;
  constructor(private dataService:DataService,
public nativeService:NativeService,
    private sanitizer: DomSanitizer,
    private translateService: TranslateService
  ) {
      this.dataService.selectedLanguages.subscribe(lng => {
      this.translateService.use(lng);
      this.selectedLanguage = lng;
    })
    this.getVideos();
  }

getVideos() {
  this.dataService.getYoutubeVideo(3).subscribe(res => {
    if (res && res['data']) {
      this.videos = res['data'].map((item: any) => {
        const attrs = item.attributes;
        return {
          ...attrs,
          id: item.id,
          safeUrl: this.sanitizer.bypassSecurityTrustResourceUrl(attrs.link)
        };
      });
    }
  });
}



}
