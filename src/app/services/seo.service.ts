import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { WindowService } from './window.service';
import { Router } from '@angular/router';
import { environment_prod } from '../../environments/environment'
import { organization, siteNavigationElement, bredcrumbSchema } from '../model/schema'
import { homePageMeta, satelliteMeta } from '../model/meta-tags'
import { Meta, Title } from '@angular/platform-browser';
import * as des_meta from '../model/forecast-meta-tags'
import { DataService } from './data.service';
import { TranslateService } from '@ngx-translate/core';
@Injectable({
  providedIn: 'root'
})
export class SeoService {
  langCodes = ['en', 'hi', 'mr', 'gu', 'bn', 'pa', 'ta', 'te', 'kn', 'ml'];
  constructor(
    @Inject(DOCUMENT) private doc: Document,
    private router: Router,
    private metaService: Meta,
    private titleService: Title,
    private dataService: DataService,
    private translateService: TranslateService,
    private windowService: WindowService) {

  }

  removedMetaItem: any = [
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

  setCanonicalLink(remainingUrl: any): void {

    let link: HTMLLinkElement = this.doc.querySelector("link[rel='canonical']") || this.doc.createElement('link');
    link.setAttribute('rel', 'canonical');
    link.setAttribute('href', environment_prod.baseUrl + remainingUrl);
    if (!link.parentNode) {
      this.doc.head.appendChild(link);
    }
  }

  setSchema(component: any) {    
    if (this.windowService.isServer()) {
      if (component == 'home' || component == 'satellite') {
        this.generateSchema(organization, 'organization');
        this.generateSchema(siteNavigationElement, 'siteNavigationElement')
      }
    }
  }

  combinedSchema(schema?: any) {
    const arr = [
      organization,
      ...siteNavigationElement
    ];

    if (schema) {
      if (Array.isArray(schema)) {
        arr.push(...schema);
      } else {
        arr.push(schema);
      }
    }


    return arr;
  }


generateSchema(schema?: any, id?: string) {
  if (this.windowService.isServer()) {
    // ✅ Remove existing schema if id is provided
    if (id) {
      const existing = this.doc.getElementById(id);
      if (existing) {
        existing.remove();
      }
    }

    const script: any = this.doc.createElement('script');
    script.type = 'application/ld+json';

    // ✅ Set unique id (optional but useful for removing later)
    if (id) {
      script.id = id;
    }
    const finalSchema = this.combinedSchema(schema);
    script.text =
      typeof finalSchema === 'string'
        ? finalSchema
        : JSON.stringify(finalSchema);

    this.doc.head.appendChild(script);
  }
}

generateSingleSchema(schema: any, id?: string) {
 
  if (!this.windowService.isServer()) return;

  // Remove old schema if exists
  if (id) {
    const existing = this.doc.getElementById(id);
    if (existing) existing.remove();
  }

  // Create new <script> tag
  const script = this.doc.createElement('script');
  script.type = 'application/ld+json';
  if (id) script.id = id;

  // Always stringify — since schema is always an object
  script.text = JSON.stringify(schema);

  this.doc.head.appendChild(script);
   if(id == "siteNavigationElement") {
    console.log('siteNavigationElement schema', script);
  }
}



  alternativeLinks(basePath: any) {
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
      link.setAttribute('href', `${environment_prod.baseUrl}/${code}/${basePath}`);
      this.doc.head.appendChild(link);
    });

    const defaultLink = this.doc.createElement('link');
    defaultLink.setAttribute('rel', 'alternate');
    defaultLink.setAttribute('hreflang', 'x-default');
    defaultLink.setAttribute('href', `${environment_prod.baseUrl}/en/${basePath}`);
    this.doc.head.appendChild(defaultLink);

  }



  setMetaTags(component: any, subCmp?: 'insat' | 'himawari' | 'Rainfall' | 'temperature' | 'winds') {
    var lng = this.langCodes.includes(this.router.url.slice(1, 3))
      ? this.router.url.slice(1, 3)
      : 'en';
    if (component == 'home') {
      let meta = homePageMeta['normal'][lng];
      console.log(meta, 'meta');

      this.titleService.setTitle(meta.title);
      this.metaService.updateTag({ name: 'keywords', content: meta['keywords'] });
      this.metaService.updateTag({ name: 'description', content: meta['description'] });
    }
    if (component == 'satellite' && subCmp) {
      const meta = satelliteMeta[subCmp];
      this.titleService.setTitle(meta.title);
      this.metaService.updateTag({ name: 'keywords', content: meta['keywords'] });
      this.metaService.updateTag({ name: 'description', content: meta['description'] });
    }

  }

  updateAuthorsMeta(author: any) {
    this.metaService.updateTag({ name: "author", content: author?.name || 'Skymet Weather' });

  }

  setArticleMetaTags(post: any) {    
    this.titleService.setTitle(post.title);
    for (const key in post) {
      const attributeName = key.includes('og') ? 'property' : 'name';
      this.metaService.updateTag({ [attributeName]: key, content: post[key] });
    }
  }

  setSeoTags(component: any) {
    if (component == 'home') {
      let meta: any = homePageMeta['seo'];
      for (const key in meta) {
        const attributeName = key.includes('og') ? 'property' : 'name';
        this.metaService.updateTag({ [attributeName]: key, content: meta[key] });
      }
    }
  }

  setForecastTags(metaObj: any, weatherDuration?: any) {
    var lng = this.langCodes.includes(this.router.url.slice(1, 3))
      ? this.router.url.slice(1, 3)
      : 'en';

    let weatherDt = weatherDuration.replaceAll('-', '_') as keyof typeof des_meta;
    let d = des_meta[weatherDt](lng, metaObj);
    this.titleService.setTitle(d.title)
    this.metaService.updateTag({ name: "description", content: d.description })
    this.metaService.updateTag({ name: "keywords", content: d.keywords })
  }

  setAqiMetaTags(metaObj: any) {
    this.titleService.setTitle(metaObj.title)
    this.metaService.updateTag({ name: "description", content: metaObj.description })
    this.metaService.updateTag({ name: "keywords", content: metaObj.keywords })
  }

}




