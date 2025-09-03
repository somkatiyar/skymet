import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { NativeService } from '../service/native.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { filter, debounceTime, distinctUntilChanged, switchMap, catchError, of } from 'rxjs';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-native-header',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './native-header.component.html',
  styleUrl: './native-header.component.scss'
})
export class NativeHeaderComponent implements AfterViewInit {
  searchForm!:FormGroup;
  isSearchBoxEnable:boolean = false;
  locations:any = [];
  constructor(public nativeService:NativeService,
    private dataService:DataService,
    private fb:FormBuilder,private router:Router) {
    
  }



  ngAfterViewInit(): void {
    this.setHedarStyle();
     this.searchDataInput();    
    this.initSearchCtrl(); 
  }

  setHedarStyle() {
    if(this.nativeService.getPlateform() =="native") {
      var url = this.router.url;
      var header = document.getElementById('head') as HTMLElement;
      if(url.includes('news-list') || url.includes('video-list')) {
        setTimeout(() => {
          header.style.marginBottom = '-60px important';
        }, 0);
      }
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
  async getLocation(ev: any) {

    var obj = ev?.name_en;

    this.searchForm.get('searchCtrl')?.setValue('');

    this.router
      .navigate([`forecast/weather/${obj.toLowerCase().split(",").reverse().join("/").replace(/\/\s+/g, '/').trim()}`
      ])
      .then(() => {
        this.locations = [];
    this.searchForm.get('searchCtrl')?.setValue('');
    this.isSearchBoxEnable = false;
      });
  }

 

}
