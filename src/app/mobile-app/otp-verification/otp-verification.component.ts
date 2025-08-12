import { Component, AfterViewInit } from '@angular/core';
import { WindowService } from '../../services/window.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NativeService } from '../service/native.service';

@Component({
  selector: 'app-otp-verification',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './otp-verification.component.html',
  styleUrl: './otp-verification.component.scss'
})
export class OtpVerificationComponent implements AfterViewInit {
   otpFilled: boolean = false;
  constructor(private windowService: WindowService, 
    public nativeService:NativeService,
    private router: Router) {

      
    }
 


  ngAfterViewInit(): void {
    this.getmagicOtp();
  }

  goBack() {
    if (this.windowService.isBrowser()) {
      window.history.back();
    }
  }

  getmagicOtp() {
    if (this.windowService.isBrowser()) {
      const inputs = document.querySelectorAll('.otp-input input');
      const otp = localStorage.getItem('magicOtp');
      if (!otp || otp.length !== 6) return;
      inputs.forEach((input, index) => {        
        (input as HTMLInputElement).value = otp[index];
      });
    }
  }

goToUserInfo() {
  this.router.navigate(["user-info"])
}



}



