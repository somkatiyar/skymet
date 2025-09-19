import { Directive, ElementRef, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appAdsense]',
  standalone: true
})
export class AdsenseDirective implements OnInit {
  @Input() adClient!: string;
  @Input() adSlot!: string;
  @Input() adFormat: string = 'auto';
  @Input() adWidth?: string ;
  @Input() adHeight?: string;
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
      ins.style.width = this.adWidth ?? '';
      ins.style.height = this.adHeight ?? '';
      ins.setAttribute('data-ad-client', this.adClient);
      ins.setAttribute('data-ad-slot', this.adSlot);
      ins.setAttribute('data-ad-format', this.adFormat);
      ins.setAttribute('data-full-width-responsive', this.fullWidthResponsive);

      this.el.nativeElement.appendChild(ins);

      // Wait until element is visible and has width
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && ins.offsetWidth > 0) {
            try {
              (window as any).adsbygoogle = (window as any).adsbygoogle || [];
              (window as any).adsbygoogle.push({});
              observer.unobserve(ins); 
            } catch (e) {
              console.warn('AdsbyGoogle error:', e);
            }
          }
        });
      });

      observer.observe(ins);
    }
  }
}

