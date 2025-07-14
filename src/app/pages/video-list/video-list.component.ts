import { Component } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { DataService } from '../../services/data.service';
import { WindowService } from '../../services/window.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-video-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './video-list.component.html',
  styleUrl: './video-list.component.scss'
})
export class VideoListComponent {
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
