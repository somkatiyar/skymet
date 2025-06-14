import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "weather-location",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="location">
      <img
        src="https://cdn.builder.io/api/v1/image/assets/0fab736237cd441d83ad584e934960a5/bed8e1be65ee23201da69306bfac2d5753b7e0dd?placeholderIfAbsent=true"
        alt="Location background"
        class="location-bg"
      />
      <div class="location-content">
        <div class="location-header">
          <div class="location-icon-wrapper">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/0fab736237cd441d83ad584e934960a5/cce929ec958e9626d56cf5d2cb06cb1e1dc0dcf1?placeholderIfAbsent=true"
              alt="Location icon"
              class="location-icon"
            />
          </div>
          <div class="location-info">
            <h1 class="location-title">New Industrial area</h1>
            <p class="location-subtitle">New delhi, India.</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .location {
        display: flex;
        align-items: stretch;
      }

      .location-bg {
        aspect-ratio: 1;
        object-fit: contain;
        width: 87px;
        background-blend-mode: normal;
        margin: auto -87px auto 0;
        flex-shrink: 0;
      }

      .location-content {
        display: flex;
        width: fit-content;
        padding: 24px 16px;
        flex-direction: column;
        align-items: stretch;
        justify-content: center;
        flex: 1 0 0;
      }

      .location-header {
        align-self: start;
        display: flex;
        align-items: start;
        gap: 8px;
      }

      .location-icon-wrapper {
        display: flex;
        min-height: 29px;
        flex-direction: column;
        align-items: stretch;
        justify-content: center;
        width: 24px;
      }

      .location-icon {
        width: 24px;
        height: 24px;
        object-fit: contain;
      }

      .location-info {
        display: flex;
        flex-direction: column;
        width: 166px;
      }

      .location-title {
        font-family:
          Raleway,
          -apple-system,
          Roboto,
          Helvetica,
          sans-serif;
        font-size: 18px;
        color: #141414;
        font-weight: 700;
        letter-spacing: -0.09px;
        line-height: 1.2;
        margin: 0;
      }

      .location-subtitle {
        color: #000000;
        font-family:
          JioType,
          -apple-system,
          Roboto,
          Helvetica,
          sans-serif;
        font-size: 12px;
        font-weight: 500;
        line-height: 2;
        letter-spacing: -0.06px;
        margin: 0;
      }
    `,
  ],
})
export class WeatherLocationComponent {}
