import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "weather-forecast",
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="forecast">
      <h2 class="forecast-title">Today's Forecast</h2>
      <div class="forecast-grid">
        <div class="forecast-row">
          <article class="forecast-card hover-lift">
            <div class="card-header">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/0fab736237cd441d83ad584e934960a5/4111a5ebb93bfd7bbe2bf7497d6c5b2548c3dd6b?placeholderIfAbsent=true"
                alt="Temperature"
                class="card-icon"
              />
              <h3 class="card-title">Temp forecast</h3>
            </div>
            <div class="card-content">
              <div class="weather-status">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/0fab736237cd441d83ad584e934960a5/6d0d6442542ba158f95ee31591e46c5d036c2b4a?placeholderIfAbsent=true"
                  alt="Clear sky"
                  class="weather-icon"
                />
                <span class="weather-text">Clear sky</span>
              </div>
              <div class="temperature-range">
                <div class="temp-max">
                  <span class="temp-label">Max</span>
                  <span class="temp-value">42°C</span>
                </div>
                <div class="temp-min">
                  <span class="temp-label">Min</span>
                  <span class="temp-value">24°C</span>
                </div>
              </div>
            </div>
          </article>

          <article class="forecast-card">
            <div class="card-header">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/0fab736237cd441d83ad584e934960a5/3417a5472a517e695eabd795a60196e786069796?placeholderIfAbsent=true"
                alt="Rainfall"
                class="card-icon"
              />
              <h3 class="card-title">Rainfall probability</h3>
            </div>
            <div class="rainfall-content">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/0fab736237cd441d83ad584e934960a5/189c28c0a6b7cbd807bd5d343942c89afb4185da?placeholderIfAbsent=true"
                alt="Rain"
                class="rainfall-icon"
              />
              <div class="rainfall-info">
                <span class="rainfall-percentage">20 %</span>
                <span class="rainfall-amount">(2.0 mm)</span>
              </div>
            </div>
          </article>
        </div>

        <div class="forecast-row">
          <article class="forecast-card">
            <div class="card-header">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/0fab736237cd441d83ad584e934960a5/c295acfa94f784b896282058408c57343df570ff?placeholderIfAbsent=true"
                alt="Humidity"
                class="card-icon"
              />
              <h3 class="card-title">Humidity</h3>
            </div>
            <div class="humidity-content">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/0fab736237cd441d83ad584e934960a5/ce094d1bdd0f759a6852c158090cb2f9163de2f5?placeholderIfAbsent=true"
                alt="Humidity level"
                class="humidity-icon"
              />
              <div class="humidity-value">
                <span class="value">68.1</span>
                <span class="unit">%</span>
              </div>
            </div>
          </article>

          <article class="forecast-card">
            <div class="card-header">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/0fab736237cd441d83ad584e934960a5/491a004d3ad61f4cad162e70c287874de2443ee7?placeholderIfAbsent=true"
                alt="Wind"
                class="card-icon"
              />
              <h3 class="card-title">Wind speed</h3>
            </div>
            <div class="wind-content">
              <div class="wind-info">
                <div class="wind-speed">
                  <span>2.3</span>
                  <span class="wind-unit">m/s</span>
                </div>
                <span class="wind-direction">( NE )</span>
              </div>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/0fab736237cd441d83ad584e934960a5/9d6f9670-8aa2-41f4-95f0-cd203960ddbf?placeholderIfAbsent=true"
                alt="Wind direction"
                class="wind-icon"
              />
            </div>
          </article>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .forecast {
        width: 100%;
        padding: 24px;
        gap: 16px;
      }

      .forecast-title {
        color: rgba(0, 0, 0, 1);
        font-size: 20px;
        font-family:
          Raleway,
          -apple-system,
          Roboto,
          Helvetica,
          sans-serif;
        font-weight: 800;
        line-height: 1.2;
        letter-spacing: -0.6px;
        margin: 0;
      }

      .forecast-grid {
        margin-top: 16px;
        width: 100%;
      }

      .forecast-row {
        display: flex;
        width: 100%;
        align-items: start;
        gap: 8px;
        margin-bottom: 8px;
      }

      .forecast-card {
        border-radius: 16px;
        background-color: #fff;
        padding: 12px;
        flex: 1;
        display: flex;
        flex-direction: column;
        border: 1px solid rgba(0, 0, 0, 0.1);
      }

      .hover-lift:hover {
        transform: translateY(-4px);
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
      }

      .card-header {
        display: flex;
        align-items: center;
        gap: 2px;
      }

      .card-icon {
        width: 16px;
        height: 16px;
      }

      .card-title {
        font-family:
          Raleway,
          -apple-system,
          Roboto,
          Helvetica,
          sans-serif;
        font-size: 12px;
        color: #141414;
        font-weight: 700;
        letter-spacing: -0.06px;
        line-height: 1;
        margin: 0;
        flex: 1;
      }

      .weather-status {
        background-color: rgba(245, 245, 245, 1);
        border-radius: 8px;
        padding: 6px;
        display: flex;
        align-items: center;
        gap: 8px;
        margin-top: 12px;
      }

      .weather-icon {
        width: 43px;
        height: 43px;
      }

      .weather-text {
        color: #000000;
        font-weight: 600;
        font-size: 12px;
      }

      .temperature-range {
        display: flex;
        margin-top: 8px;
        gap: 16px;
        font-size: 12px;
        line-height: 1.2;
      }

      .temp-max,
      .temp-min {
        flex: 1;
        display: flex;
        justify-content: space-between;
      }

      .temp-label {
        color: #000000;
        font-weight: 600;
      }

      .temp-value {
        color: #141414;
        font-weight: 700;
      }

      .rainfall-content {
        display: flex;
        margin-top: 13px;
        gap: 4px;
        align-items: center;
      }

      .rainfall-icon {
        width: 68px;
        height: 68px;
      }

      .rainfall-info {
        flex: 1;
        font-family:
          Raleway,
          -apple-system,
          Roboto,
          Helvetica,
          sans-serif;
        line-height: 1.2;
      }

      .rainfall-percentage {
        font-size: 18px;
        color: #141414;
        font-weight: 800;
        letter-spacing: -0.09px;
        display: block;
      }

      .rainfall-amount {
        font-size: 12px;
        color: #000000;
        font-weight: 600;
        letter-spacing: -0.36px;
        display: block;
        margin-top: 4px;
      }

      .humidity-content {
        margin-top: 12px;
        text-align: center;
      }

      .humidity-icon {
        width: 98px;
        height: 47px;
      }

      .humidity-value {
        margin-top: 9px;
        display: flex;
        justify-content: center;
        align-items: baseline;
        gap: 2px;
      }

      .value {
        font-family:
          Raleway,
          -apple-system,
          Roboto,
          Helvetica,
          sans-serif;
        font-size: 18px;
        color: #141414;
        font-weight: 800;
        letter-spacing: -0.09px;
        line-height: 1.2;
      }

      .unit {
        color: rgba(20, 20, 20, 1);
        font-size: 12px;
        font-family:
          JioType,
          -apple-system,
          Roboto,
          Helvetica,
          sans-serif;
        font-weight: 700;
        line-height: 2;
        letter-spacing: -0.06px;
      }

      .wind-content {
        display: flex;
        margin-top: 16px;
        align-items: center;
        gap: 16px;
        justify-content: space-between;
      }

      .wind-info {
        display: flex;
        flex-direction: column;
      }

      .wind-speed {
        font-family:
          Raleway,
          -apple-system,
          Roboto,
          Helvetica,
          sans-serif;
        font-size: 18px;
        color: #141414;
        font-weight: 800;
        letter-spacing: -0.09px;
        line-height: 1.2;
      }

      .wind-unit {
        font-weight: 600;
        font-size: 12px;
      }

      .wind-direction {
        font-size: 12px;
        color: #000000;
        font-weight: 600;
        letter-spacing: -0.36px;
        margin-top: 4px;
      }

      .wind-icon {
        width: 68px;
        height: 68px;
      }

      @media (max-width: 640px) {
        .forecast {
          padding: 16px;
        }
      }
    `,
  ],
})
export class WeatherForecastComponent {}
