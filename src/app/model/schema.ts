  export const organization: any = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Skymet Weather",
    "url": "https://www.skymetweather.com/",
    "logo": "https://www.skymetweather.com/img/logo.png",
    "image": "https://www.skymetweather.com/img/logo.png",
     "sameAs": [
    "https://podcasts.apple.com/in/podcast/skymet-podcast/id1772264634",
    "https://open.spotify.com/show/49takv1rC7dyQmEp4IMRYA?si=db8d43b4908c404f",
    "https://www.jiosaavn.com/shows/skymet-podcast/1/NKmTKXHI3og_",
    "https://music.youtube.com/watch?v=LSOyCMLWqU8",
    "https://www.linkedin.com/company/skymet-weather-services/",
    "https://www.facebook.com/SkymetWeatherServices",
    "https://www.youtube.com/@Skymetweather",
    "https://en.wikipedia.org/wiki/Skymet_Weather_Services"
  ],
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "Plot No. 10 & 11, Sector-125",
        "addressLocality": "Noida",
        "addressRegion": "India",
        "postalCode": "201303",
        "addressCountry": "IN",
        "telephone": "+91-0120-409 4500"
    }
  
  };
export const siteNavigationElement = [
  {
    "@context": "https://schema.org",
    "@type": "SiteNavigationElement",
    "name": "Home",
    "url": "https://www.skymetweather.com/"
  },
  {
    "@context": "https://schema.org",
    "@type": "SiteNavigationElement",
    "name": "Forecast Map",
    "url": "https://www.skymetweather.com/15-days-rainfall-forecast-for-india"
  },
  {
    "@context": "https://schema.org",
    "@type": "SiteNavigationElement",
    "name": "News",
    "url": "https://www.skymetweather.com/forecast/resources"
  },
  {
    "@context": "https://schema.org",
    "@type": "SiteNavigationElement",
    "name": "Satellite",
    "url": "https://www.skymetweather.com/himawari-latest-satellite-images-of-india"
  },
  {
    "@context": "https://schema.org",
    "@type": "SiteNavigationElement",
    "name": "Live Map",
    "url": "https://www.skymetweather.com/map"
  },
  {
    "@context": "https://schema.org",
    "@type": "SiteNavigationElement",
    "name": "Advertise with us",
    "url": "https://www.skymetweather.com/advertise-with-us"
  },
  {
    "@context": "https://schema.org",
    "@type": "SiteNavigationElement",
    "name": "Contact us",
    "url": "https://www.skymetweather.com/contact-us"
  }
];

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
        "name": "contact-us",
        "item": "https://www.skymetweather.com/contact-us"
    }
  ];


export function createForecastBreadcrumb(state: string, district: string, tehsil: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": state,
        "item":`https://www.skymetweather.com/state-weather/${state.toLowerCase()}`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": district,
        "item":`https://www.skymetweather.com/weather/forecast/india/${state.toLowerCase()}/${district.toLowerCase()}`
       
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": tehsil,
        "item": `https://www.skymetweather.com/weather/forecast/india/${state.toLowerCase()}/${district.toLowerCase()}/${tehsil.toLowerCase()}`
      }
    ]
  };
}


