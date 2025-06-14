import { AfterViewInit, ChangeDetectorRef, Component, Input, SimpleChanges } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { DataService } from '../../services/data.service';
import { WindowService } from '../../services/window.service';
import { ChartComponent } from '../../shared/shared/widget/chart/chart.component';
import { RainfallComponent } from '../../shared/shared/widget/rainfall/rainfall.component';
import { SpeedometerComponent } from '../../shared/shared/widget/speedometer/speedometer.component';

@Component({
  selector: 'app-current-data',
  standalone: true,
  imports: [HeaderComponent,TranslateModule,
    ChartComponent,RainfallComponent,SpeedometerComponent],
  templateUrl: './current-data.component.html',
  styleUrl: './current-data.component.scss'
})
export class CurrentDataComponent implements AfterViewInit {
  forecastData:any;
  weatherText:any = `स्काइमेट वेदर में आपका स्वागत है`
  constructor(private translateService:TranslateService,
    public dataService:DataService,private windoService:WindowService,

  ) {
    this.dataService.selectedLanguages.subscribe(lng => {
      this.translateService.use(lng);
    })
  }

  ngAfterViewInit(): void {
  
  }
    setForecast(newData:any) {
      this.forecastData = newData;
       let actual = this.dataService.bindIcon([newData?.actual]);
      this.forecastData['actual'] = actual[0];
      
    }

    textToSpeech(text:any) {
      if(this.windoService.isBrowser()) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "hi-IN";
      utterance.pitch = 1;  
      utterance.rate = 1; 
      speechSynthesis.speak(utterance);
      }
    }

}
