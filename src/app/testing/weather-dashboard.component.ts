import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HourlyForecastComponent } from "./hourly-forecast.component";
import { WeatherPatternsComponent } from "./weather-patterns.component";
import { NewsSectionComponent } from "./news-section.component";
import { AdvertisementComponent } from "./advertisement.component";

@Component({
  selector: "app-weather-dashboard",
  standalone: true,
  imports: [
    CommonModule,
    HourlyForecastComponent,
    WeatherPatternsComponent,
    NewsSectionComponent,
    AdvertisementComponent,
  ],
  template: `
    <main class="dashboard-container">
      <div class="dashboard-content">
        <app-hourly-forecast></app-hourly-forecast>
        <app-advertisement></app-advertisement>
        <app-weather-patterns></app-weather-patterns>
        <app-news-section></app-news-section>
        <app-advertisement></app-advertisement>
      </div>
    </main>
  `,
  styles: [
    `
      .dashboard-container {
        background-color: rgba(245, 245, 245, 1);
        margin: 0 auto;
        max-width: 480px;
        width: 100%;
        overflow: hidden;
      }
      .dashboard-content {
        background-color: #fff;
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
    `,
  ],
})
export class WeatherDashboardComponent {}
