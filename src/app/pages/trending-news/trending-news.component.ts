import { Component, ViewEncapsulation } from '@angular/core';
import { DataService } from '../../services/data.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AdsenseDirective } from '../../shared/shared/directive/ads.directive';
import { NativeService } from '../../mobile-app/service/native.service';

@Component({
  selector: 'app-trending-news',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterLinkActive,AdsenseDirective],
  templateUrl: './trending-news.component.html',
  styleUrl: './trending-news.component.scss',
})
export class TrendingNewsComponent {
  trendingNews:any;
  constructor(public dataService: DataService,public nativeService: NativeService) {
    this.getTrendingArticle();
  }

  getTrendingArticle() {
      this.dataService.getTrendingNews('Climate-Change',1,3).subscribe((res) => {
        this.trendingNews = res;
    });
  }
}
