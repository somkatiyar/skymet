import { Component } from '@angular/core';
import { WindowService } from '../../services/window.service';
import { Router } from '@angular/router';
import { NativeService } from '../service/native.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';

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
    private dataService:DataService,
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
 async register(userId: string, username: string) {
    try {
      const options: any = await this.dataService.getRegistrationChallenge(userId, username);
      const credential = await this.dataService.registerPasskey(options);
      console.log('Credential created:', credential);
      
      // Send credential to backend
      const verifyRes = await this.dataService.verifyRegistration(userId, credential);
      console.log('Passkey registration result:', verifyRes);
    } catch (err) {
      console.error('Registration error:', err);
    }
  }

// loginWithPasskey(userId: string) {
//   try {
//     this.dataService.getLoginChallenge(userId).then(async (options: any) => {
//       const credential = await this.dataService.registerLoginPasskey(options);
//       console.log('Credential for login:', credential);
//       // Send credential to backend for verification
//       this.dataService.verifyLogin({
//         userId:userId,
//         response: credential
//       }).then((res) => {
//         console.log('Passkey login result:', res);
//       }).catch((err) => {
//         console.error('Login verification error:', err);
//       });
//     }).catch((err) => {
//       console.error('Login challenge error:', err);
//     });
//   } catch (err) {
//     console.error('Login error:', err);
//   }
// }


// Helper to convert ArrayBuffer → Base64URL
bufferToBase64URL(buffer: ArrayBuffer) {
  const bytes = new Uint8Array(buffer);
  let str = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    str += String.fromCharCode(bytes[i]);
  }
  return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}


async loginWithPasskey(userId: string) {
  try {
    const options: any = await this.dataService.getLoginChallenge(userId);

    const credential: any = await this.dataService.registerLoginPasskey(options);

    const credentialResponse = {
      id: credential.id,
      rawId: this.bufferToBase64URL(credential.rawId),
      type: credential.type,
      response: {
        authenticatorData: this.bufferToBase64URL(credential.response.authenticatorData),
        clientDataJSON: this.bufferToBase64URL(credential.response.clientDataJSON),
        signature: this.bufferToBase64URL(credential.response.signature),
        userHandle: credential.response.userHandle
          ? this.bufferToBase64URL(credential.response.userHandle)
          : null
      },
      clientExtensionResults: credential.clientExtensionResults,
    };

    const res = await this.dataService.verifyLogin({
      userId,
      response: credentialResponse,
    });

    console.log('Passkey login result:', res);
  } catch (err) {
    console.error('Login error:', err);
  }
}








}
