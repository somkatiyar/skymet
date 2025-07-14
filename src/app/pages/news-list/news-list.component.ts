import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DataService } from '../../services/data.service';
import { WindowService } from '../../services/window.service';
import { NgxPaginationModule } from 'ngx-pagination';
@Component({
  selector: 'app-news-list',
  standalone: true,
  imports: [CommonModule,RouterLink,NgxPaginationModule],
  templateUrl: './news-list.component.html',
  styleUrl: './news-list.component.scss'
})
export class NewsListComponent {
   weatherType:any;
   articles:any;
   currentPage:any = 1;
   articleTotal:any;
   articleLanguage:any = "en";
  constructor(private route:ActivatedRoute,
    private windowService:WindowService,
    public dataService:DataService) {
    this.weatherType = this.route.snapshot.params['weather-type'];
    //this.weatherType = this.getFormatedWeatherType(this.weatherType);

    if(this.weatherType && this.weatherType == 'all') {
      this.allPost();
    } else {
     this.getArticleByCategory(this.weatherType,this.articleLanguage);
    }
   
  }


  newsSlug() {
    var slug:any = '';
    if(this.weatherType) {
      if(this.weatherType == 'all') {
        slug = 'News And Article'
      }else if(this.weatherType == 'weather-news-and-analysis') {
        slug = 'Weather News'
      } else if(this.weatherType == 'climate-change') {
        slug = 'Climate News'
      }else if(this.weatherType == 'la-nina') {
        slug = 'La Nina'
      }else if(this.weatherType == 'monsoon-update') {
        slug = 'Monsoon Update'
      }
    }
    return slug;
  }

    allPost() {
    this.dataService.allPost(this.currentPage, 6,this.articleLanguage=='en' ?'english':'Hindi').subscribe(res => {
      this.articles = res;
      this.articleTotal = res && res[0].total;
    })
  }

  onlngChange() {
    this.currentPage = 1;
    if(this.weatherType == 'all') {
      this.allPost()
    } else {
      this.getArticleByCategory(this.weatherType,this.articleLanguage)
    }
    
  }

  getArticleByCategory(type:any,lng:any) {
    this.dataService.weatherNews(type, this.currentPage, 6,lng=='en' ? 'english':'Hindi').subscribe(res =>{
      this.articles = res;
      this.articleTotal = res && res[0].total;
    })
  }

     shareOnWhatsApp(item: any): void {
      if(this.windowService.isBrowser()){
        const relativePath = `/content/${item.categorySlug[0]}/${item.titleSlug}`;
        const absoluteUrl = `${window.location.origin}${relativePath}`;
        const encodedText = encodeURIComponent(`Check this out: ${absoluteUrl}`);
        const whatsappUrl = `https://wa.me/?text=${encodedText}`;
        window.open(whatsappUrl, '_blank');
      }
  }

  onPageChange(event:any) {
    this.currentPage = event;
    if(this.weatherType == 'all') {
      this.allPost()
    } else {
      this.getArticleByCategory(this.weatherType,this.articleLanguage)
    }
    
  }
}


