import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HourlyForecast } from "./shared-types";

@Component({
  selector: "app-hourly-forecast",
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="forecast-container">
      <h2 class="forecast-title">Hourly Forecast</h2>
      <div class="forecast-list">
        <article class="forecast-card" *ngFor="let forecast of forecasts">
          <p class="forecast-time">{{ forecast.time }}</p>
          <img
            *ngIf="forecast.iconUrl"
            [src]="forecast.iconUrl"
            class="forecast-icon"
            alt="Weather icon"
          />
          <p class="forecast-temp">{{ forecast.temperature }}</p>
        </article>
      </div>
      <button class="action-btn">View 7 days forecast</button>
    </section>
  `,
  styles: [
    `
      .forecast-container {
        background-color: #fff;
        padding: 24px 16px;
        font-family:
          Raleway,
          -apple-system,
          Roboto,
          Helvetica,
          sans-serif;
      }
      .forecast-title {
        font-size: 20px;
        font-weight: 800;
        letter-spacing: -0.6px;
        line-height: 1.2;
        color: #000;
      }
      .forecast-list {
        display: flex;
        margin-top: 16px;
        gap: 12px;
        white-space: nowrap;
        text-align: center;
      }
      .forecast-card {
        border-radius: 12px;
        background-color: rgba(245, 245, 245, 1);
        padding: 16px;
        width: 71px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
      .forecast-time {
        font-size: 14px;
        font-weight: 600;
        line-height: 1.2;
      }
      .forecast-icon {
        width: 36px;
        height: 36px;
        margin-top: 12px;
        object-fit: contain;
      }
      .forecast-temp {
        margin-top: 12px;
        font-size: 20px;
        font-weight: 700;
        line-height: 1.2;
      }
      .action-btn {
        width: 100%;
        margin-top: 16px;
        border-radius: 250px;
        padding: 8px 16px;
        font-family:
          Roboto,
          -apple-system,
          Roboto,
          Helvetica,
          sans-serif;
        font-size: 16px;
        color: rgba(0, 117, 194, 1);
        font-weight: 700;
        letter-spacing: -0.08px;
        text-align: center;
        background: none;
        border: none;
        cursor: pointer;
      }
    `,
  ],
})
export class HourlyForecastComponent {
  forecasts: HourlyForecast[] = [
    {
      time: "Now",
      temperature: "18°",
      iconUrl:
        "https://cdn.builder.io/api/v1/image/assets/0fab736237cd441d83ad584e934960a5/6ff322d39b90e89b38de63125a13d0a0aa145869?placeholderIfAbsent=true",
    },
    {
      time: "10AM",
      temperature: "18°",
      iconUrl:
        "https://cdn.builder.io/api/v1/image/assets/0fab736237cd441d83ad584e934960a5/a87eb9c5f9e5f83a5476c2bb6955df3e5bffc182?placeholderIfAbsent=true",
    },
    {
      time: "11AM",
      temperature: "18°",
      iconUrl:
        "https://cdn.builder.io/api/v1/image/assets/0fab736237cd441d83ad584e934960a5/47d168d822982cdf18f835c61c578681ab550d56?placeholderIfAbsent=true",
    },
    { time: "12PM", temperature: "18°" },
  ];
}
