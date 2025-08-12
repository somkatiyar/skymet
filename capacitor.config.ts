import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.skymet.indianweather',
  appName: 'skymetweather',
  webDir: 'dist/skymetweather/browser',
   server: {
    url: 'http://192.168.105.3:4200',  
    cleartext: true
  }
};

export default config;
