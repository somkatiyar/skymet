import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-article-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './article-detail.component.html',
  styleUrl: './article-detail.component.scss'
})
export class ArticleDetailComponent {
  post:any;
  item:any = {
    categorySlug:[],
    titleSlug:''
  }
  constructor(private route:ActivatedRoute,
    private seoService:SeoService,
    private sanitizer: DomSanitizer,
    public dataService:DataService) {
    
     var category = this.route.snapshot.paramMap.get('category');
     var title = this.route.snapshot.paramMap.get('title');
     this.item.categorySlug[0]= category;
     this.item.titleSlug = title;
     this.getPostBySlug(category,title);
  }

  getPostBySlug(category:any,title:any) {
    this.dataService.bySlug(category,title).subscribe(res => {
      this.post = res;
      // this.post && this.seoService.weatherNewsDynamic( await this.formatPostForSEO(this.post));
      this.post && this.seoConfig(this.post)
    })
  }

  sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
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
}
