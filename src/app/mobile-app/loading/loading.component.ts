import { Component } from '@angular/core';
import { WindowService } from '../../services/window.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss'
})
export class LoadingComponent {
constructor(private windoSwervice: WindowService,private router:Router,private route:ActivatedRoute) {
    // this.route.queryParams.subscribe(params => {
    //   const lat = params['lat'];
    //   const lng = params['lng'];
    
    //     if(this.windoSwervice.isBrowser()) {
    //   setTimeout(() => {
    //            this.router.navigate(['welcome'], {
    //     queryParams: {
    //       lat: lat,
    //       lng: lng,
    //       isManualSearch: false
    //     }
    //   })
    //   }, 3000);
    // }
    // });
}



    ngAfterViewInit(): void {
    if(this.windoSwervice.isBrowser()) {
      document.body.style.paddingBottom = '0px';

    }
  }
  ngOnDestroy(): void {
       if(this.windoSwervice.isBrowser()) {
          document.body.style.paddingBottom = '100px';
    }
  }
}
