import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "weather-buddy",
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="buddy-container">
      <div class="buddy-content">
        <div class="buddy-header">
          <div class="buddy-title">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/0fab736237cd441d83ad584e934960a5/ea3e4676bcb43b433578ed66c20b0f3a06d764a6?placeholderIfAbsent=true"
              alt="Weather buddy"
              class="buddy-icon"
            />
            <h2 class="buddy-name">Weather buddy</h2>
          </div>
          <button class="buddy-close">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/0fab736237cd441d83ad584e934960a5/697e2b9b39948a1cf5038390e83960dbdd36c06f?placeholderIfAbsent=true"
              alt="Close"
              class="close-icon"
            />
          </button>
        </div>
        <p class="buddy-message">
          <span class="message-main">
            Planning for tomorrow in Green park? *Skymet's weather forecast*
            expects intensely hot and dry weather tomorrow under predominantly
            sunny skies. The maximum temperature in
          </span>
          <span class="message-dots"> .. </span>
          <span class="message-action">Read more</span>
        </p>
      </div>
    </section>
  `,
  styles: [
    `
      .buddy-container {
        border-radius: 16px;
        background-color: rgba(255, 245, 231, 1);
        border: 1px solid rgba(185, 112, 0, 0.2);
        margin-top: 16px;
        padding: 12px 16px;
      }

      .buddy-content {
        width: 100%;
      }

      .buddy-header {
        display: flex;
        width: 100%;
        align-items: start;
        gap: 40px 100px;
        justify-content: space-between;
      }

      .buddy-title {
        display: flex;
        align-items: center;
        gap: 8px;
        font-family:
          JioType,
          -apple-system,
          Roboto,
          Helvetica,
          sans-serif;
        font-size: 14px;
        color: rgba(202, 122, 0, 1);
        font-weight: 700;
        letter-spacing: -0.07px;
        line-height: 24px;
      }

      .buddy-icon {
        width: 20px;
        height: 20px;
        object-fit: contain;
      }

      .buddy-name {
        margin: 0;
        font-size: inherit;
        font-weight: inherit;
      }

      .buddy-close {
        border: none;
        background: transparent;
        padding: 0;
        cursor: pointer;
      }

      .close-icon {
        width: 24px;
        height: 24px;
      }

      .buddy-message {
        color: rgba(0, 70, 155, 1);
        font-size: 12px;
        font-family:
          JioType,
          -apple-system,
          Roboto,
          Helvetica,
          sans-serif;
        font-weight: 500;
        line-height: 16px;
        letter-spacing: -0.06px;
        margin: 8px 0 0;
      }

      .message-main {
        color: rgba(97, 58, 0, 1);
      }

      .message-dots {
        font-weight: 700;
        color: rgba(97, 58, 0, 1);
      }

      .message-action {
        font-weight: 700;
      }
    `,
  ],
})
export class WeatherBuddyComponent {}
