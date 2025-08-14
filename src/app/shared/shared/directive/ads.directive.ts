import { Directive, ElementRef, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appAdsense]',
  standalone:true
})
export class AdsenseDirective implements OnInit {
  @Input() adClient!: string;
  @Input() adSlot!: string;
  @Input() adFormat: string = 'auto';
  @Input() fullWidthResponsive: string = 'true';

  constructor(
    private el: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const ins = document.createElement('ins');
      ins.className = 'adsbygoogle';
      ins.style.display = 'block';
      ins.setAttribute('data-ad-client', this.adClient);
      ins.setAttribute('data-ad-slot', this.adSlot);
      ins.setAttribute('data-ad-format', this.adFormat);
      ins.setAttribute('data-full-width-responsive', this.fullWidthResponsive);

      this.el.nativeElement.appendChild(ins);
      setTimeout(() => {
        try {
          (window as any).adsbygoogle = (window as any).adsbygoogle || [];
          (window as any).adsbygoogle.push({});
        } catch (e) {
          console.warn('AdsbyGoogle error:', e);
        }
      }, 0);
    //   const script = document.createElement('script');
    //   script.innerHTML = '(adsbygoogle = window.adsbygoogle || []).push({});';
    //   this.el.nativeElement.appendChild(script);
    }
  }
}
