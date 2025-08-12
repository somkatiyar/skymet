import { Component } from '@angular/core';
import { WindowService } from '../../services/window.service';
import { Router } from '@angular/router';
import { NativeService } from '../service/native.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
mobile:any
  constructor(private windowService:WindowService,
    private nativeService:NativeService,
    private router:Router) {

  }
async submitMobile() {

  if(this.windowService.isBrowser()) {
    if(this.mobile.length<10) {
      alert("Please enter 10 digit mobile no.")
      return
    } else{
      await this.setMagicOtp();
      await this.setMobile('mobile',this.mobile);
      this.router.navigate(['otp-verification'])
    }
  }
}

onNumberInput(event: any): void {
  const input = event.target;
  input.value = input.value.replace(/[^0-9]/g, '');
  this.mobile = input.value;
}

async setMagicOtp() {
  return new Promise((resolve,reject) => {
    const randomSixDigit = Math.floor(100000 + Math.random() * 900000);
    localStorage.setItem('magicOtp',JSON.stringify(randomSixDigit))
    resolve(randomSixDigit)
  })
}



   async setMobile(key:any,value:any) {
    if(this.windowService.isBrowser()) {
        let userInfo =  this.nativeService.getUserInfo();
        if(userInfo) {          
          userInfo[key]=value;
          localStorage.setItem("userInfo",JSON.stringify(userInfo));          
        } else {
          this.nativeService.setUserInfo(key,value);
        }
      
    }
    
   }



}
