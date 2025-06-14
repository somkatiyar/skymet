import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NewsItem } from "./shared-types";

@Component({
  selector: "app-news-section",
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="news-container">
      <h2 class="news-title">Explore trending climate news</h2>
      <div class="news-list">
        <article class="news-card" *ngFor="let item of newsItems">
          <div class="image-wrapper">
            <img [src]="item.image" class="news-image" alt="News thumbnail" />
          </div>
          <div class="content-wrapper">
            <header class="news-header">
              <div class="source-wrapper">
                <div class="avatar-container">
                  <img
                    [src]="item.avatar"
                    class="avatar-image"
                    alt="Source avatar"
                  />
                </div>
                <span class="source-name">{{ item.source }}</span>
              </div>
              <div
                class="badge"
                [class.new]="item.badge.type === 'new'"
                [class.unread]="item.badge.type === 'unread'"
              >
                {{ item.badge.text }}
              </div>
            </header>
            <h3 class="news-headline">{{ item.title }}</h3>
            <footer class="news-footer">
              <time class="news-date">{{ item.date }}</time>
              <button class="share-button">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/0fab736237cd441d83ad584e934960a5/77d7794049177f33b37de339110f1543bcfa5f6f?placeholderIfAbsent=true"
                  alt="Share"
                />
              </button>
            </footer>
          </div>
        </article>
      </div>
      <button class="action-btn">View more</button>
    </section>
  `,
  styles: [
    `
      .news-container {
        background-color: #fff;
        padding: 24px 16px;
      }
      .news-title {
        font-family:
          Raleway,
          -apple-system,
          Roboto,
          Helvetica,
          sans-serif;
        font-size: 20px;
        font-weight: 800;
        letter-spacing: -0.6px;
        line-height: 1.2;
        color: #000;
      }
      .news-list {
        margin-top: 16px;
      }
      .news-card {
        display: flex;
        gap: 12px;
        padding-bottom: 12px;
      }
      .news-card:not(:last-child) {
        border-bottom: 1px solid #e0e0e0;
        margin-bottom: 12px;
      }
      .image-wrapper {
        position: relative;
        width: 108px;
        aspect-ratio: 1;
        border-radius: 8px;
        overflow: hidden;
      }
      .news-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .content-wrapper {
        flex: 1;
      }
      .news-header {
        display: flex;
        align-items: center;
        gap: 4px;
      }
      .source-wrapper {
        display: flex;
        align-items: center;
        gap: 4px;
        flex: 1;
      }
      .avatar-container {
        width: 16px;
        height: 16px;
        border-radius: 133.333px;
        background-color: #e8e8fc;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .avatar-image {
        width: 16px;
        height: 16px;
        object-fit: contain;
      }
      .source-name {
        font-family:
          JioType,
          -apple-system,
          Roboto,
          Helvetica,
          sans-serif;
        font-size: 12px;
        color: #000;
        font-weight: 500;
        letter-spacing: -0.06px;
      }
      .badge {
        padding: 4px 8px;
        border-radius: 4px;
        font-family:
          JioType,
          -apple-system,
          Roboto,
          Helvetica,
          sans-serif;
        font-size: 12px;
        font-weight: 700;
        letter-spacing: -0.06px;
        color: #f5f5f5;
      }
      .badge.new {
        background-color: #e30513;
      }
      .badge.unread {
        background-color: #f7ab20;
      }
      .news-headline {
        margin-top: 4px;
        font-family:
          JioType,
          -apple-system,
          Roboto,
          Helvetica,
          sans-serif;
        font-size: 14px;
        color: #000;
        font-weight: 700;
        letter-spacing: -0.07px;
        line-height: 20px;
      }
      .news-footer {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-top: 4px;
      }
      .news-date {
        font-family:
          JioType,
          -apple-system,
          Roboto,
          Helvetica,
          sans-serif;
        font-size: 12px;
        color: #000;
        font-weight: 500;
        letter-spacing: -0.06px;
      }
      .share-button {
        width: 24px;
        height: 24px;
        padding: 8px;
        border: none;
        background: none;
        cursor: pointer;
        border-radius: 250px;
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
export class NewsSectionComponent {
  newsItems: NewsItem[] = [
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/0fab736237cd441d83ad584e934960a5/9bc28101b8fc01163dfcb167c223f533f72ab890?placeholderIfAbsent=true",
      avatar:
        "https://cdn.builder.io/api/v1/image/assets/0fab736237cd441d83ad584e934960a5/4e07ab4e08d6a548835f618a374963f838fa7916?placeholderIfAbsent=true",
      source: "JioNews",
      badge: { text: "New", type: "new" },
      title: "China's worst heat wave on record is crippling power ...",
      date: "21/12/2021",
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/0fab736237cd441d83ad584e934960a5/4299e97686e2683f4cbff7011008c0870e443bf5?placeholderIfAbsent=true",
      avatar:
        "https://cdn.builder.io/api/v1/image/assets/0fab736237cd441d83ad584e934960a5/e76cbc50c37067c712a3438e774d16914beea562?placeholderIfAbsent=true",
      source: "Krishi news",
      badge: { text: "Unread", type: "unread" },
      title: "DC VS MI , current weather updates",
      date: "21/12/2021",
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/0fab736237cd441d83ad584e934960a5/bbfe5d613e7e69000e40a6da305003c324060819?placeholderIfAbsent=true",
      avatar:
        "https://cdn.builder.io/api/v1/image/assets/0fab736237cd441d83ad584e934960a5/e76cbc50c37067c712a3438e774d16914beea562?placeholderIfAbsent=true",
      source: "Krishi news",
      badge: { text: "Unread", type: "unread" },
      title: "Tomato price hike: Here's a look at pocket-friendly ..",
      date: "21/12/2021",
    },
  ];
}
