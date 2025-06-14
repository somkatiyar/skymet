export interface HourlyForecast {
  time: string;
  temperature: string;
  iconUrl?: string;
}

export interface WeatherPattern {
  title: string;
  isActive: boolean;
}

export interface NewsItem {
  image: string;
  avatar: string;
  source: string;
  badge: {
    text: string;
    type: "new" | "unread";
  };
  title: string;
  date: string;
}
