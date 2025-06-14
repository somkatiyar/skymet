import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'weather-hourly',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="hourly-container">
      <h2 class="hourly-title">Hourly Forecast</h2>
      <div class="hourly-scroll">
        <article class="hourly-card hover-lift">
          <h3 class="time-label">Now</h3>
          <img src="https://cdn.builder.io/api/v1/image/assets/0fab736237cd441d83ad584e934960a5/6ff322d39b90e89b38de63125a13d0a0aa145869?placeholderIfAbsent=true" alt="Weather" class="weather-icon" />
          <p class="temperature">18°</p>
        </article>
        <article class="hourly-card">
          <h3 class="time-label">10AM</h3>
          <img src="https://cdn.builder.io/api/v1/image/assets/0fab736237cd441d83ad584e934960a5/a87eb9c5f9e5f83a5476c2bb6955df3e5bffc182?placeholderIfAbsent=true" alt="Weather" class="weather-icon" />
          <p class="temperature">18°</p>
        </article>
        <article class="hourly-card">
          <h3 class="time-label">11AM</h3>
          <img src="https://cdn.builder.io/api/v1/image/assets/0fab736237cd441d83ad584e934960a5/7f1c0122f081d8824c6980af159e610540b7dd64?placeholderIfAbsent=true" alt="Weather" class="weather-icon" />
          <p class="temperature">18°</p>
        </article>
        <article class="hourly-card">
          <h3 class="time-label">12PM</h3>
          <img src="https://cdn.builder.io/api/v1/image/assets/0fab736237cd441d83ad584e934960a5/cf76902a4a96b5756b44ead026874bab38fcf87f?placeholderIfAbsent=true" alt="Weather" class="weather-icon" />
          <p class="temperature">18°</p>
        </article>
        <div class="hourly-placeholder"></div>
      </div>
      <button class="forecast-button">View 7 days forecast</button>
    </section>
  `,
  styles: [`
    .hourly-container {
      background-color: rgba(255, 255, 255, 1);
      margin-top: 4px;
      width: 100%;
      padding: 24px 16px;
      font-family: Raleway, -apple-system, Roboto, Helvetica, sans-serif;
      color: rgba(0, 0, 0, 1);
    }

    .hourly-title {
      font-size: 20px;
      font-weight: 800;
      letter-spacing: -0.6px;
      line-height: 1.2;
      margin: 0;
    }

    .hourly-scroll {
      display: flex;
      margin-top: 16px;
      gap: 12px;
      overflow-x: auto;
      scrollbar-width: none;
      -ms-overflow-style: none;
      padding: 4px;
      &::-webkit-scrollbar {
        display: none;
      }
    }

    .hourly-card {
      border-radius: 12px;
      background-color: rgba(245, 245, 245, 1);
      padding: 16px;
      width: 71px;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;

      &:first-child {
        background-color: white;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
      }
    }

    .hover-lift:hover {
      transform: translateY(-2px);
    }

    .time-label {
      font-size: 14px;
      font-weight: 600;
      margin: 0;
    }

    .weather-icon {
      width: 36px;
      height: 36px;
      margin-top: 12px;
    }

    .temperature {
      margin: 12px 0 0;
      font-size: 20px;
      font-weight: 700;
      line-height: 1.2;
    }

    .hourly-placeholder {
      width: 71px;
      height: 123px;
      flex-shrink: 0;
      background-color