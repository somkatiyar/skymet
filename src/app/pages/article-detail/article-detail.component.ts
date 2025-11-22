import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { DomSanitizer, Meta, SafeHtml, Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { SeoService } from '../../services/seo.service';
import { WeatherNewsComponent } from '../weather-news/weather-news.component';
import { AdsenseDirective } from '../../shared/shared/directive/ads.directive';
import { NativeService } from '../../mobile-app/service/native.service';
import { organization, siteNavigationElement, bredcrumbSchema } from '../../model/schema';

@Component({
  selector: 'app-article-detail',
  standalone: true,
  imports: [CommonModule, WeatherNewsComponent, AdsenseDirective],
  templateUrl: './article-detail.component.html',
  styleUrl: './article-detail.component.scss'
})
export class ArticleDetailComponent {
  post: any;
  isArchivePost: boolean = false;
  item: any = {
    categorySlug: [],
    titleSlug: ''
  }
  weatherNewsHeaderConfig: any = {
    title: "Suggested Resources",
    isLanguagesSelecter: false,
    isFooterView: true,
    isHeaderView: false
  };
  constructor(private route: ActivatedRoute,
    private seoService: SeoService,
    private sanitizer: DomSanitizer,
    private tt: Title,
    private meta: Meta,
    private router: Router,
    public nativeService: NativeService,
    public dataService: DataService) {

  
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
          var category = this.route.snapshot.paramMap.get('category');
    var title = this.route.snapshot.paramMap.get('title');
    this.item.categorySlug[0] = category;
    this.item.titleSlug = title;
    this.getPostBySlug(category, title);
        this.seoService.setCanonicalLink(event.urlAfterRedirects);
      }
    });
  }

  getPostBySlug(category: any, title: any) {
    this.dataService.bySlug(category, title).subscribe(res => {

      if (res && Object.keys(res).length != 0) {
        this.post = res;
        this.post && this.seoConfig(this.post)
      } else {
        this.getArchivePostBySlug(category, title)
      }
    }, err => {
      this.getArchivePostBySlug(category, title)
    })
  }

  getArchivePostBySlug(category: any, title: any) {
    return new Promise((resolve, reject) => {
      this.dataService.getArchivePostBySlug(category, title).subscribe(
        async (res) => {
          this.post = res;
          this.isArchivePost = true;
          this.tt.setTitle(this.post.title);
          this.meta.updateTag({ name: 'description', content: this.post.description });
          const key = "name";
          const value = "news_keywords";
          const keywords = this.post.metaTags.find((item: any) => item[key] === value).content;
          this.meta.updateTag({ name: 'keywords', content: keywords })
          res.metaTags.forEach((tag: any) => {
            if (tag.property) {
              this.meta.updateTag({ property: tag.property, content: tag.content });
            } else if (tag.name) {
              this.meta.updateTag({ name: tag.name, content: tag.content });
            }
          });

          resolve(this.post);
        },
        (err) => {
          this.isArchivePost = false;
        }
      );
    });
  }


  sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  generateFAQSchema(faqs: any) {
    let obj = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": `${faqs?.question1}`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `${faqs?.answer1}`
          }
        },
        {
          "@type": "Question",
          "name": `${faqs?.question2}`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `${faqs?.answer2}`
          }
        },
        {
          "@type": "Question",
          "name": `${faqs?.question3}`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `${faqs?.answer3}`
          }
        }
      ]
    }
    return obj;
  }
  async seoConfig(post: any) {
    this.seoService.setArticleMetaTags(await this.formatPostForSEO(post));
    this.seoService.updateAuthorsMeta(post?.author);
     let schema = this.createDynamicSchema(post);     
     let faqSchema = this.generateFAQSchema(post);
     this.seoService.generateSingleSchema(siteNavigationElement, 'siteNavigationElement');
     this.seoService.generateSingleSchema(schema, 'article');
     this.seoService.generateSingleSchema(faqSchema, 'faq');
     this.seoService.generateSingleSchema(organization, 'organization');
  }

  async formatPostForSEO(post: any) {
    return new Promise((resolve, reject) => {
      var x: any = {}
      this.seoService.removedMetaItem.forEach((element: any) => {
        if (post[element.replace(':', '_')]) {
          x[element] = post[element.replace(':', '_')]
        }
      });

      resolve({
        ...x,
        "og:locale": "en_us",
        "og:type": "article",
        "og:site_name": "https://skymetweather.com/",
        "og:image:width": "1200",
        "og:image:height": "630",
        "twitter:card": "summary_large_image",
        "twitter:site": "@SkymetWeather",
      })
    })


  }

  createDynamicSchema(post: any) {
    let obj = {
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `${post.og_url}`
      },
      "headline": `${post.title}`,
      "description": `${post.description}`,
      "abstract": `${post.abstract}`,
      "image": [
        `${post.thumbnail_image}`
      ],
      "relatedLink": post.related_links ? this.getLinks(post.related_links) : [],
      "author": {
        "@type": "Person",
        "name": post?.author?.name || "Skymet Weather",
        "url": post?.author?.linkedin || "",
        "sameAs": [
        "https://seic.events/speakers/avm-g-p-sharma/",
        "https://www.bharat-rakshak.com/indianairforce/database/14427"
      ],
        "jobTitle": post?.author?.designation || "",
        "description": post?.author?.Introduction || "",
        "image": post?.author?.image || "https://www.skymetweather.com/default-author.png",
    
    
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
      "datePublished": `${post.DateTime}`,
      "dateModified": `${post.updatedAt}`
    }

 
    return obj;
  }


getLinks(relatedLinks: any) {
  if (!relatedLinks) return [];
  const urls = relatedLinks.match(/https?:\/\/[^",]+/g) || [];
  return urls;
}

}
