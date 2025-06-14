import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { WeatherPattern } from "./shared-types";

@Component({
  selector: "app-weather-patterns",
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="patterns-container">
      <h2 class="patterns-title">Real-time weather patterns</h2>
      <div class="patterns-content">
        <div class="map-container">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/0fab736237cd441d83ad584e934960a5/ded2d827c1d5dc663ebb11b284ecbf64666fa04b?placeholderIfAbsent=true"
            class="map-image"
            alt="Weather map"
          />
          <nav class="pattern-selector">
            <button
              *ngFor="let pattern of patterns"
              [class]="'selector-btn ' + (pattern.isActive ? 'active' : '')"
            >
              {{ pattern.title }}
            </button>
          </nav>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/0fab736237cd441d83ad584e934960a5/fc540bc72cadd8546aa389ae0ada08e916c4e187?placeholderIfAbsent=true"
            class="map-overlay"
            alt="Weather overlay"
          />
        </div>
      </div>
      <button class="action-btn">View detailed patterns</button>
    </section>
  `,
  styles: [
    `
      .patterns-container {
        background-color: #fff;
        padding: 24px 16px;
        font-family:
          Raleway,
          -apple-system,
          Roboto,
          Helvetica,
          sans-serif;
      }
      .patterns-title {
        font-size: 20px;
        font-weight: 800;
        letter-spacing: -0.6px;
        line-height: 1.2;
        color: #000;
      }
      .patterns-content {
        margin-top: 16px;
        max-width: 328px;
        margin-left: auto;
        margin-right: auto;
      }
      .map-container {
        position: relative;
        border-radius: 24px;
        aspect-ratio: 1.072;
        padding-top: 12px;
      }
      .map-image {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .pattern-selector {
        position: relative;
        display: flex;
        margin: 0 12px;
        padding: 4px;
        background-color: rgba(245, 245, 245, 1);
        border-radius: 100px;
        gap: 4px;
      }
      .selector-btn {
        flex: 1;
        padding: 4px 0;
        border-radius: 1000px;
        border: none;
        background: none;
        font-size: 14px;
        font-weight: 600;
        color: rgba(0, 132, 218, 1);
        cursor: pointer;
      }
      .selector-btn.active {
        background-color: rgba(66, 133, 244, 1);
        color: #fff;
      }
      .map-overlay {
        width: 100%;
        margin-top: 231px;
        border-radius: 0 0 17px 17px;
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
export class WeatherPatternsComponent {
  patterns: WeatherPattern[] = [
    { title: "HIMAWARI", isActive: true },
    { title: "INSAT", isActive: false },
    { title: "RAINFALL", isActive: false },
  ];
}
