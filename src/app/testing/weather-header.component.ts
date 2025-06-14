import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "weather-header",
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="header">
      <nav class="header-nav">
        <div class="header-main">
          <button class="header-button">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/0fab736237cd441d83ad584e934960a5/e535b178007a59f08dac2d14c766a9e5bd8261c7?placeholderIfAbsent=true"
              alt="Menu"
              class="header-icon"
            />
          </button>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/0fab736237cd441d83ad584e934960a5/a9ad67a611d2e2502f6c1dadeae10401435938a4?placeholderIfAbsent=true"
            alt="Logo"
            class="header-logo"
          />
        </div>
        <div class="header-tools">
          <button class="header-search-button">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/0fab736237cd441d83ad584e934960a5/7ace73bfbca5a7f1c91143c48348f78f765ced0d?placeholderIfAbsent=true"
              alt="Search"
              class="header-icon"
            />
          </button>
        </div>
      </nav>
    </header>
  `,
  styles: [
    `
      .header {
        display: flex;
        align-items: start;
        justify-content: start;
      }

      .header-nav {
        display: flex;
        min-width: 240px;
        min-height: 64px;
        width: 100%;
        padding: 0 24px 0 12px;
        align-items: center;
        gap: 4px;
        overflow: hidden;
        justify-content: start;
        flex: 1;
      }

      .header-main {
        align-self: stretch;
        display: flex;
        margin: auto 0;
        align-items: center;
      }

      .header-button {
        border-radius: 1000px;
        width: 48px;
        height: 48px;
        padding: 12px;
        border: none;
        background: transparent;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .header-icon {
        width: 24px;
        height: 24px;
        object-fit: contain;
      }

      .header-logo {
        width: 104px;
        height: 104px;
        object-fit: contain;
      }

      .header-tools {
        align-self: stretch;
        display: flex;
        margin: auto 0;
        align-items: center;
        justify-content: end;
        flex: 1;
      }

      .header-search-button {
        border-radius: 1000px;
        width: 32px;
        height: 32px;
        padding: 4px;
        border: none;
        background: transparent;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    `,
  ],
})
export class WeatherHeaderComponent {}
