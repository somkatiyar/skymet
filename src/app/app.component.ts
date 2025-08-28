import { AfterViewInit, Component, Renderer2 } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './pages/header/header.component';
import { FooterComponent } from './pages/footer/footer.component';
import { WindowService } from './services/window.service';
import { filter } from 'rxjs';
import { NativeService } from './mobile-app/service/native.service';
import { CommonModule } from '@angular/common';
import { NativeFooterComponent } from './mobile-app/native-footer/native-footer.component';
import { NativeHeaderComponent } from './mobile-app/native-header/native-header.component';
import { PullToRefreshService } from './mobile-app/service/pull-to-refresh.service';
import { App as CapacitorApp } from '@capacitor/app';
import { Toast } from '@capacitor/toast';
import { NotificationService } from './mobile-app/service/notification.service';
import { StatusBar, Style } from '@capacitor/status-bar';
import { LocationService } from './services/location.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HeaderComponent,FooterComponent,CommonModule,NativeFooterComponent,NativeHeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit {
  title = 'skymetweather';
  staticForecastData={

    "metainfo": {
      "TEHSIL_ID": 7970,
      "LATITUDE": 28.6397,
      "LONGITUDE": 77.2197,
      "TEHSIL_ALIAS_NAME": "NEW DELHI",
      "hi": "नई दिल्ली",
      "mr": "न्यू दिल्ली ",
      "ta": "நியூ டெல்லி",
      "or": "ନିଉ ଦିଲ୍ଲୀ ",
      "pa": "ਨਵੀਂ ਦਿੱਲੀ ",
      "bn": "নয়া দিল্লী",
      "te": "న్యూ ఢిల్లీ",
      "gu": "ન્યૂ ડેલ્હી",
      "ml": "ന്യൂ ഡെല്‍ഹി",
      "kn": "ನ್ಯೂ ಡೆಳ್‌ಹಿ",
      "DISTRICT_NAME": "Central Delhi",
      "STATE_NAME": "Delhi"
    },
    "forecast": [
      {
        "type": "forecast",
        "date": "Sun,Aug,17",
        "weekday": "Sunday",
        "id": 16709,
        "fid": 16709,
        "temp_max": 33,
        "temp_min": 25,
        "rh_min": 69,
        "rh_max": 95,
        "rain_prob": "35",
        "rain_qty": 4,
        "raintext": "Light Rain",
        "description": "LIGHT RAIN",
        "icon": "CLOUDYLIGHTRAIN",
        "wind_spd": 9,
        "wind_shrt": "SE",
        "night": false,
        "heatindex": "warmhumid",
        "sunrise": "05:51",
        "sunset": "18:59",
        "moonrise": "18:55",
        "moonset": "08:39",
        "weatherText": " Today's weather will start with light rain in the morning as temperatures range from 22.0°C to 27.0°C, accompanied by high humidity levels between 81% and 96%. Cloud cover is minimal at 7%, but expect approximately 8.0 mm of rainfall. Winds will be moderate at around 12.5 km/h. In the evening, conditions are expected to shift to cloudy skies with slightly cooler temperatures between 25.0°C and 28.0°C and a decrease in humidity from 76% to 84%. Rainfall will lessen to about 3.0 mm, while winds will pick up to 23.2 km/h. Nighttime brings another round of light rain with temperatures cooling down between 21.0°C and 24.0°C, high humidity levels from 87% to 97%, minimal cloud cover at 6%, and a similar amount of rainfall as the morning, around 12.0 mm, with winds slowing down slightly to 10.2 km/h."
      },
      {
        "type": "forecast",
        "date": "Mon,Aug,18",
        "weekday": "Monday",
        "id": 16709,
        "fid": 16709,
        "temp_max": 31,
        "temp_min": 26,
        "rh_min": 76,
        "rh_max": 95,
        "rain_prob": "70",
        "rain_qty": 15,
        "raintext": "Intermittent Rain Showers",
        "description": "RAIN",
        "icon": "CLOUDYLIGHTRAIN",
        "wind_spd": 10,
        "wind_shrt": "SE",
        "night": false,
        "heatindex": "warmhumid",
        "sunrise": "05:51",
        "sunset": "18:58",
        "moonrise": "19:55",
        "moonset": "09:46",
        "weatherText": " Today, we can expect a predominantly cloudy day with mild temperatures. The morning will see the mercury ranging between 21°C and 27°C, accompanied by high humidity levels of 79% to 95%, minimal rainfall, and wind speeds of around 14.7 km/h. As evening approaches, temperatures will slightly increase with a range of 26°C to 28°C, while the humidity drops marginally to between 75% and 81%. Winds are anticipated to pick up, reaching speeds nearing 28 km/h. The night will bring cooler temperatures from 21°C down to 24°C, with a similar high humidity of 83%-95%, steady cloud cover at 4%, and lighter winds around 11.3 km/h under partly cloudy skies. Rainfall is not expected throughout the day."
      },
      {
        "type": "forecast",
        "date": "Tue,Aug,19",
        "weekday": "Tuesday",
        "id": 16709,
        "fid": 16709,
        "temp_max": 31,
        "temp_min": 25,
        "rh_min": 74,
        "rh_max": 95,
        "rain_prob": "30",
        "rain_qty": 3,
        "raintext": "Light Rain",
        "description": "LIGHT RAIN",
        "icon": "CLOUDYLIGHTRAIN",
        "wind_spd": 11,
        "wind_shrt": "E",
        "night": false,
        "heatindex": "warmhumid",
        "sunrise": "05:52",
        "sunset": "18:57",
        "moonrise": "21:00",
        "moonset": "10:46",
        "weatherText": " Today's weather will present a stable pattern with temperatures ranging between 21.0°C and 28.0°C throughout the day, experiencing mild to moderate wind speeds from 9.7 km/h in the evening up to 23.8 km/h during the evening hours. Humidity levels will fluctuate slightly with a high of 95% at night and lows around 76%. The skies are expected to remain partly cloudy, showing minimal rainfall. Enjoy your day under mostly clear conditions with just occasional clouds in sight."
      },
      {
        "type": "forecast",
        "date": "Wed,Aug,20",
        "weekday": "Wednesday",
        "id": 16709,
        "fid": 16709,
        "temp_max": 33,
        "temp_min": 25,
        "rh_min": 67,
        "rh_max": 95,
        "rain_prob": "0",
        "rain_qty": 0,
        "raintext": "No Rain",
        "description": "PARTLY CLOUDY",
        "icon": "PARTLYCLOUDY",
        "wind_spd": 11,
        "wind_shrt": "E",
        "night": false,
        "heatindex": "warmhumid",
        "sunrise": "05:52",
        "sunset": "18:56",
        "moonrise": "22:06",
        "moonset": "11:38",
        "weatherText": " Today's weather will be predominantly cloudy throughout the day with morning temperatures ranging from 21.0°C to 27.0°C, and evening temperatures slightly higher between 27.0°C and 29.0°C. Humidity levels will vary from moderate to high, starting at 77% in the morning, decreasing to around 72% by evening, and rising again overnight to a range of 80%-92%. Wind speeds are expected to be relatively gentle, with mild breezes in the morning and evenings, peaking during the night. No precipitation is forecasted for the day."
      },
      {
        "type": "forecast",
        "date": "Thu,Aug,21",
        "weekday": "Thursday",
        "id": 16709,
        "fid": 16709,
        "temp_max": 33,
        "temp_min": 24,
        "rh_min": 67,
        "rh_max": 95,
        "rain_prob": "0",
        "rain_qty": 0,
        "raintext": "No Rain",
        "description": "PARTLY CLOUDY",
        "icon": "PARTLYCLOUDY",
        "wind_spd": 10,
        "wind_shrt": "E",
        "night": false,
        "heatindex": "warmhumid",
        "sunrise": "05:53",
        "sunset": "18:55",
        "moonrise": "23:11",
        "moonset": "12:23",
        "weatherText": " Today's weather presents a cool start with morning temperatures ranging from 21.0°C to 27.0°C, accompanied by high humidity levels of 78%-92%. Expect minimal cloud cover at around 4%, and no rainfall in the early hours as wind speeds are moderate at 10.3 km/h. The condition remains predominantly cloudy throughout this period. As evening approaches, temperatures slightly rise to a range of 28.0°C-30.0°C with lower humidity levels between 70% and 75%. Cloud cover decreases to about 3%, while winds pick up speed, reaching 19.0 km/h, though still without any precipitation. The conditions are partly cloudy in the evening. Nighttime brings a slight decrease in temperature with readings from 21.0°C-26.0°C and consistent high humidity of 78%-92%. Cloud cover remains steady at around 4%, without any rainfall, as winds calm down to similar speeds as the morning, about 10.2 km/h. The night will be predominantly cloudy under these conditions."
      },
      {
        "type": "forecast",
        "date": "Fri,Aug,22",
        "weekday": "Friday",
        "id": 16709,
        "fid": 16709,
        "temp_max": 32,
        "temp_min": 25,
        "rh_min": 70,
        "rh_max": 95,
        "rain_prob": "60",
        "rain_qty": 11,
        "raintext": "Intermittent Rain Showers",
        "description": "RAIN",
        "icon": "CLOUDYLIGHTRAIN",
        "wind_spd": 9,
        "wind_shrt": "E",
        "night": false,
        "heatindex": "warmhumid",
        "sunrise": "05:53",
        "sunset": "18:54",
        "moonrise": null,
        "moonset": "13:00",
        "weatherText": "Description unavailable."
      },
      {
        "type": "forecast",
        "date": "Sat,Aug,23",
        "weekday": "Saturday",
        "id": 16709,
        "fid": 16709,
        "temp_max": 30,
        "temp_min": 25,
        "rh_min": 77,
        "rh_max": 94,
        "rain_prob": "50",
        "rain_qty": 8,
        "raintext": "One or Two Short Spell",
        "description": "RAIN",
        "icon": "CLOUDYLIGHTRAIN",
        "wind_spd": 13,
        "wind_shrt": "E",
        "night": false,
        "heatindex": "warmhumid",
        "sunrise": "05:54",
        "sunset": "18:53",
        "moonrise": "00:13",
        "moonset": "13:33",
        "weatherText": "Description unavailable."
      },
      {
        "type": "forecast",
        "date": "Sun,Aug,24",
        "weekday": "Sunday",
        "id": 16709,
        "fid": 16709,
        "temp_max": 28,
        "temp_min": 24,
        "rh_min": 85,
        "rh_max": 95,
        "rain_prob": "95",
        "rain_qty": 31,
        "raintext": "Couple Of Moderate Showers",
        "description": "MODERATE RAIN",
        "icon": "CLOUDYMODERATERAIN",
        "wind_spd": 13,
        "wind_shrt": "SE",
        "night": false,
        "heatindex": "warmhumid",
        "sunrise": "05:54",
        "sunset": "18:52",
        "moonrise": "01:12",
        "moonset": "14:02",
        "weatherText": "Description unavailable."
      },
      {
        "type": "forecast",
        "date": "Mon,Aug,25",
        "weekday": "Monday",
        "id": 16709,
        "fid": 16709,
        "temp_max": 29,
        "temp_min": 25,
        "rh_min": 79,
        "rh_max": 95,
        "rain_prob": "60",
        "rain_qty": 12,
        "raintext": "Intermittent Rain Showers",
        "description": "RAIN",
        "icon": "CLOUDYLIGHTRAIN",
        "wind_spd": 12,
        "wind_shrt": "SE",
        "night": false,
        "heatindex": "warmhumid",
        "sunrise": "05:55",
        "sunset": "18:51",
        "moonrise": "02:09",
        "moonset": "14:30",
        "weatherText": "Description unavailable."
      },
      {
        "type": "forecast",
        "date": "Tue,Aug,26",
        "weekday": "Tuesday",
        "id": 16709,
        "fid": 16709,
        "temp_max": 29,
        "temp_min": 24,
        "rh_min": 80,
        "rh_max": 95,
        "rain_prob": "50",
        "rain_qty": 8,
        "raintext": "One or Two Short Spell",
        "description": "RAIN",
        "icon": "CLOUDYLIGHTRAIN",
        "wind_spd": 11,
        "wind_shrt": "SE",
        "night": false,
        "heatindex": "warmhumid",
        "sunrise": "05:55",
        "sunset": "18:49",
        "moonrise": "03:03",
        "moonset": "14:57",
        "weatherText": "Description unavailable."
      },
      {
        "type": "forecast",
        "date": "Wed,Aug,27",
        "weekday": "Wednesday",
        "id": 16709,
        "fid": 16709,
        "temp_max": 30,
        "temp_min": 24,
        "rh_min": 75,
        "rh_max": 95,
        "rain_prob": "0",
        "rain_qty": 0,
        "raintext": "No Rain",
        "description": "CLOUDY",
        "icon": "CLOUDY",
        "wind_spd": 10,
        "wind_shrt": "SE",
        "night": false,
        "heatindex": "warmhumid",
        "sunrise": "05:56",
        "sunset": "18:48",
        "moonrise": "03:57",
        "moonset": "15:25",
        "weatherText": ""
      },
      {
        "type": "forecast",
        "date": "Thu,Aug,28",
        "weekday": "Thursday",
        "id": 16709,
        "fid": 16709,
        "temp_max": 31,
        "temp_min": 24,
        "rh_min": 73,
        "rh_max": 95,
        "rain_prob": "40",
        "rain_qty": 5,
        "raintext": "Light Rain",
        "description": "RAIN",
        "icon": "CLOUDYLIGHTRAIN",
        "wind_spd": 10,
        "wind_shrt": "SE",
        "night": false,
        "heatindex": "warmhumid",
        "sunrise": "05:56",
        "sunset": "18:47",
        "moonrise": "04:52",
        "moonset": "15:55",
        "weatherText": ""
      },
      {
        "type": "forecast",
        "date": "Fri,Aug,29",
        "weekday": "Friday",
        "id": 16709,
        "fid": 16709,
        "temp_max": 32,
        "temp_min": 25,
        "rh_min": 70,
        "rh_max": 95,
        "rain_prob": "30",
        "rain_qty": 3,
        "raintext": "Light Rain",
        "description": "LIGHT RAIN",
        "icon": "CLOUDYLIGHTRAIN",
        "wind_spd": 11,
        "wind_shrt": "E",
        "night": false,
        "heatindex": "warmhumid",
        "sunrise": "05:57",
        "sunset": "18:46",
        "moonrise": "05:47",
        "moonset": "16:29",
        "weatherText": ""
      },
      {
        "type": "forecast",
        "date": "Sat,Aug,30",
        "weekday": "Saturday",
        "id": 16709,
        "fid": 16709,
        "temp_max": 30,
        "temp_min": 25,
        "rh_min": 75,
        "rh_max": 95,
        "rain_prob": "0",
        "rain_qty": 0,
        "raintext": "No Rain",
        "description": "CLOUDY",
        "icon": "CLOUDY",
        "wind_spd": 10,
        "wind_shrt": "SE",
        "night": false,
        "heatindex": "warmhumid",
        "sunrise": "05:57",
        "sunset": "18:45",
        "moonrise": "06:44",
        "moonset": "17:06",
        "weatherText": ""
      },
      {
        "type": "forecast",
        "date": "Sun,Aug,31",
        "weekday": "Sunday",
        "id": 16709,
        "fid": 16709,
        "temp_max": 31,
        "temp_min": 24,
        "rh_min": 72,
        "rh_max": 95,
        "rain_prob": "0",
        "rain_qty": 0,
        "raintext": "No Rain",
        "description": "CLOUDY",
        "icon": "CLOUDY",
        "wind_spd": 8,
        "wind_shrt": "SE",
        "night": false,
        "heatindex": "warmhumid",
        "sunrise": "05:58",
        "sunset": "18:44",
        "moonrise": "07:41",
        "moonset": "17:50",
        "weatherText": ""
      }
    ],
    "hourly": [
      {
        "type": "hourly",
        "toorder": "2025-08-17 15:00:00",
        "day": "Sun",
        "id": 16709,
        "datediff": 0,
        "ist": "3 PM",
        "temp_max": "32",
        "rain_prob": 0,
        "rain_qty": 0,
        "description": "Cloudy",
        "icon": "CLOUDY",
        "humidity": 72,
        "windspd": 12,
        "winddir": 103,
        "winddirtxt": "ESE",
        "isnight": false,
        "night": false,
        "dew_point": 23,
        "feelslike_temp": 39
      },
      {
        "type": "hourly",
        "toorder": "2025-08-17 16:00:00",
        "day": "Sun",
        "id": 16709,
        "datediff": 0,
        "ist": "4 PM",
        "temp_max": "32",
        "rain_prob": 0,
        "rain_qty": 0,
        "description": "Cloudy",
        "icon": "CLOUDY",
        "humidity": 72,
        "windspd": 11,
        "winddir": 107,
        "winddirtxt": "ESE",
        "isnight": false,
        "night": false,
        "dew_point": 23,
        "feelslike_temp": 39
      },
      {
        "type": "hourly",
        "toorder": "2025-08-17 17:00:00",
        "day": "Sun",
        "id": 16709,
        "datediff": 0,
        "ist": "5 PM",
        "temp_max": "32",
        "rain_prob": 0,
        "rain_qty": 0,
        "description": "Cloudy",
        "icon": "CLOUDY",
        "humidity": 73,
        "windspd": 11,
        "winddir": 115,
        "winddirtxt": "SE",
        "isnight": false,
        "night": false,
        "dew_point": 23,
        "feelslike_temp": 39
      },
      {
        "type": "hourly",
        "toorder": "2025-08-17 18:00:00",
        "day": "Sun",
        "id": 16709,
        "datediff": 0,
        "ist": "6 PM",
        "temp_max": "31",
        "rain_prob": 0,
        "rain_qty": 0,
        "description": "PARTLY CLOUDY",
        "icon": "PARTLYCLOUDY",
        "humidity": 74,
        "windspd": 10,
        "winddir": 123,
        "winddirtxt": "SE",
        "isnight": false,
        "night": false,
        "dew_point": 23,
        "feelslike_temp": 38
      },
      {
        "type": "hourly",
        "toorder": "2025-08-17 19:00:00",
        "day": "Sun",
        "id": 16709,
        "datediff": 0,
        "ist": "7 PM",
        "temp_max": "30",
        "rain_prob": 0,
        "rain_qty": 0,
        "description": "PARTLY CLOUDY",
        "icon": "PARTLYCLOUDY",
        "humidity": 78,
        "windspd": 8,
        "winddir": 120,
        "winddirtxt": "SE",
        "isnight": true,
        "night": true,
        "dew_point": 24,
        "feelslike_temp": 37
      },
      {
        "type": "hourly",
        "toorder": "2025-08-17 20:00:00",
        "day": "Sun",
        "id": 16709,
        "datediff": 0,
        "ist": "8 PM",
        "temp_max": "29",
        "rain_prob": 0,
        "rain_qty": 0,
        "description": "PARTLY CLOUDY",
        "icon": "PARTLYCLOUDY",
        "humidity": 82,
        "windspd": 7,
        "winddir": 113,
        "winddirtxt": "SE",
        "isnight": true,
        "night": true,
        "dew_point": 25,
        "feelslike_temp": 36
      },
      {
        "type": "hourly",
        "toorder": "2025-08-17 21:00:00",
        "day": "Sun",
        "id": 16709,
        "datediff": 0,
        "ist": "9 PM",
        "temp_max": "29",
        "rain_prob": 25,
        "rain_qty": 0,
        "description": "CLOUDY",
        "icon": "CLOUDY",
        "humidity": 86,
        "windspd": 6,
        "winddir": 81,
        "winddirtxt": "E",
        "isnight": true,
        "night": true,
        "dew_point": 25,
        "feelslike_temp": 36
      },
      {
        "type": "hourly",
        "toorder": "2025-08-17 22:00:00",
        "day": "Sun",
        "id": 16709,
        "datediff": 0,
        "ist": "10 PM",
        "temp_max": "28",
        "rain_prob": 35,
        "rain_qty": 0,
        "description": "CLOUDY",
        "icon": "CLOUDY",
        "humidity": 89,
        "windspd": 6,
        "winddir": 88,
        "winddirtxt": "E",
        "isnight": true,
        "night": true,
        "dew_point": 26,
        "feelslike_temp": 35
      },
      {
        "type": "hourly",
        "toorder": "2025-08-17 23:00:00",
        "day": "Sun",
        "id": 16709,
        "datediff": 0,
        "ist": "11 PM",
        "temp_max": "27",
        "rain_prob": 35,
        "rain_qty": 0,
        "description": "CLOUDY",
        "icon": "CLOUDY",
        "humidity": 91,
        "windspd": 6,
        "winddir": 119,
        "winddirtxt": "SE",
        "isnight": true,
        "night": true,
        "dew_point": 26,
        "feelslike_temp": 35
      },
      {
        "type": "hourly",
        "toorder": "2025-08-18 00:00:00",
        "day": "Mon",
        "id": 16709,
        "datediff": 1,
        "ist": "12 AM",
        "temp_max": "27",
        "rain_prob": 25,
        "rain_qty": 0,
        "description": "CLOUDY",
        "icon": "CLOUDY",
        "humidity": 93,
        "windspd": 7,
        "winddir": 129,
        "winddirtxt": "SE",
        "isnight": true,
        "night": true,
        "dew_point": 26,
        "feelslike_temp": 35
      },
      {
        "type": "hourly",
        "toorder": "2025-08-18 01:00:00",
        "day": "Mon",
        "id": 16709,
        "datediff": 1,
        "ist": "1 AM",
        "temp_max": "27",
        "rain_prob": 0,
        "rain_qty": 0,
        "description": "PARTLY CLOUDY",
        "icon": "PARTLYCLOUDY",
        "humidity": 94,
        "windspd": 6,
        "winddir": 122,
        "winddirtxt": "SE",
        "isnight": true,
        "night": true,
        "dew_point": 26,
        "feelslike_temp": 34
      },
      {
        "type": "hourly",
        "toorder": "2025-08-18 02:00:00",
        "day": "Mon",
        "id": 16709,
        "datediff": 1,
        "ist": "2 AM",
        "temp_max": "26",
        "rain_prob": 0,
        "rain_qty": 0,
        "description": "PARTLY CLOUDY",
        "icon": "PARTLYCLOUDY",
        "humidity": 95,
        "windspd": 6,
        "winddir": 112,
        "winddirtxt": "ESE",
        "isnight": true,
        "night": true,
        "dew_point": 26,
        "feelslike_temp": 34
      },
      {
        "type": "hourly",
        "toorder": "2025-08-18 03:00:00",
        "day": "Mon",
        "id": 16709,
        "datediff": 1,
        "ist": "3 AM",
        "temp_max": "26",
        "rain_prob": 25,
        "rain_qty": 0,
        "description": "CLOUDY",
        "icon": "CLOUDY",
        "humidity": 95,
        "windspd": 7,
        "winddir": 102,
        "winddirtxt": "ESE",
        "isnight": true,
        "night": true,
        "dew_point": 26,
        "feelslike_temp": 33
      },
      {
        "type": "hourly",
        "toorder": "2025-08-18 04:00:00",
        "day": "Mon",
        "id": 16709,
        "datediff": 1,
        "ist": "4 AM",
        "temp_max": "26",
        "rain_prob": 30,
        "rain_qty": 0,
        "description": "CLOUDY",
        "icon": "CLOUDY",
        "humidity": 95,
        "windspd": 7,
        "winddir": 115,
        "winddirtxt": "SE",
        "isnight": true,
        "night": true,
        "dew_point": 25,
        "feelslike_temp": 33
      },
      {
        "type": "hourly",
        "toorder": "2025-08-18 05:00:00",
        "day": "Mon",
        "id": 16709,
        "datediff": 1,
        "ist": "5 AM",
        "temp_max": "26",
        "rain_prob": 25,
        "rain_qty": 0,
        "description": "CLOUDY",
        "icon": "CLOUDY",
        "humidity": 95,
        "windspd": 7,
        "winddir": 126,
        "winddirtxt": "SE",
        "isnight": true,
        "night": true,
        "dew_point": 25,
        "feelslike_temp": 33
      },
      {
        "type": "hourly",
        "toorder": "2025-08-18 06:00:00",
        "day": "Mon",
        "id": 16709,
        "datediff": 1,
        "ist": "6 AM",
        "temp_max": "26",
        "rain_prob": 30,
        "rain_qty": 0,
        "description": "CLOUDY",
        "icon": "CLOUDY",
        "humidity": 95,
        "windspd": 6,
        "winddir": 123,
        "winddirtxt": "SE",
        "isnight": false,
        "night": false,
        "dew_point": 25,
        "feelslike_temp": 33
      },
      {
        "type": "hourly",
        "toorder": "2025-08-18 07:00:00",
        "day": "Mon",
        "id": 16709,
        "datediff": 1,
        "ist": "7 AM",
        "temp_max": "27",
        "rain_prob": 50,
        "rain_qty": 2,
        "description": "LIGHT RAIN",
        "icon": "CLOUDYLIGHTRAIN",
        "humidity": 91,
        "windspd": 7,
        "winddir": 111,
        "winddirtxt": "ESE",
        "isnight": false,
        "night": false,
        "dew_point": 25,
        "feelslike_temp": 34
      },
      {
        "type": "hourly",
        "toorder": "2025-08-18 08:00:00",
        "day": "Mon",
        "id": 16709,
        "datediff": 1,
        "ist": "8 AM",
        "temp_max": "28",
        "rain_prob": 35,
        "rain_qty": 1,
        "description": "LIGHT RAIN",
        "icon": "CLOUDYLIGHTRAIN",
        "humidity": 85,
        "windspd": 12,
        "winddir": 114,
        "winddirtxt": "SE",
        "isnight": false,
        "night": false,
        "dew_point": 25,
        "feelslike_temp": 35
      },
      {
        "type": "hourly",
        "toorder": "2025-08-18 09:00:00",
        "day": "Mon",
        "id": 16709,
        "datediff": 1,
        "ist": "9 AM",
        "temp_max": "28",
        "rain_prob": 50,
        "rain_qty": 2,
        "description": "LIGHT RAIN",
        "icon": "CLOUDYLIGHTRAIN",
        "humidity": 85,
        "windspd": 14,
        "winddir": 123,
        "winddirtxt": "SE",
        "isnight": false,
        "night": false,
        "dew_point": 25,
        "feelslike_temp": 35
      },
      {
        "type": "hourly",
        "toorder": "2025-08-18 10:00:00",
        "day": "Mon",
        "id": 16709,
        "datediff": 1,
        "ist": "10 AM",
        "temp_max": "29",
        "rain_prob": 55,
        "rain_qty": 0,
        "description": "OVERCAST",
        "icon": "OVERCAST",
        "humidity": 82,
        "windspd": 13,
        "winddir": 126,
        "winddirtxt": "SE",
        "isnight": false,
        "night": false,
        "dew_point": 25,
        "feelslike_temp": 36
      },
      {
        "type": "hourly",
        "toorder": "2025-08-18 11:00:00",
        "day": "Mon",
        "id": 16709,
        "datediff": 1,
        "ist": "11 AM",
        "temp_max": "31",
        "rain_prob": 45,
        "rain_qty": 0,
        "description": "CLOUDY",
        "icon": "CLOUDY",
        "humidity": 77,
        "windspd": 16,
        "winddir": 128,
        "winddirtxt": "SE",
        "isnight": false,
        "night": false,
        "dew_point": 24,
        "feelslike_temp": 38
      },
      {
        "type": "hourly",
        "toorder": "2025-08-18 12:00:00",
        "day": "Mon",
        "id": 16709,
        "datediff": 1,
        "ist": "12 PM",
        "temp_max": "31",
        "rain_prob": 35,
        "rain_qty": 0,
        "description": "CLOUDY",
        "icon": "CLOUDY",
        "humidity": 76,
        "windspd": 15,
        "winddir": 127,
        "winddirtxt": "SE",
        "isnight": false,
        "night": false,
        "dew_point": 24,
        "feelslike_temp": 38
      },
      {
        "type": "hourly",
        "toorder": "2025-08-18 13:00:00",
        "day": "Mon",
        "id": 16709,
        "datediff": 1,
        "ist": "1 PM",
        "temp_max": "31",
        "rain_prob": 50,
        "rain_qty": 2,
        "description": "LIGHT RAIN",
        "icon": "CLOUDYLIGHTRAIN",
        "humidity": 77,
        "windspd": 13,
        "winddir": 120,
        "winddirtxt": "SE",
        "isnight": false,
        "night": false,
        "dew_point": 24,
        "feelslike_temp": 38
      },
      {
        "type": "hourly",
        "toorder": "2025-08-18 14:00:00",
        "day": "Mon",
        "id": 16709,
        "datediff": 1,
        "ist": "2 PM",
        "temp_max": "31",
        "rain_prob": 0,
        "rain_qty": 0,
        "description": "PARTLY CLOUDY",
        "icon": "PARTLYCLOUDY",
        "humidity": 78,
        "windspd": 13,
        "winddir": 135,
        "winddirtxt": "SE",
        "isnight": false,
        "night": false,
        "dew_point": 24,
        "feelslike_temp": 37
      }
    ],
    "actual": {
      "fid": "16709",
      "tmp": 33,
      "rain": 0,
      "hr": 71,
      "pm25": 0,
      "pm10": 0,
      "aqi_val": 0,
      "wind": 13,
      "wind_direction": "101",
      "wind_dir": "E",
      "aqi_param": "PM2.5",
      "cond_pm2": "",
      "msg_pm2": "",
      "mint": 25,
      "maxt": 33,
      "description": "CLOUDY",
      "precip": 25,
      "icon": "cloudy",
      "displaytime": "2025-08-17 14:42",
      "updated_time": "2025-08-17 14:18",
      "night": false,
      "dew_point": 23,
      "feelslike_temp": 39,
      "sunrise": "05:51",
      "sunset": "18:59",
      "moonrise": "18:55",
      "moonset": "08:39"
    },
    "weatherDescription": {
      "FID": "16709",
      "PHRASE": " From Saturday, August 16th to Friday, August 26th, expect mostly cloudy skies with temperatures ranging from a comfortable 21°C to a warm 32°C. Humidity levels will be high, varying between 63% and 97%. You may experience some rainfall throughout the period, accumulating up to 41mm in total. Winds should be moderate with an average speed of around 13.6 km/h."
    }

}
    private lastBackTime = 0;

  constructor(private windowService:WindowService,
    public nativeService:NativeService,
    private renderer: Renderer2,
    public locationService:LocationService,
    private pushService: NotificationService,
    private pullToRefreshService:PullToRefreshService,
    private router:Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        if(this.windowService.isBrowser()) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
        

   }

   ngAfterViewInit(): void {
     if(this.nativeService.getPlateform() == 'native' ) {
      this.setStyleGlobal();
      this.initStatusBar();

      this.pullToRefreshService.init(this.handleRefresh.bind(this));
        this.handleBackButton();
        this.pushService.initPush();
      //  if( this.nativeService.isUserLoggedIn()) {
      //   this.router.navigate(['/']);
      //  } else {
      //   this.router.navigate(['login']);
      //  }
      this.router.navigate(['location']);
      if(this.windowService.isBrowser()) {
        setTimeout(() => {
          this.router.navigate(['location']);
        }, 3000);
      }
     } 
     if(this.windowService.isBrowser()) {
      if(!localStorage.getItem('location')) {
       localStorage.setItem('location', JSON.stringify(this.staticForecastData));
      }
     }
     
   }

   setStyleGlobal() {
    if(this.nativeService.getPlateform() =="native") {

    this.renderer.setStyle(document.body, 'padding-bottom', '100px');
    //this.renderer.setStyle(document.body, 'margin-top', '0px');
  }
    } 

  async initStatusBar() {
     if(this.nativeService.getPlateform() =="native") {
    // Make status bar transparent and overlay the WebView
    await StatusBar.setOverlaysWebView({ overlay: true });
    await StatusBar.setBackgroundColor({ color: '#00000000' });
    await StatusBar.setStyle({ style: Style.Light });
      } // or Style.Dark
  }
   
handleRefresh() {
  if (this.windowService.isBrowser()) {
    const currentUrl = this.router.url;

    // Force re-navigation to the same route
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
}

  handleBackButton() {
    CapacitorApp.addListener('backButton', async () => {
      const url = this.router.url;

      // Only enable back-to-exit on the home/root page
      if (url === '/') {
        const currentTime = new Date().getTime();

        if (currentTime - this.lastBackTime < 2000) {
          CapacitorApp.exitApp();
        } else {
          
          this.lastBackTime = currentTime;
          await Toast.show({
            text: 'Press back again to exit',
            duration: 'short',
            position: 'top',
          });
        }
      } else {
        window.history.back(); 
      }
    });
  }
   hideSnackBar() {
    if(this.windowService.isBrowser()) {
          (document.getElementById('snackbar') as HTMLElement).classList.remove('show');
    }
    
  }

}
