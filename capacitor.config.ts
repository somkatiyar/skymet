import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.skymet.indianweather',
  appName: 'skymetweather',
  webDir: 'dist/skymetweather/browser',
    plugins: {
    SplashScreen: {
      launchShowDuration:3000,
      launchAutoHide: false, 
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
      backgroundColor: '#ffffff',
      //launchShowDuration:5000
    },
  },
   server: {
     url: 'http://192.168.0.139:4200',  
    cleartext: true
  },
  
  
};

export default config;
