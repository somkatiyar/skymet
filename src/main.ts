import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { SplashScreen } from '@capacitor/splash-screen';

bootstrapApplication(AppComponent, appConfig).then(async ()=> {

// Show splash again
// await SplashScreen.show({
//   autoHide: true,
//   showDuration: 3000, // 3s
// });


})
  .catch((err) => console.error(err));
