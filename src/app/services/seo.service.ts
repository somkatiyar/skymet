import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { WindowService } from './window.service';
import { Router } from '@angular/router';
import { environment_dev } from '../../environments/environment'
import { organization,siteNavigationElement,bredcrumbSchema} from '../model/schema'
import { homePageMeta,satelliteMeta } from '../model/meta-tags'
import { Meta, Title } from '@angular/platform-browser';
import * as des_meta from '../model/forecast-meta-tags'
import { DataService } from './data.service';
import { TranslateService } from '@ngx-translate/core';
import { log } from 'console';
@Injectable({
  providedIn: 'root'
})
export class SeoService {
  langCodes = ['en', 'hi', 'mr', 'gu', 'bn', 'pa', 'ta', 'te', 'kn', 'ml'];
  constructor(
    @Inject(DOCUMENT) private doc: Document,
    private router:Router,
    private metaService:Meta,
    private titleService:Title,
    private dataService:DataService,
    private translateService:TranslateService,
    private windowService:WindowService) {
    
    }

     removedMetaItem:any = [
    "og:locale",
    "og:title",
    "og:description",
    "og:type",
    "og:image",
    "og:url",
    "og:site_name",
    "twitter:card",
    "twitter:site",
    "twitter:title",
    "twitter:description",
    "twitter:image",
    "twitter:url",
    "title",
    "description",
    "keywords"
  ]

  setCanonicalLink(remainingUrl:any): void {
    let link: HTMLLinkElement = this.doc.querySelector("link[rel='canonical']") || this.doc.createElement('link');
    link.setAttribute('rel', 'canonical');
    link.setAttribute('href', environment_dev.baseUrl + remainingUrl);
    if (!link.parentNode) {
      this.doc.head.appendChild(link);
    }
  }

  setSchema(component:any) {
    if(this.windowService.isServer()) {
      if(component == 'home') {
        this.generateSchema(organization);
        this.generateSchema(siteNavigationElement);
      }
    }
  }

  generateSchema(schema:any) {
    console.log(typeof schema);
    
    if(this.windowService.isServer()) {
      const script = this.doc.createElement('script');
      script.type = 'application/ld+json';
      script.text = typeof schema == 'object'? JSON.stringify(schema) : schema;
      this.doc.head.appendChild(script);
    }
  }

  alternativeLinks(basePath:any) {
    if (this.windowService.isBrowser()) return;
    const currentUrl = this.router.url; 
    const segments = currentUrl.split('/').filter(Boolean);
    let lang = 'en';
    if (this.langCodes.includes(segments[0])) {
      lang = segments[0];
      basePath = segments.slice(1).join('/');
    } else {
      basePath = segments.join('/');
    }
    const existing = this.doc.querySelectorAll("link[rel='alternate']");
    existing.forEach(el => el.remove());
    this.langCodes.forEach(code => {
      const link = this.doc.createElement('link');
      link.setAttribute('rel', 'alternate');
      link.setAttribute('hreflang', code);
      link.setAttribute('href', `${environment_dev.baseUrl}/${code}/${basePath}`);
      this.doc.head.appendChild(link);
    });

    const defaultLink = this.doc.createElement('link');
    defaultLink.setAttribute('rel', 'alternate');
    defaultLink.setAttribute('hreflang', 'x-default');
    defaultLink.setAttribute('href', `${environment_dev.baseUrl}/en/${basePath}`);
    this.doc.head.appendChild(defaultLink);
  
  }



  setMetaTags(component:any,subCmp?:'insat' | 'himawari' | 'Rainfall') {    
    var lng = this.langCodes.includes(this.router.url.slice(1, 3))
            ? this.router.url.slice(1, 3)
            : 'en';
    if(component == 'home') {
     let meta = homePageMeta['normal'][lng];
     this.titleService.setTitle(meta.title);
     this.metaService.updateTag({ name: 'keywords', content: meta['keywords'] });
     this.metaService.updateTag({ name: 'description', content: meta['description'] });
    }
    if(component == 'satellite' && subCmp) {
      const meta = satelliteMeta[subCmp];
     this.titleService.setTitle(meta.title);
     this.metaService.updateTag({ name: 'keywords', content: meta['keywords'] });
     this.metaService.updateTag({ name: 'description', content: meta['description'] });
    }
    
  }

  setArticleMetaTags(post:any) {
    this.titleService.setTitle(post.title);
     for (const key in post) {
          const attributeName = key.includes('og') ? 'property' : 'name';
          this.metaService.updateTag({ [attributeName]: key, content: post[key] });
        }
  }

  setSeoTags(component:any) {
    if(component == 'home') {
      let meta:any = homePageMeta['seo'];
      for (const key in meta) {
          const attributeName = key.includes('og') ? 'property' : 'name';
          this.metaService.updateTag({ [attributeName]: key, content: meta[key] });
        }
    }
  }

  setForecastTags(metaObj:any,weatherDuration?:any) {
   var lng = this.langCodes.includes(this.router.url.slice(1, 3))
            ? this.router.url.slice(1, 3)
            : 'en';     
       
    let weatherDt = weatherDuration.replaceAll('-','_') as keyof typeof des_meta;
    let d = des_meta[weatherDt](lng,metaObj);
    this.titleService.setTitle(d.title)
    this.metaService.updateTag({name:"description",content:d.description})
    this.metaService.updateTag({name:"keywords",content:d.keywords})
  }

}




