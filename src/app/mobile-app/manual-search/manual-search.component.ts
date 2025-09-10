import { Component } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { filter, debounceTime, distinctUntilChanged, switchMap, catchError, of } from 'rxjs';
import { DataService } from '../../services/data.service';
import { LocationService } from '../../services/location.service';
import { NativeService } from '../service/native.service';
import { CommonModule } from '@angular/common';
import { WindowService } from '../../services/window.service';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-manual-search',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,LoadingComponent],
  templateUrl: './manual-search.component.html',
  styleUrl: './manual-search.component.scss'
})
export class ManualSearchComponent {

  latitude: any = 28.7041;
  longitude: any = 77.1025;
  searchForm: any = FormGroup;
  locations: any = [];
  isSearchClicked: boolean = false;
  searchLocObj: any;
  isProcessStart:any = false;
  constructor(
    private windoSwervice: WindowService,
    private router: Router,
    private fb: FormBuilder,
    public nativeService: NativeService,

    private dataService: DataService) {
    this.searchDataInput();
    this.initSearchCtrl();
    this.nativeService.processSubject.subscribe(res => {
      this.isProcessStart = res;
    })
  }
  ngAfterViewInit(): void {
    if (this.windoSwervice.isBrowser()) {
      document.body.style.paddingBottom = '0px';
    }
  }

  searchDataInput() {
    this.searchForm = this.fb.group({
      searchCtrl: [''],
    });
  }
  initSearchCtrl() {

    this.searchForm
      .get('searchCtrl')
      ?.valueChanges.pipe(
        filter((text: any) => text.length >= 2),
        debounceTime(1000),
        distinctUntilChanged(),
        switchMap((searchTxt: any) =>
          this.dataService.searchLocation(searchTxt.replace(/\s/g, ' ')).pipe(
            catchError((error) => {
              console.error('Error:', error);
              return of([]);
            })
          )
        )
      )
      .subscribe((res: any) => {
        this.locations = res['data'];
      });
  }
  onSearch(ev: any) {
    ev.target.value.length < 2 && (this.locations = []);
    if (ev.target.value.length == 0) {
      this.locations = [];
    }
  }

  onFocus() {
    console.log('in input focus');
    this.isSearchClicked = true;
  }
  onBlur() {
    console.log('last focus');
    // this.isSearchClicked = false;
  }

  async getSearchLocation(ev: any) {
    if (this.windoSwervice.isBrowser()) {
      this.isSearchClicked = false;
      this.searchLocObj = ev;
      this.locations = [];
      this.searchForm.get('searchCtrl').setValue('');
          this.router.navigate(['welcome'], {
            replaceUrl:true,
        queryParams: {
          lat: this.searchLocObj.latitude,
          lng: this.searchLocObj.longitude,
          isManualSearch: true
        }
      })

    }
  }
  isLocationGet: boolean = false;

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
  // goTowelcome() {
  //   var el = document.getElementById('search-input-main') as HTMLInputElement;
  //   if (el.value) {
  //     this.router.navigate(['welcome'], {
  //       queryParams: {
  //         lat: this.searchLocObj.latitude,
  //         lng: this.searchLocObj.longitude,
  //         isManualSearch: true
  //       }
  //     })
  //   }

  // }
  clearInput() {
    this.locations = [];
    this.searchForm.get('searchCtrl')?.setValue('');
  }
}
