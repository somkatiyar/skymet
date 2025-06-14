import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "weather-current",
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="current-weather">
      <div class="weather-wrapper">
        <div class="weather-info">
          <div class="weather-status">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/0fab736237cd441d83ad584e934960a5/8fe4b57675059078c798552b070ea47178055086?placeholderIfAbsent=true"
              alt="Clear sky"
              class="weather-icon"
            />
            <p class="weather-description">Clear sky</p>
          </div>
          <h2 class="weather-temperature">42°C</h2>
        </div>
        <div class="weather-details">
          <div class="details-wrapper">
            <p class="details-title">Current temperature</p>
            <p class="details-time">11:00 PM , 24 Jul 2023</p>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .current-weather {
        margin-top: 24px;
        width: 100%;
        text-align: center;
      }

      .weather-wrapper {
        display: flex;
        width: 100%;
        padding: 0 8px;
        flex-direction: column;
        align-items: stretch;
      }

      .weather-info {
        display: flex;
        width: 100%;
        flex-direction: column;
        align-items: stretch;
      }

      .weather-status {
        align-self: center;
        display: flex;
        width: 92px;
        flex-direction: column;
        align-items: stretch;
        font-family:
          JioType,
          -apple-system,
          Roboto,
          Helvetica,
          sans-serif;
        font-size: 12px;
        color: #141414;
        font-weight: 500;
        letter-spacing: -0.06px;
        line-height: 1;
      }

      .weather-icon {
        width: 100%;
        aspect-ratio: 1;
        object-fit: contain;
      }

      .weather-description {
        align-self: start;
        margin: 4px 0 0;
      }

      .weather-temperature {
        color: rgba(0, 28, 63, 1);
        font-size: 52px;
        font-family:
          Raleway,
          -apple-system,
          Roboto,
          Helvetica,
          sans-serif;
        font-weight: 800;
        line-height: 1.2;
        letter-spacing: -1.56px;
        margin: 4px 0 0;
      }

      .weather-details {
        align-self: center;
        display: flex;
        margin-top: 8px;
        width: 160px;
        max-width: 100%;
        flex-direction: column;
        align-items: center;
        font-family:
          JioType,
          -apple-system,
          Roboto,
          Helvetica,
          sans-serif;
        font-weight: 500;
      }

      .details-wrapper {
        display: flex;
        width: 100%;
        flex-direction: column;
        align-items: start;
      }

      .details-title {
        color: #141414;
        font-size: 14px;
        line-height: 1;
        letter-spacing: -0.07px;
        margin: 0;
      }

      .details-time {
        color: #000000;
        font-size: 11px;
        line-height: 1;
        letter-spacing: -0.06px;
        margin: 4px 0 0;
      }
    `,
  ],
})
export class WeatherCurrentComponent {}
