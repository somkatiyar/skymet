import { Component, ViewEncapsulation } from '@angular/core';
import { DataService } from '../../services/data.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-trending-news',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterLinkActive],
  templateUrl: './trending-news.component.html',
  styleUrl: './trending-news.component.scss',
})
export class TrendingNewsComponent {
  trendingNews:any;
  constructor(public dataService: DataService) {
    this.getTrendingArticle();
  }

  getTrendingArticle() {
      this.dataService.getTrendingNews('Climate-Change',1,3).subscribe((res) => {
        this.trendingNews = res;
    });
  }
}
