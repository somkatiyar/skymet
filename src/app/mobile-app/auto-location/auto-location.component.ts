import { Component } from '@angular/core';
import { NativeService } from '../service/native.service';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../loading/loading.component';
import { Router } from '@angular/router';
import { NativeLocationService } from '../service/native-location.service';

@Component({
  selector: 'app-auto-location',
  standalone: true,
  imports: [CommonModule, LoadingComponent],
  templateUrl: './auto-location.component.html',
  styleUrl: './auto-location.component.scss'
})
export class AutoLocationComponent {
  isLocationGet: boolean = false;
  isProcessStart: boolean = false;

  constructor(public nativeService: NativeService,
    public nativeLocationService: NativeLocationService,
    private router:Router) {
         this.nativeService.processSubject.subscribe(res => {
      this.isProcessStart = res;
    })
    }

  // async getPositionNative() {

  //   try {
  //     var status = await this.nativeService.getPositionNative(true);      
  //     if (status && status.latitude && status.longitude) {
  //       this.isLocationGet = true;
  //     }
  //   } catch (err) {
  //     console.error('Error fetching location:', err);
  //   } finally {
  //     setTimeout(() => {

  //         var routes = this.nativeService.isUserVisited() ? '/' : 'welcome'
  //       if(status && status.latitude) {
  //       this.router.navigate([routes], {
  //         replaceUrl:true,
  //       queryParams: {
  //         lat: status ? status.latitude : null,
  //         lng: status ? status.longitude : null,
  //         isManualSearch: false
  //       }
  //     })
  //       } else {
  //            this.router.navigate(['manual-search'], {
  //            queryParams: { isManualSearch: true }
  //         });
  //       }
     
  //     }, 1500); 
  //   }
  // }

    async getPositionNative() {
    try {
      var status = await this.nativeService.getPositionNative(false);      
      if (status && status.latitude && status.longitude) {
        this.isLocationGet = true;
      }
    } catch (err) {
      console.error('Error fetching location:', err);
    } finally {
      setTimeout(() => {
          var routes = this.nativeService.isUserVisited() ? '/' : 'welcome'
        if(status && status.latitude) {
        this.router.navigate([routes], {
          replaceUrl:true,
        queryParams: {
          lat: status ? status.latitude : null,
          lng: status ? status.longitude : null,
          isManualSearch: false
        }
      })
        } else {
             this.router.navigate(['manual-search'], {
             queryParams: { isManualSearch: true }
          });
        }
     
      }, 1500); 
    }
  }
}

