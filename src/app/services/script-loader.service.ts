import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser, isPlatformServer } from '@angular/common';
import { WindowService } from './window.service';

@Injectable({
  providedIn: 'root'
})
export class ScriptLoaderService {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document,
    private windowService: WindowService
  ) {}

  loadScript(src: string, async: boolean = true): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.windowService.isBrowser()) {
        const script = this.document.createElement('script');
        script.src = src;
        script.async = async;
        script.onload = () => resolve();
        script.onerror = () => reject(`Failed to load: ${src}`);
        this.document.body.appendChild(script);
      } else if (this.windowService.isServer()) {
        const script = this.document.createElement('script');
        script.setAttribute('src', src);
        if (async) script.setAttribute('async', '');
        this.document.head.appendChild(script);
        resolve();
      } else {
        resolve();
      }
    });
  }

  runInline(code: string): void {
    const script = this.document.createElement('script');
    script.text = code;

    if (isPlatformBrowser(this.platformId)) {
      this.document.body.appendChild(script);
    } else if (isPlatformServer(this.platformId)) {
      this.document.head.appendChild(script);
    }
  }

  loadThirdPartyScripts() {
    // GTM
    this.runInline(`(function(w,d,s,l,i){w[l]=w[l]||[];
      w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
      var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
      j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
      f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-P8JJKRK6');`);

    // Clarity
    this.runInline(`(function(c,l,a,r,i,t,y){
      c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
      t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
      y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "r7lgdlvkzk");`);

    // Optad360
    this.loadScript("//get.optad360.io/sf/79151881-38b3-441a-baa0-1eccb4e693c4/plugin.min.js");

    // iZooto init
    this.runInline(`window._izq = window._izq || []; window._izq.push(["init"]);`);

    // iZooto script
    this.loadScript("https://cdn.izooto.com/scripts/af2090f1ae1a8e701bf70859e44fee98111e3102.js", true);
  }
}
