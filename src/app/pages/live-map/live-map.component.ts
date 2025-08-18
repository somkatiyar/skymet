import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  OnChanges,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { DataService } from '../../services/data.service';
import { SeoService } from '../../services/seo.service';
import { WindowService } from '../../services/window.service';
import { FormsModule } from '@angular/forms';
import { LocationService } from '../../services/location.service';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-map',
  templateUrl: './live-map.component.html',
  styleUrl: './live-map.component.scss',
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, FormsModule,RouterLink],
  standalone: true
})
export class LiveMapComponent implements AfterViewInit, OnChanges {
  map: any = null;
  velocityLayer: any;
  windLayer: any;
  layerControl: any;
  lightningLayer: any;
  radarImage:any;
  markerGroup: any;
  markerClusterGroup: any;
  L: any;
  isPanelOpen = false;

  layers = {
    aws: false,
    wind: false,
    lightning: false,
    radar: false,
    cloud: false
  };

  layerList = [
    { key: 'aws', label: 'AWS', isActive: false },
    { key: 'wind', label: 'Wind', isActive: false },
    { key: 'lightning', label: 'Lightning', isActive: false },
    { key: 'radar', label: 'Radar', isActive: false },
    { key: 'cloud', label: 'Cloud', isActive: false }
  ];
  googleHybrid:any;
  darkLayer:any;

  selectedBasemap = 'light';
  mode: any = "development";
  //mode:any="production"

  constructor(
    private seoService: SeoService,
    public windowService: WindowService,
    private dataService: DataService,
    private locationService:LocationService
  ) { }

  ngOnChanges(changes: SimpleChanges): void { }

  async ngAfterViewInit() {
    if (this.windowService.isBrowser()) {
      if (this.mode == "development") {
        const leafletModule = await import('leaflet');
        this.L = leafletModule;
        await import('leaflet.markercluster');
        await import('leaflet-velocity');
        const globalAny = globalThis as any;
        if (!this.L.markerClusterGroup && globalAny.L?.markerClusterGroup) {
          this.L.markerClusterGroup = globalAny?.L.markerClusterGroup || globalAny.markerClusterGroup;
        }
        this.L.velocityLayer = globalAny.L?.velocityLayer || globalAny.velocityLayer;
        this.initMap({ lat: 28, lng: 78 });
      } else {
        this.L = this.windowService.L;
        this.initMap({ lat: 28, lng: 78 });

      }


    }
  }

 initMap(latLng: any) {
    if (this.windowService.isBrowser()) {

      try {
        this.map = this.L.map('map', {
          center: [latLng.lat, latLng.lng],
          zoom: 4,
          minZoom: 3,
          maxZoom: 12,
        });
        this.addBaseLayers(this.L);
        this.removeGray();
        this.addControls(this.L);
        this.addMarkerLayer(this.L);
        this.addDoplerImage(this.L);
        this.addCloudImage(this.L);
        this.plotIndiaLayer(this.L);
        this.addGeoJsonLayerWithClustering(this.L);
        this.plotVelocity(this.L)
        this.addCurrentLocation(this.L);
        this.map.on('click', (e: any) => {
        const latlng = e.latlng;
        this.getForecastOnMapClick(latlng,this.L);
        });
        setTimeout(() => {
          this.map.invalidateSize();

        }, 200);
      } catch (error) {
        throw error
      }
    }
  }


  async addCurrentLocation(L: any) {
    var customIcon = L.icon({
      iconUrl: 'https://www.skymetweather.com/assets/img/currentloc.svg',
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32]
    });
      this.locationService
      .getCurrentPosition()
      .then((position:any) => {
         const { latitude, longitude } = position.coords;
           this.map.flyTo([latitude,longitude], 6);
        L.marker([latitude,longitude], { icon: customIcon })
        .addTo(this.map)
      }).catch(err => {
        this.map.flyTo(this.map.options.center, 6);
        L.marker(this.map.options.center, { icon: customIcon })
        .addTo(this.map)
      })
 
  }

  addBaseLayers(L: any) {
    this.googleHybrid = this.L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    }).addTo(this.map);



    const baseLayers = {
      'Satellite View': this.googleHybrid,
    };

    this.layerControl = this.L.control.layers(baseLayers).addTo(this.map);

  }

  removeGray() {
      if(this.windowService.isBrowser()) {
      const tilePane = document.querySelector('.leaflet-pane .leaflet-tile-pane') as HTMLElement;
      if (tilePane) {
        tilePane.style.filter =  'invert(100%) hue-rotate(180deg) brightness(80%) contrast(90%)';;
      }
    }
  }
  addGray() {
    if(this.windowService.isBrowser()) {
      const tilePane = document.querySelector('.leaflet-pane .leaflet-tile-pane') as HTMLElement;
      if (tilePane) {
        tilePane.style.filter = 'grayscale(100%)';
      }
    }
  }

  onBasemapChange($event:any) {
    var layer = $event.target.value;
    if(layer == "dark") {
      this.addGray();
    }else {
      this.removeGray();
    }
  }

  addControls(L: any) {
    if (this.windowService.isBrowser()) {
      const elements: any = document.querySelectorAll('.leaflet-right');
      elements[0]?.classList.remove('leaflet-bottom');
      elements[0]?.classList.add('custom_css');

    }

  }

  addMarkerLayer(L: any) {
    fetch('https://ngswims.skymetweather.com/serviceapi/api/createjsonlightning')
      .then((response) => response.json())
      .then((data) => {
        const markers = data.map((location: any) => {
          const coords = location.l.split(',').map(Number);
          return L.marker([coords[1], coords[0]], { icon: this.lightningIcon(L) });
        });
        this.markerGroup = L.layerGroup(markers);
        this.layerControl.addOverlay(this.markerGroup, 'Lightning');
        this.markerGroup.addTo(this.map);
        this.layerList[2].isActive = true;
      })
      .catch((error) => console.error('Error fetching marker data:', error));
  }

  AddRemoveLayer(event: any, layer: any) {
    if (event.target.checked) {
      if (layer.key == "lightning") {
        this.map.addLayer(this.markerGroup);
        this.layerList[2].isActive = true;
      }

      if (layer.key == "aws") {
        this.map.addLayer(this.markerClusterGroup);
        this.layerList[0].isActive = true;
      }
      if (layer.key == "wind") {
        this.map.addLayer(this.windLayer);
        this.layerList[1].isActive = true;
      }
        if (layer.key == "radar") {
        this.map.addLayer(this.radarImage);
        this.layerList[3].isActive = true;
      }

    } else {
      if (layer.key == "lightning") {
        this.map.removeLayer(this.markerGroup);
        this.layerList[2].isActive = false;
      }
      if (layer.key == "aws") {
        this.map.removeLayer(this.markerClusterGroup);
        this.layerList[0].isActive = false;
      }
      if (layer.key == "wind") {
        this.map.removeLayer(this.windLayer);
        this.layerList[1].isActive = false;
      }
       if (layer.key == "radar") {
        this.map.removeLayer(this.radarImage);
        this.layerList[3].isActive = false;
      }
    }

  }

  async addDoplerImage(L: any) {
    try {
      var imageUrl = await this.findLatestImage();
      var imageBounds = new L.LatLngBounds(new L.LatLng(36.324355, 97.56348), new L.LatLng(6.274355, 67.21348));
      this.radarImage = L.imageOverlay(imageUrl, imageBounds);
      this.layerControl.addOverlay(this.radarImage, 'Radar');
    } catch (error) {

    }

  }

  async addCloudImage(L: any) {
    try {
      var imageUrl = "./img/cloudimage.jpg";
      var imageBounds = new L.LatLngBounds(new L.LatLng(36.324355, 97.56348), new L.LatLng(6.274355, 67.21348));
      var cloudImage = L.imageOverlay(imageUrl, imageBounds);
      this.layerControl.addOverlay(cloudImage, 'Cloud');
      this.layerList[3].isActive = true
    } catch (error) {

      this.layerList[3].isActive = false
    }

  }

  plotIndiaLayer(L: any) {
    L.tileLayer.wms('https://geo.skymetweather.com/geoserver/cite/wms?', {
      layers: 'cite:india',
      transparent: true,
      format: 'image/png',
      opacity: 1,
    }).addTo(this.map);
  }

  plotVelocity(L: any) {
    if (this.windowService.isBrowser()) {
      import('leaflet-velocity')
        .then((res) => {
          fetch('https://api.skymetweather.com/api/windDataJSON')
            .then((response) => response.json())
            .then((data) => {
              this.windLayer = L.velocityLayer({
                displayValues: true,
                maxVelocity: 15,
                velocityScale: 0.01,
                  particleMultiplier: 1 / 70, 
                  lineWidth: 1.3,
                displayOptions: {
                  velocityType: 'Wind',
                  displayPosition: 'bottomleft',
                  displayEmptyString: 'No wind data',
                },
                data: data,
                colorScale: [
                  "#00bfff",  // cool (slow wind)
                  "#00ff00",  // normal (moderate wind)
                  "#ff9900",  // warm wind
                  "#ff0000"   // hot (strong wind)
                ]
              });

              this.windLayer.addTo(this.map);
              this.layerControl.addOverlay(this.windLayer, 'Winds');

              this.layerList[1].isActive = true
       
            })
            .catch((error) => {
              console.error('Error fetching wind data:', error)
              this.layerList[1].isActive = false
            });
        })
        .catch((err) => {
          console.error('Error loading leaflet-velocity:', err)
          this.layerList[1].isActive = false
        });
    }
  }

  
  addGeoJsonLayerWithClustering(L: any): void {
    if (this.windowService.isBrowser()) {
      import('leaflet.markercluster').then(() => {
        this.markerClusterGroup = L.markerClusterGroup();
        fetch('https://ngswims.skymetweather.com/serviceapi/api/awsDataJSON')
          .then((res) => res.json())
          .then((data) => {
            const geoJsonLayer = L.geoJson(data, {
              pointToLayer: (feature: any, latlng: any) => {
                const marker = L.marker(latlng, { icon: this.awsIcon(L) });

                // Initial popup content
                marker.bindPopup('<b>Loading forecast...</b>');

                // Add click event listener
                marker.on('click', () => {
                  this.getForecast(latlng, marker);
                });

                return marker;
              },
            });

            this.markerClusterGroup.addLayer(geoJsonLayer);
            this.layerControl.addOverlay(this.markerClusterGroup, 'AWS');
            this.markerClusterGroup.addTo(this.map);
            this.layerList[0].isActive = true
          })
          .catch((error) => console.error('Error fetching GeoJSON data:', error));
        this.layerList[0].isActive = false
      });
    }

  }

  getForecast(latLng: any, marker: any) {
    this.dataService.getDataByLatlng(latLng).subscribe((res: any) => {
      const actual = this.dataService.bindIcon([res?.data?.actual])?.[0];
      const metaInfo = res?.data?.metainfo;

      const data = res.data;

      const popupContent = `
        <div style="font-family: Arial, sans-serif; font-size: 13px; color: #fff; background: #222; padding: 10px; border-radius: 8px; max-width: 230px;">
          <!-- Location Title -->
          <div style="font-size: 14px; font-weight: bold; text-align: center; margin-bottom: 6px;">
            ${data.metainfo?.TEHSIL_ALIAS_NAME}, ${data.metainfo?.DISTRICT_NAME}, ${data.metainfo?.STATE_NAME}
          </div>

          <hr style="border: none; border-top: 1px solid #555; margin: 8px 0;">

          <!-- Weather Icon and Sky Condition -->
          <div style="display: flex; align-items: center; justify-content: center; margin-bottom: 10px;">
            <img src="${actual.iconImage}" alt="Weather Icon"  style="margin-right: 8px;height:80px;width:80px">
            <span style="font-size: 12px;color:white">${actual.description}</span>
          </div>

          <!-- Weather Details Grid -->
          <div style="display: grid; grid-template-columns: 1fr 1fr; row-gap: 6px; column-gap: 8px;">
            <div style="text-align: right; opacity: 0.8;">Temperature:</div>
            <div style="text-align: left; font-weight: bold;">${actual?.tmp}°C</div>

            <div style="text-align: right; opacity: 0.8;">Wind Speed:</div>
            <div style="text-align: left; font-weight: bold;">${actual?.wind} km/h</div>

            <div style="text-align: right; opacity: 0.8;">Humidity:</div>
            <div style="text-align: left; font-weight: bold;">${actual?.hr} %</div>

            <div style="text-align: right; opacity: 0.8;">Rainfall:</div>
            <div style="text-align: left; font-weight: bold;">${actual?.rain} mm</div>
           <a  href="forecast/weather/india/${metaInfo.STATE_NAME}/${metaInfo.DISTRICT_NAME}/${metaInfo.TEHSIL_ALIAS_NAME}" >Show Hourly Forecast</a>

            </div>
        </div>`;

      marker.getPopup().setContent(popupContent);
      marker.openPopup();
    });
  }

  getForecastOnMapClick(latLng: any,L:any) {
  this.dataService.getDataByLatlng(latLng).subscribe((res: any) => {
    const actual = this.dataService.bindIcon([res?.data?.actual])?.[0];
    const metaInfo = res?.data?.metainfo;
    const data = res.data;

    const popupContent = `
      <div style="font-family: Arial, sans-serif; font-size: 13px; color: #fff; background: #222; padding: 10px; border-radius: 8px; max-width: 230px;">
        <div style="font-size: 14px; font-weight: bold; text-align: center; margin-bottom: 6px;">
          ${data.metainfo?.TEHSIL_ALIAS_NAME}, ${data.metainfo?.DISTRICT_NAME}, ${data.metainfo?.STATE_NAME}
        </div>

        <hr style="border: none; border-top: 1px solid #555; margin: 8px 0;">

        <div style="display: flex; align-items: center; justify-content: center; margin-bottom: 10px;">
          <img src="${actual.iconImage}" alt="Weather Icon" style="margin-right: 8px; height: 80px; width: 80px;">
          <span style="font-size: 12px; color: white;">${actual.description}</span>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; row-gap: 6px; column-gap: 8px;">
          <div style="text-align: right; opacity: 0.8;">Temperature:</div>
          <div style="text-align: left; font-weight: bold;">${actual?.tmp}°C</div>

          <div style="text-align: right; opacity: 0.8;">Wind Speed:</div>
          <div style="text-align: left; font-weight: bold;">${actual?.wind} km/h</div>

          <div style="text-align: right; opacity: 0.8;">Humidity:</div>
          <div style="text-align: left; font-weight: bold;">${actual?.hr} %</div>

          <div style="text-align: right; opacity: 0.8;">Rainfall:</div>
          <div style="text-align: left; font-weight: bold;">${actual?.rain} mm</div>
          <a  href="forecast/weather/india/${metaInfo.STATE_NAME}/${metaInfo.DISTRICT_NAME}/${metaInfo.TEHSIL_ALIAS_NAME}">Show Hourly Forecast</a>
          </div>
      </div>`;

    // Create and open the popup at the clicked location
    L.popup({ maxWidth: 250 })
      .setLatLng(latLng)
      .setContent(popupContent)
      .openOn(this.map);
  });
}




  lightningIcon(L: any) {
    return L.icon({
      iconUrl: 'https://www.skymetweather.com/assets/img/Lightning.png',
      iconSize: [20, 20],
      iconAnchor: [45, 45],
      popupAnchor: [-3, -76],
    });
  }

  awsIcon(L: any) {
    return L.icon({
      iconUrl: 'https://www.skymetweather.com/assets/img/aws_icon_red.svg',
      iconSize: [25, 25],
      iconAnchor: [45, 45],
      popupAnchor: [-3, -76],
    });
  }


  async findLatestImage() {
    let now = new Date();
    let attempts = 0; 
    const maxAttempts = 24; 

    while (attempts < maxAttempts) {
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = Math.floor(now.getMinutes() / 15) * 15;
      const roundedMinutes = String(minutes).padStart(2, '0');

      const imageUrl = `https://skymetweather.com/themes/skymet/images/dopplerRadar/DopplerIndia_${year}${month}${day}_${hours}_${roundedMinutes}.png`;

      try {
        const response = await fetch(imageUrl, { method: 'HEAD' });
        if (response.ok) {
          return imageUrl;
        }
      } catch (error) {
        // console.error("Error checking image:", error);
      }

      now.setMinutes(now.getMinutes() - 15);
      attempts++;
    }

    return null; 
  }

  openFullscreen() {
    if (this.windowService.isBrowser()) {
      var elem: any = document.getElementById('map');
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      }
    }
  }
  shareThis() {
    if (this.windowService.isBrowser()) {
      if (navigator.share) {
        navigator
          .share({
            title: 'Check out this cool website!',
            text: 'I found this awesome site. Take a look!',
            url: window.location.href,
          })
          .then(() => console.log('Share was successful'))
          .catch((err) => console.error('Sharing failed', err));
      } else {
        alert('Your browser does not support the Web Share API');
      }
    }
  }
}

