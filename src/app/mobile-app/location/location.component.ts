import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { HomeComponent } from '../../pages/home/home.component';
import { LocationService } from '../../services/location.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { filter, debounceTime, distinctUntilChanged, switchMap, catchError, of } from 'rxjs';
import { DataService } from '../../services/data.service';

import { NativeService } from '../service/native.service';
import { SplashScreen } from '@capacitor/splash-screen';

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './location.component.html',
  styleUrl: './location.component.scss'
})
export class LocationComponent implements AfterViewInit {
 @Input() parentRef: any;
 @ViewChild(HomeComponent) homeCmp!: HomeComponent;
  latitude: any = 28.7041;
  longitude: any = 77.1025;
  searchForm: any = FormGroup;
  locations:any =[]
 constructor(private locationService:LocationService,
  private router:Router,
  private fb:FormBuilder,
  public nativeService:NativeService,
  private dataService:DataService) {
  this.searchDataInput();
    this.initSearchCtrl();
 }



  

  async ngAfterViewInit() {
    await SplashScreen.hide();
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

  async getSearchLocation(ev: any) {
    this.searchForm.get('searchCtrl')?.setValue('');
    this.locations = [];
       this.router.navigate(['welcome'],{
              queryParams:{
                lat:ev.latitude,
                lng:ev.longitude,
                isManualSearch:true
              }
            })
  }
  clearInput() {
    this.locations = [];
    this.searchForm.get('searchCtrl')?.setValue('');
  }
}
