import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-weather-news',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterLinkActive, TranslateModule],
  templateUrl: './weather-news.component.html',
  styleUrl: './weather-news.component.scss'
})
export class WeatherNewsComponent {
  weatherNews:any;
  @Input()weatherNewsHeaderConfig:any;
  selectedLanguage: any;
 
  constructor(public dataService:DataService,private router:Router,private translateService: TranslateService) {
          this.dataService.selectedLanguages.subscribe(lng => {
      this.translateService.use(lng);
      this.selectedLanguage = lng;
    })
    this.getWeatherNews();
  }

  onLanguageChange(lng:any) {
    this.getWeatherNews(lng);
  }

  getWeatherNews(lng?:any) {
    this.dataService.weatherNews('weather-news-and-analysis',1,4,lng).subscribe(res => {
      this.weatherNews = res;  
          
    })
  }

  shareWhatsAppLink(item: any): string {
  const url = `https://www.skymetweather.com/content/${item.categorySlug[0]}/${item.titleSlug}`;
  return 'https://wa.me/?text=' + encodeURIComponent(url);
}

goToDetail(item:any) {
  const url = `/content/${item.categorySlug[0]}/${item.titleSlug}`;
  this.router.navigate([url]);
}
}


