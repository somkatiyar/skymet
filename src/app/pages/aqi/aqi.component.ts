import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, ChartType, registerables } from 'chart.js';
import { UvRaysComponent } from '../../shared/shared/widget/uv-rays/uv-rays.component';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
import { WindowService } from '../../services/window.service';
import { SeoService } from '../../services/seo.service';

Chart.register(...registerables);
@Component({
  selector: 'app-aqi',
  standalone: true,
  imports: [CommonModule, UvRaysComponent],
  templateUrl: './aqi.component.html',
  styleUrl: './aqi.component.scss'
})
export class AqiComponent {
  @ViewChild('barCanvas') barCanvas!: ElementRef<HTMLCanvasElement>;
  barChart: Chart | undefined;


  airQuality: any;
  metaInfo: any;
  actual: any;
  selectedChartTab = '24 hours';
  aqiStyle = {};
  minMax: any = [];
  aqiMeta = {
    title: "Air Quality Index (AQI) and Air Pollution information for Indian Cities | Skymet",
    description: "India Air Quality Index (AQI). Read the air pollution in India, get real-time, historical all India location weather data with AQI news.",
    keywords: `grap 3 delhi air pollution, दिल्ली में वायु प्रदूषण grap 3, grap 3, delhi grap 3, grap 3 restrictions in delhi, grap 3 in delhi, grap 3 restrictions, air pollution, delhi aqi, today’s aqi, aqi today, delhi aqi today, aqi noida, highest aqi in india, bareilly aqi today, best aqi city in india, aqi noida extension today, aqi indirapuram, aqi ghaziabad, today aqi in delhi, aqi near me, mumbai aqi, delhi temperature, air pollution, aqi, aqi in my city, aqi trend delhi, aqi trend mumbai, air pollution causes, effects of air pollution, what is air pollution, air quality index, AQI, indoor air quality, outdoor air quality, types of air pollutants, PM2.5, PM10, ozone layer protection, climate change, environmental health issues, air pollution solutions, how to reduce air pollution, clean air initiative, government air quality standards, respiratory health air pollution, impact of air pollution on environment, air filtration systems, real-time air quality data, live air pollution map, air pollution, air quality, AQI, air quality index, Delhi air pollution, India air pollution, causes of air pollution, effects of air pollution, air pollution today, air pollution levels, air pollution news`
  }
  constructor(public dataService: DataService,
    private windowService: WindowService,
    private cd: ChangeDetectorRef,
    private seoService: SeoService,
    private router: Router) {

  }

  ngOnInit(): void { }



  ngAfterViewInit(): void {

    this.getLocationFromLocalStoreage();
    this.airQuality && (this.aqiStyle = this.aqiConfig(this.airQuality?.current?.aqi).gradient);
    this.airQuality && this.getChartData('24 hours');
    this.airQuality && this.setAQI(this.airQuality?.current?.aqi);
    this.seoService.setAqiMetaTags(this.aqiMeta);
    this.cd.detectChanges();
  }

  getChartData(tab: any) {
    this.selectedChartTab = tab;

    var arr: any = [];
    this.minMax = [];
    if (this.selectedChartTab == '7 days') {
      this.getminMax(this.airQuality?.last7days);

      this.airQuality?.last7days.forEach((el: any) => {
        arr.push({
          labels: this.dataService.getToOrderDate(el.data_date),
          values: el.aqi_avg
        })
      })
    } else {
      this.getminMax(this.airQuality?.last24hours);

      this.airQuality?.last24hours.forEach((el: any) => {
        arr.push({
          labels: this.getTime(el.data_date),
          values: el.aqi
        })
      })

    }
    console.log(this.minMax);

    this.airQuality && this.createChart(arr);
  }

  getminMax(arr: any) {
    var minObj: any;
    var maxObj: any;
    if (this.selectedChartTab == '7 days') {
      const minVal = Math.min(...arr.map((o: any) => o.aqi_avg));
      const maxVal = Math.max(...arr.map((o: any) => o.aqi_avg));
      minObj = arr.find((o: any) => o.aqi_avg === minVal);
      maxObj = arr.find((o: any) => o.aqi_avg === maxVal);
      minObj['aqi'] = minObj['aqi_avg'];
      maxObj['aqi'] = maxObj['aqi_avg'];
      minObj['time'] = this.dataService.getToOrderDate(minObj['data_date']);
      maxObj['time'] = this.dataService.getToOrderDate(maxObj['data_date']);

    } else {
      const minVal = Math.min(...arr.map((o: any) => o.aqi));
      const maxVal = Math.max(...arr.map((o: any) => o.aqi));
      minObj = arr.find((o: any) => o.aqi === minVal);
      maxObj = arr.find((o: any) => o.aqi === maxVal);
      minObj['time'] = this.getTime(minObj['data_date']);
      maxObj['time'] = this.getTime(maxObj['data_date']);


    }
    this.minMax.push(minObj, maxObj)

  }

  getTime(s: any) {
    const [time, ampm] = s.split(" ")[1] ? [s.split(" ")[1], s.split(" ")[2]] : ["", ""];
    let h = time.split(":")[0];
    h = h.padStart(2, "0");
    return `${h} ${ampm}`;
  };

  getLocationFromLocalStoreage() {
    if (this.windowService.isBrowser()) {
      const loc: any = localStorage.getItem('location');
      try {
        const parsed = JSON.parse(loc);
        this.airQuality = parsed['aqi'];
        this.metaInfo = parsed['metainfo'];
        this.actual = parsed['actual'];
      } catch (e) {
        console.log(e);
      }
    }
  }



  createChart(chartData: any) {
    if (this.barChart) {
      this.barChart.destroy();
    }
    const ctx = this.barCanvas.nativeElement.getContext('2d');

    this.barChart = new Chart(ctx!, {
      type: 'bar' as ChartType,
      data: {
        labels: chartData.map((e: any) => e.labels),
        datasets: [
          {
            data: chartData.map((e: any) => e.values),
            borderRadius: { topLeft: 8, topRight: 8, bottomLeft: 8, bottomRight: 8 }, // smooth corners
            backgroundColor: chartData.map((e: any) => e.values).map((v: any) => this.aqiConfig(v).color),
            barThickness: 10,
            maxBarThickness: 25,
            categoryPercentage: 0.6,
            barPercentage: 0.8
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { enabled: true },
        },
        scales: {
          x: {
            grid: { display: false },
            border: { display: false },
            ticks: {
              color: '#666',
              maxRotation: 45,  // rotate labels 45 degrees
              minRotation: 45,
              callback: (val, index) => (chartData.map((e: any) => e.labels)[index]),
              //callback: (val, index) => (index % 2 === 0 ? chartData.map((e:any) => e.labels)[index] : ''),
            },
          },


          y: {
            grid: { display: false },
            border: { display: false },
            ticks: {
              color: '#666',
              stepSize: 10,
              // callback: (val, index) => (chartData.map((e:any) => e.values)[index]),
              //callback: (val, index) => (index % 2 === 0 ? chartData.map((e:any) => e.values)[index] : ''),
            },
          },
        },

      },
    });
  }


  aqiInfo: any;
  aqiSegments = [
    { label: 'Good', range: '0–50', color: '#69E244', width: 10 },
    { label: 'Satisfactory', range: '51–100', color: '#FFD153', width: 10 },
    { label: 'Moderate', range: '101–200', color: '#EF8433', width: 20 },
    { label: 'Poor', range: '201–300', color: '#EA3E25', width: 20 },
    { label: 'Very Poor', range: '301–400', color: '#9F3F92', width: 20 },
    { label: 'Severe', range: '401–500', color: '#A7032F', width: 20 },
  ];
  setAQI(aqi: any) {
    const max = 500;
    const clamped = Math.max(0, Math.min(max, Math.round(aqi)));
    const pct = (clamped / max) * 100;

    this.aqiInfo = {
      value: clamped,
      pct,
      ...this.aqiConfig(clamped)
    };

    this.cd.detectChanges();
  }
  getCategory(v: any) {
    if (v <= 50) return 'Good';
    if (v <= 100) return 'Moderate';
    if (v <= 150) return 'Unhealthy for Sensitive Groups';
    if (v <= 200) return 'Unhealthy';
    if (v <= 300) return 'Very Unhealthy';
    return 'Hazardous';
  }


  //

  aqiConfig(value: any) {
    if (value <= 50) return {
      condiation: 'Good',
      color: '#69E244',
      gradient: 'linear-gradient(180deg, rgba(255, 255, 255, 0.3) 3.62%, rgba(138, 210, 78, 0.3) 70.19%, rgba(255, 255, 255, 0.3) 96.63%)',
      advisory: `Breathe easy! It's a perfect day to get outside and enjoy the fresh, clean air.`,
      img: "https://skymetweather.com/img/aqi/good.png"
    };

    if (value <= 100) return {
      condiation: 'Satisfactory',
      color: '#FFD153',
      gradient: 'linear-gradient(180deg, rgba(255, 255, 255, 0.3) 3.62%, rgba(255, 209, 83, 0.3) 70.19%, rgba(255, 255, 255, 0.3) 96.63%)',
      advisory: `A good day for most! Listen to your body. Sensitive groups, just take it easy.`,
      img: "https://skymetweather.com/img/aqi/satisfactory.png"
    };

    if (value <= 200) return {
      condiation: 'Moderate',
      color: '#EF8433',
      gradient: 'linear-gradient(180deg, rgba(255, 255, 255, 0.3) 3.62%, rgba(239, 132, 51, 0.3) 70.19%, rgba(255, 255, 255, 0.3) 96.63%)',
      advisory: `Be air-aware. Time to protect sensitive (heart/lung) groups—limit their heavy exertion.`,
      img: "https://skymetweather.com/img/aqi/moderate.png"
    };

    if (value <= 300) return {
      condiation: 'Poor',
      color: '#EA3E25',
      gradient: 'linear-gradient(180deg, rgba(255, 255, 255, 0.3) 3.62%, rgba(234, 62, 37, 0.3) 70.19%, rgba(255, 255, 255, 0.3) 96.63%)',
      advisory: `Make it an indoor day. The air is poor and can cause discomfort for everyone.`,
      img: "https://skymetweather.com/img/aqi/poor.png"
    };

    if (value <= 400) return {
      condiation: 'Very Poor',
      color: ' #9F3F92',
      gradient: 'linear-gradient(180deg, rgba(255, 255, 255, 0.3) 3.62%, rgba(159, 63, 146, 0.3) 70.19%, rgba(255, 255, 255, 0.3) 96.63%)',
      advisory: `Protect your lungs. This air can lead to respiratory illness. Avoid outdoor exertion.`,
      img: "https://skymetweather.com/img/aqi/very_poor.png"
    };

    if (value <= 500) return {
      condiation: 'Severe',
      color: '#A7032F',
      gradient: 'linear-gradient(180deg, rgba(255, 255, 255, 0.3) 3.62%, rgba(167, 3, 47, 0.3) 70.19%, rgba(255, 255, 255, 0.3) 96.63%)',
      advisory: `HEALTH ALERT: This air is hazardous. Stay indoors, seal windows, and run air purifiers.`,
      img: "https://skymetweather.com/img/aqi/severe.png"
    };
    return {
      condiation: 'Severe',
      color: '#A7032F',
      gradient: 'linear-gradient(180deg, rgba(255, 255, 255, 0.3) 3.62%, rgba(167, 3, 47, 0.3) 70.19%, rgba(255, 255, 255, 0.3) 96.63%)',
      advisory: `HEALTH ALERT: This air is hazardous. Stay indoors, seal windows, and run air purifiers.`,
      img: "https://skymetweather.com/img/aqi/severe.png"
    };

  }
  // 🟢 PM10 Configuration
  pm10Config(value: any) {
    if (value <= 50) return {
      color: '#69E244',
      condiation: 'Good',
      gradient: 'linear-gradient(180deg, rgba(0,200,83,0.85) 0%, rgba(120,255,180,0.65) 50%, rgba(255,255,255,0.25) 100%)'
    };
    if (value <= 100) return {
      color: '#FFD153',
      condiation: 'Satisfactory',
      gradient: 'linear-gradient(180deg, rgba(174,234,0,0.85) 0%, rgba(220,255,120,0.65) 50%, rgba(255,255,255,0.25) 100%)'
    };
    if (value <= 250) return {
      color: '#EF8433',
      condiation: 'Moderate',
      gradient: 'linear-gradient(180deg, rgba(255,241,118,0.85) 0%, rgba(255,255,180,0.65) 50%, rgba(255,255,255,0.25) 100%)'
    };
    if (value <= 350) return {
      color: '#EA3E25',
      condiation: 'Poor',
      gradient: 'linear-gradient(180deg, rgba(255,167,38,0.85) 0%, rgba(255,213,79,0.65) 50%, rgba(255,255,255,0.25) 100%)'
    };
    if (value <= 430) return {
      color: '#9F3F92',
      condiation: 'Very Poor',
      gradient: 'linear-gradient(180deg, rgba(244,67,54,0.85) 0%, rgba(255,138,128,0.65) 50%, rgba(255,255,255,0.25) 100%)'
    };
    return {
      color: '#A7032F',
      condiation: 'Severe',
      gradient: 'linear-gradient(180deg, rgba(183,28,28,0.85) 0%, rgba(239,83,80,0.65) 50%, rgba(255,255,255,0.25) 100%)'
    };
  }

  // 🟢 PM2.5 Configuration
  pm25Config(value: any) {
    if (value <= 30) return {
      color: '#69E244',
      condiation: 'Good',
      gradient: 'linear-gradient(180deg, rgba(0,200,83,0.85) 0%, rgba(120,255,180,0.65) 50%, rgba(255,255,255,0.25) 100%)'
    };
    if (value <= 60) return {
      color: '#FFD153',
      condiation: 'Satisfactory',
      gradient: 'linear-gradient(180deg, rgba(174,234,0,0.85) 0%, rgba(220,255,120,0.65) 50%, rgba(255,255,255,0.25) 100%)'
    };
    if (value <= 90) return {
      color: '#EF8433',
      condiation: 'Moderate',
      gradient: 'linear-gradient(180deg, rgba(255,241,118,0.85) 0%, rgba(255,255,180,0.65) 50%, rgba(255,255,255,0.25) 100%)'
    };
    if (value <= 120) return {
      color: '#EA3E25',
      condiation: 'Poor',
      gradient: 'linear-gradient(180deg, rgba(255,167,38,0.85) 0%, rgba(255,213,79,0.65) 50%, rgba(255,255,255,0.25) 100%)'
    };
    if (value <= 250) return {
      color: '#9F3F92',
      condiation: 'Very Poor',
      gradient: 'linear-gradient(180deg, rgba(244,67,54,0.85) 0%, rgba(255,138,128,0.65) 50%, rgba(255,255,255,0.25) 100%)'
    };
    return {
      color: '#A7032F',
      condiation: 'Severe',
      gradient: 'linear-gradient(180deg, rgba(183,28,28,0.85) 0%, rgba(239,83,80,0.65) 50%, rgba(255,255,255,0.25) 100%)'
    };
  }

  // 🟢 NO2 Configuration
  no2Config(value: any) {
    if (value <= 40) return {
      color: '#69E244',
      condiation: 'Good',
      gradient: 'linear-gradient(180deg, rgba(0,200,83,0.85) 0%, rgba(120,255,180,0.65) 50%, rgba(255,255,255,0.25) 100%)'
    };
    if (value <= 80) return {
      color: '#FFD153',
      condiation: 'Satisfactory',
      gradient: 'linear-gradient(180deg, rgba(174,234,0,0.85) 0%, rgba(220,255,120,0.65) 50%, rgba(255,255,255,0.25) 100%)'
    };
    if (value <= 180) return {
      color: '#EF8433',
      condiation: 'Moderate',
      gradient: 'linear-gradient(180deg, rgba(255,241,118,0.85) 0%, rgba(255,255,180,0.65) 50%, rgba(255,255,255,0.25) 100%)'
    };
    if (value <= 280) return {
      color: '#EA3E25',
      condiation: 'Poor',
      gradient: 'linear-gradient(180deg, rgba(255,167,38,0.85) 0%, rgba(255,213,79,0.65) 50%, rgba(255,255,255,0.25) 100%)'
    };
    if (value <= 400) return {
      color: '#9F3F92',
      condiation: 'Very Poor',
      gradient: 'linear-gradient(180deg, rgba(244,67,54,0.85) 0%, rgba(255,138,128,0.65) 50%, rgba(255,255,255,0.25) 100%)'
    };
    return {
      color: '#A7032F',
      condiation: 'Severe',
      gradient: 'linear-gradient(180deg, rgba(183,28,28,0.85) 0%, rgba(239,83,80,0.65) 50%, rgba(255,255,255,0.25) 100%)'
    };
  }

  // 🟢 O3 Configuration
  o3Config(value: any) {
    if (value <= 50) return {
      color: '#69E244',
      condiation: 'Good',
      gradient: 'linear-gradient(180deg, rgba(0,200,83,0.85) 0%, rgba(120,255,180,0.65) 50%, rgba(255,255,255,0.25) 100%)'
    };
    if (value <= 100) return {
      color: '#FFD153',
      condiation: 'Satisfactory',
      gradient: 'linear-gradient(180deg, rgba(174,234,0,0.85) 0%, rgba(220,255,120,0.65) 50%, rgba(255,255,255,0.25) 100%)'
    };
    if (value <= 168) return {
      color: '#EF8433',
      condiation: 'Moderate',
      gradient: 'linear-gradient(180deg, rgba(255,241,118,0.85) 0%, rgba(255,255,180,0.65) 50%, rgba(255,255,255,0.25) 100%)'
    };
    if (value <= 208) return {
      color: '#EA3E25',
      condiation: 'Poor',
      gradient: 'linear-gradient(180deg, rgba(255,167,38,0.85) 0%, rgba(255,213,79,0.65) 50%, rgba(255,255,255,0.25) 100%)'
    };
    if (value <= 748) return {
      color: '#9F3F92',
      condiation: 'Very Poor',
      gradient: 'linear-gradient(180deg, rgba(244,67,54,0.85) 0%, rgba(255,138,128,0.65) 50%, rgba(255,255,255,0.25) 100%)'
    };
    return {
      color: '#A7032F',
      condiation: 'Severe',
      gradient: 'linear-gradient(180deg, rgba(183,28,28,0.85) 0%, rgba(239,83,80,0.65) 50%, rgba(255,255,255,0.25) 100%)'
    };
  }

  // 🟢 SO2 Configuration
  so2Config(value: any) {
    if (value <= 40) return {
      color: '#00B150',
      condiation: 'Good',
      gradient: 'linear-gradient(180deg, rgba(0,200,83,0.85) 0%, rgba(120,255,180,0.65) 50%, rgba(255,255,255,0.25) 100%)'
    };
    if (value <= 80) return {
      color: '#93CF55',
      condiation: 'Satisfactory',
      gradient: 'linear-gradient(180deg, rgba(174,234,0,0.85) 0%, rgba(220,255,120,0.65) 50%, rgba(255,255,255,0.25) 100%)'
    };
    if (value <= 380) return {
      color: '#FEFE06',
      condiation: 'Moderate',
      gradient: 'linear-gradient(180deg, rgba(255,241,118,0.85) 0%, rgba(255,255,180,0.65) 50%, rgba(255,255,255,0.25) 100%)'
    };
    if (value <= 800) return {
      color: '#FF9A00',
      condiation: 'Poor',
      gradient: 'linear-gradient(180deg, rgba(255,167,38,0.85) 0%, rgba(255,213,79,0.65) 50%, rgba(255,255,255,0.25) 100%)'
    };
    if (value <= 1600) return {
      color: '#F70500',
      condiation: 'Very Poor',
      gradient: 'linear-gradient(180deg, rgba(244,67,54,0.85) 0%, rgba(255,138,128,0.65) 50%, rgba(255,255,255,0.25) 100%)'
    };
    return {
      color: '#CA0001',
      condiation: 'Severe',
      gradient: 'linear-gradient(180deg, rgba(183,28,28,0.85) 0%, rgba(239,83,80,0.65) 50%, rgba(255,255,255,0.25) 100%)'
    };
  }

toggleInfoBox(id: any) {
  if (this.windowService.isBrowser()) {
    const infoIcon:any = document.getElementById("infoIcon_" + id);
    const infoBox:any = document.getElementById("infoBox_" + id);

    // Prevent adding event listener multiple times
    if (!infoIcon.hasAttribute("listener-added")) {

      infoIcon.addEventListener("click", () => {
        infoBox.style.display =
          infoBox.style.display === "block" ? "none" : "block";
      });

      document.addEventListener("click", (e) => {
        if (!infoIcon.contains(e.target) && !infoBox.contains(e.target)) {
          infoBox.style.display = "none";
        }
      });

      infoIcon.setAttribute("listener-added", "true");
    }
  }
}


}
