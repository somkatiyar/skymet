import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { filter, debounceTime, distinctUntilChanged, switchMap, catchError, of } from 'rxjs';
import { DataService } from '../../services/data.service';
import { WindowService } from '../../services/window.service';
import { Router } from '@angular/router';
import { NativeService } from '../service/native.service';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.scss'
})
export class UserInfoComponent implements OnInit {
  isSearchEnable:boolean = false;
  searchForm!:FormGroup;
  searchCtrl:any='';
  locations:any = [];
  savedLocFor: any ="";
  userInfo:any = {
    mobile:"",
    name:"",
    home:{
      loc:"",
      lat:"",
      lng:""
    },
    work:""
  };

  step:any = "name";
  constructor(private fb: FormBuilder,
    private windowService:WindowService,
    private router:Router,
    public nativeService:NativeService,
    private dataService:DataService) {
   }



   setName(key:any,value:any) {
    if(this.windowService.isBrowser()) {
        let userInfo =  this.nativeService.getUserInfo();
        if(userInfo) {
            userInfo[key]=value;
            localStorage.setItem("userInfo",JSON.stringify(userInfo))
        } else {
          this.nativeService.setUserInfo(key,value)
        }
       
    }
   }

   continue() {
    if(this.windowService.isBrowser()) {
      let name:any = (document.getElementById('name-input') as HTMLElement)
    if(this.step == 'name') {
      this.setName('name',name.value ? name.value :'User');
      this.step = 'loc';
    } else {
      this.router.navigate((['welcome']));
    }
   }
    }

  ngOnInit(): void {
    this.searchDataInput();    
    this.initSearchCtrl(); 
  }
  searchLocationFor(item:any) {
    this.isSearchEnable = true;
    this.savedLocFor = item;
  }

  onSearch($event:any) {

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
  getLocation(item:any) {
    this.searchForm.get('searchCtrl')?.setValue('');
    this.locations = [];
    this.isSearchEnable = false;
    if(this.savedLocFor == "home") {
      this.userInfo.mobile = this.nativeService.getUserInfo()?.mobile;
      this.userInfo.name = this.nativeService.getUserInfo()?.name;
      this.userInfo.home = {
        loc:item.name_en,
        lat:item.latitude,
        lng:item.longitude
      }
    } else if(this.savedLocFor="work") {
        this.userInfo.work = item.name_en
    }

    if(this.windowService.isBrowser()) {
      localStorage.setItem("userInfo",JSON.stringify(this.userInfo))
    }
  }

   goBack() {
    if (this.windowService.isBrowser()) {
      this.step == "name" && window.history.back();
       this.step == "loc" && (this.step = "name");
    }
  }

  skip() {
    if(this.step == "name") {
      this.step = "loc";
    } else {
      this.router.navigate(["welcome"])
    }
  }

}
