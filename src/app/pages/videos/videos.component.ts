import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';
import { WindowService } from '../../services/window.service';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-videos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './videos.component.html',
  styleUrl: './videos.component.scss'
})
export class VideosComponent {
  videos:any;
  url!: SafeResourceUrl;
  constructor(private dataService:DataService,
    private windowService:WindowService,
    private sanitizer: DomSanitizer
  ) {
    this.getVideos();
  }

getVideos() {
  this.dataService.getYoutubeVideo(2).subscribe(res => {
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
