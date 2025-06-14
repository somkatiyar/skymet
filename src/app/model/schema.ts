  export const organization: any = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Skymet Weather",
    "url": "https://www.skymetweather.com/",
    "logo": "https://www.skymetweather.com/assets/img/bblogo.png",
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "Plot No. 10 & 11, Sector-125",
        "addressLocality": "Noida",
        "addressRegion": "India",
        "postalCode": "201303",
        "telephone": "+91-0120-409 4500"
    }
  
  };
  export const siteNavigationElement = {
    "@context": "https://schema.org",
    "@type": "SiteNavigationElement",
    "name": [
        "Home",
        "Weather News",
        "Forecasts",
        "Maps",
        "About Us",
        "Satellite - Himawari",
        "Satellite - INSAT",
        "Satellite - SkySat"
    ],
    "url": [
        "https://www.skymetweather.com/",
        "https://www.skymetweather.com/weather-news/",
        "https://www.skymetweather.com/forecast/weather/",
        "https://www.skymetweather.com/map/",
        "https://www.skymetweather.com/about-us/",
        "https://www.skymetweather.com/himawari-latest-satellite-images-of-india/",
        "https://www.skymetweather.com/weather-satellite-images-of-india/",
        "https://www.skymetweather.com/high-resolution-satellite-images/"
    ]
  };
  export const bredcrumbSchema = [
    {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.skymetweather.com/"
    },
    {
        "@type": "ListItem",
        "position": 2,
        "name": "satellite",
        "item": "https://www.skymetweather.com/himawari-latest-satellite-images-of-india"
    },
    {
        "@type": "ListItem",
        "position": 3,
        "name": "map",
        "item": "https://www.skymetweather.com/map"
    },
    {
        "@type": "ListItem",
        "position": 4,
        "name": "Weather News",
        "item": "https://www.skymetweather.com/weather-news"
    },
    {
        "@type": "ListItem",
        "position": 5,
        "name": "News Detail",
        "item": "https://www.skymetweather.com/content/Weather-News-and-Analysis"
    },
    {
        "@type": "ListItem",
        "position": 6,
        "name": "about-us",
        "item": "https://www.skymetweather.com/about-us"
    }
  ]

