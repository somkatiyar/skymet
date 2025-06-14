import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { WeatherHeaderComponent } from "./weather-header.component";
import { WeatherLocationComponent } from "./weather-location.component";
import { WeatherCurrentComponent } from "./weather-current.component";
import { WeatherForecastComponent } from "./weather-forecast.component";
import { WeatherHourlyComponent } from "./weather-hourly.component";
import { WeatherBuddyComponent } from "./weather-buddy.component";
import { WeatherAdvertisementComponent } from "./weather-advertisement.component";

@Component({
  selector: "weather-view",
  standalone: true,
  imports: [
    CommonModule,
    WeatherHeaderComponent,
    WeatherLocationComponent,
    WeatherCurrentComponent,
    WeatherForecastComponent,
    WeatherHourlyComponent,
    WeatherBuddyComponent,
    WeatherAdvertisementComponent,
  ],
  template: `
    <main class="weather-container">
      <section class="weather-main">
        <weather-header></weather-header>
        <div class="weather-content">
          <weather-location></weather-location>
          <weather-current></weather-current>
        </div>
      </section>
      <section class="weather-details">
        <weather-forecast></weather-forecast>
        <weather-buddy></weather-buddy>
        <weather-hourly></weather-hourly>
        <weather-advertisement></weather-advertisement>
      </section>
    </main>
  `,
  styles: [
    `
      .weather-container {
        background-color: rgba(245, 245, 245, 1);
        margin-left: auto;
        margin-right: auto;
        max-width: 1200px;
        width: 100%;
        padding-bottom: 54px;
        overflow: hidden;
        transition: all 0.3s ease;
      }

      .weather-main {
        width: 100%;
        padding-bottom: 276px;
      }

      .weather-content {
        display: flex;
        margin-bottom: -55px;
        align-items: stretch;
      }

      .weather-details {
        background-color: rgba(255, 255, 255, 1);
        z-index: 10;
        margin-top: -276px;
        width: 100%;
      }

      @media (max-width: 991px) {
        .weather-container {
          max-width: 768px;
        }
      }

      @media (max-width: 640px) {
        .weather-container {
          max-width: 480px;
        }
      }
    `,
  ],
})
export class WeatherViewComponent {}
