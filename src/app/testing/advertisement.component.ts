import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-advertisement",
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="ad-container">
      <p class="ad-text">Advertisement</p>
    </section>
  `,
  styles: [
    `
      .ad-container {
        background-color: rgba(66, 133, 244, 0.08);
        border: 1px dashed rgba(66, 133, 244, 1);
        min-height: 52px;
        width: 100%;
        padding: 15px 115px;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .ad-text {
        font-family:
          Raleway,
          -apple-system,
          Roboto,
          Helvetica,
          sans-serif;
        font-size: 13px;
        color: rgba(66, 133, 244, 1);
        font-weight: 800;
        letter-spacing: -0.39px;
        line-height: 21px;
        text-align: center;
        white-space: nowrap;
      }
    `,
  ],
})
export class AdvertisementComponent {}
