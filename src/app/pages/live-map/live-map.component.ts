






























































// import { CommonModule } from '@angular/common';
// import {
//   AfterViewInit,
//   ChangeDetectorRef,
//   Component,
//   Input,
//   OnChanges,
//   OnDestroy,
//   SimpleChanges,
//   ViewEncapsulation,
// } from '@angular/core';
// import { DataService } from '../../services/data.service';
// import { SeoService } from '../../services/seo.service';
// import { WindowService } from '../../services/window.service';
// import * as L from 'leaflet';
// @Component({
//   selector: 'app-map',
//  templateUrl: './live-map.component.html',
//   styleUrl: './live-map.component.scss',
//   encapsulation: ViewEncapsulation.None,
//   imports:[CommonModule],
//   standalone:true
// })
// export class LiveMapComponent implements AfterViewInit, OnChanges {
//   map: any = null;
//   velocityLayer: any;
//   layerControl: any;
//   lightningLayer: any;
//   markerGroup: any;
//   markerClusterGroup: any;
//     L: any;
//   constructor(
//     private seoService: SeoService,
//     public windowService: WindowService,
//     private dataService:DataService
//   ) {}

//   ngOnChanges(changes: SimpleChanges): void {}

//   async ngAfterViewInit() {
//     if (this.windowService.isBrowser()) {
//     //   const leafletModule = await import('leaflet');
//     //    this.L = leafletModule;
//     //   await import('leaflet.markercluster');
//     //   await import('leaflet-velocity');
//     //   const globalAny = globalThis as any;
//     //   // if (!this.L.markerClusterGroup && globalAny.L?.markerClusterGroup) {
//     //   //   this.L.markerClusterGroup = globalAny?.L.markerClusterGroup || globalAny.markerClusterGroup;
//     //   // }
//     //  try {
//     //    this.L.markerClusterGroup = globalAny?.L.markerClusterGroup || globalAny.markerClusterGroup;
//     //  } catch (error) {
//     //    console.error('Error setting markerClusterGroup:', error);
//     //  }
//     //   this.L.velocityLayer = globalAny.L?.velocityLayer || globalAny.velocityLayer;
     

//       this.initMap({ lat: 28, lng: 78 });
      
     
//     }
//   }


//    initMap(latLng: any) {
//    if(this.windowService.isBrowser()) {

//     try {
//       this.map = this.windowService.L.map('map', {
//         center: [latLng.lat, latLng.lng],
//         zoom: 4,
//         minZoom: 3,
//         maxZoom: 12,
//       });
//       this.addBaseLayers(this.windowService.L);
//       this.addControls(this.windowService.L);
//       this.addMarkerLayer(this.windowService.L);
//       this.addDoplerImage(this.windowService.L);
//       this.plotIndiaLayer(this.windowService.L);
//       this.addGeoJsonLayerWithClustering(this.windowService.L);
//       this.plotVelocity(this.windowService.L);
//       this.addCurrentLocation(this.windowService.L);
//       setTimeout(() => {
//         this.map.invalidateSize();

//       }, 200);
//     } catch (error) {
//      throw error 
//     }
//     }
//   }



 
//   addCurrentLocation(L:any) {
//     var customIcon = L.icon({
//       iconUrl: 'https://www.skymetweather.com/assets/img/currentloc.svg', 
//       iconSize: [32, 32], 
//       iconAnchor: [16, 32],
//       popupAnchor: [0, -32]
//     });
//     this.map.flyTo(this.map.options.center, 6);
//     L.marker(this.map.options.center, { icon: customIcon })
//         .addTo(this.map)
//   }

//   addBaseLayers(L: any) {
//     const googleHybrid = this.windowService.L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
//       maxZoom: 20,
//       subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
//     }).addTo(this.map);

//     var OpenStreetMap =   L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.{ext}', {
//       minZoom: 0,
//       maxZoom: 20,
//       attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//       ext: 'png'
//     });

//     const baseLayers = {
//       'Satellite View': googleHybrid
//     };

//      this.layerControl = this.windowService.L.control.layers(baseLayers).addTo(this.map);

//   }

//   addControls(L: any) {
//     if(this.windowService.isBrowser()) {
//       const elements: any = document.querySelectorAll('.leaflet-right');
//       elements[0]?.classList.remove('leaflet-top');
//       elements[0]?.classList.add('custom_css');
   
//     }
   
//   }

//   addMarkerLayer(L: any) {
//     fetch('https://ngswims.skymetweather.com/serviceapi/api/createjsonlightning')
//       .then((response) => response.json())
//       .then((data) => {
//         const markers = data.map((location: any) => {
//           const coords = location.l.split(',').map(Number);
//           return L.marker([coords[1], coords[0]], { icon: this.lightningIcon(L) });
//         });

//         this.markerGroup = L.layerGroup(markers);
//         this.layerControl.addOverlay(this.markerGroup, 'Lightning');
//         this.markerGroup.addTo(this.map);
//       })
//       .catch((error) => console.error('Error fetching marker data:', error));
//   }

//   async addDoplerImage(L:any) {
//     var imageUrl =await this.findLatestImage();
//     var imageBounds = new L.LatLngBounds(new L.LatLng(36.324355,97.56348),new L.LatLng(6.274355,67.21348));
//     var radarImage = L.imageOverlay(imageUrl, imageBounds);
//     this.layerControl.addOverlay(radarImage, 'Radar');
//   }

//   plotIndiaLayer(L: any) {
//     L.tileLayer.wms('https://geo.skymetweather.com/geoserver/cite/wms?', {
//       layers: 'cite:india',
//       transparent: true,
//       format: 'image/png',
//       opacity: 1,
//     }).addTo(this.map);
//   }

//   plotVelocity(L: any) {
//     if (this.windowService.isBrowser()) {
//       import('leaflet-velocity')
//         .then((res) => {
//           fetch('https://ngswims.skymetweather.com/serviceapi/api/windDataJSON')
//             .then((response) => response.json())
//             .then((data) => {
//               const velocityLayer = L.velocityLayer({
//                 displayValues: true,
//                 maxVelocity: 15,
//                 velocityScale: 0.01,
//                 displayOptions: {
//                   velocityType: 'Wind',
//                   displayPosition: 'bottomleft',
//                   displayEmptyString: 'No wind data',
//                 },
//                 data: data,
//                 colorScale: ['#00FF00', '#FF0000'],
//               });

//               velocityLayer.addTo(this.map);
//               this.layerControl.addOverlay(velocityLayer, 'Winds');
//             })
//             .catch((error) => console.error('Error fetching wind data:', error));
//         })
//         .catch((err) => console.error('Error loading leaflet-velocity:', err));
//     }
//   }

//   // addGeoJsonLayerWithClustering(L: any): void {
//   //   import('leaflet.markercluster').then(() => {
//   //     this.markerClusterGroup = L.markerClusterGroup();
//   //     fetch('https://ngswims.skymetweather.com/serviceapi/api/awsDataJSON')
//   //       .then((res) => res.json())
//   //       .then((data) => {
//   //         const geoJsonLayer = L.geoJson(data, {
//   //           pointToLayer: (feature: any, latlng: any) =>
//   //             L.marker(latlng, { icon: this.awsIcon(L) }),
            
//   //         });
//   //         this.markerClusterGroup.addLayer(geoJsonLayer);
//   //         this.layerControl.addOverlay(this.markerClusterGroup, 'AWS');
//   //         this.markerClusterGroup.addTo(this.map);
//   //       })
//   //       .catch((error) => console.error('Error fetching GeoJSON data:', error));
//   //   });
//   // }
//   addGeoJsonLayerWithClustering(L: any): void {
//     if(this.windowService.isBrowser()) {
//       import('leaflet.markercluster').then(() => {
//            this.markerClusterGroup = L.markerClusterGroup();
//       fetch('https://ngswims.skymetweather.com/serviceapi/api/awsDataJSON')
//         .then((res) => res.json())
//         .then((data) => {
//           const geoJsonLayer = L.geoJson(data, {
//             pointToLayer: (feature: any, latlng: any) => {
//               const marker = L.marker(latlng, { icon: this.awsIcon(L) });

//               // Initial popup content
//               marker.bindPopup('<b>Loading forecast...</b>');
  
//               // Add click event listener
//               marker.on('click', () => {
//                 this.getForecast(latlng, marker);
//               });
  
//               return marker;
//             },
//           });
  
//           this.markerClusterGroup.addLayer(geoJsonLayer);
//           this.layerControl.addOverlay(this.markerClusterGroup, 'AWS');
//           this.markerClusterGroup.addTo(this.map);
//         })
//         .catch((error) => console.error('Error fetching GeoJSON data:', error));
    
//       });
//     }
  
//   }
  
//   getForecast(latLng: any, marker: any) {
//     this.dataService.getDataByLatlng(latLng).subscribe((res: any) => {
//       var actual =  this.dataService.bindIcon([res?.data?.actual])?.[0];
//       var data = res.data;
//       const popupContent = `<div class="card weather-card">
//         <div class="card-body text-center">
//           <!-- Title -->
//           <h6 class="card-title location">
//           ${data.metainfo?.TEHSIL_ALIAS_NAME},
//           ${data.metainfo?.DISTRICT_NAME},
//            ${data.metainfo?.STATE_NAME}</h6>
//           <hr>
      
//           <!-- Weather Icon & Description -->
//           <div class="weather-icon">
//             <img src="${actual.iconImage}" alt="Weather Icon" width="50">
//             <p class="weather-text">Cloudy</p>
//           </div>
      
//           <!-- Weather Parameters -->
//           <div class="weather-details">
//             <p><strong>Temperature:</strong> ${actual?.tmp}°C</p>
//             <p><strong>Wind Speed:</strong> ${actual?.wind} km/h</p>
//             <p><strong>Humidity:</strong> ${actual?.hr} %</p>
//             <p><strong>Rainfall:</strong> ${actual?.rain} mm</p>
//           </div>
//         </div>
//       </div>`;
  
//       marker.getPopup().setContent(popupContent);
//       marker.openPopup();
//     });
//   }

//   lightningIcon(L: any) {
//     return L.icon({
//       iconUrl: 'https://www.skymetweather.com/assets/img/Lightning.png',
//       iconSize: [20, 20],
//       iconAnchor: [45, 45],
//       popupAnchor: [-3, -76],
//     });
//   }

//   awsIcon(L: any) {
//     return L.icon({
//       iconUrl: 'assets/img/aws_icon_red.svg',
//       iconSize: [25, 25],
//       iconAnchor: [45, 45],
//       popupAnchor: [-3, -76],
//     });
//   }

// //   async findLatestImage() {
// //     let now = new Date();
    
// //     while (true) {
// //         const year = now.getFullYear();
// //         const month = String(now.getMonth() + 1).padStart(2, '0');
// //         const day = String(now.getDate()).padStart(2, '0');
// //         const hours = String(now.getHours()).padStart(2, '0');
// //         const minutes = Math.floor(now.getMinutes() / 15) * 15;
// //         const roundedMinutes = String(minutes).padStart(2, '0');

// //         const imageUrl = `https://skymetweather.com/themes/skymet/images/dopplerRadar/DopplerIndia_${year}${month}${day}_${hours}_${roundedMinutes}.png`;

// //         try {
// //             const response = await fetch(imageUrl, { method: 'HEAD' }); 
// //             if (response.ok) {
// //                 return imageUrl; 
// //             }
// //         } catch (error) {
// //            // console.error("Error checking image:", error);
// //         }

// //         now.setMinutes(now.getMinutes() - 15);
// //     }
// // }
// async findLatestImage() {
//   let now = new Date();
//   let attempts = 0; // Track the number of attempts
//   const maxAttempts = 24; // 24 hours / 15-minute intervals = 96 attempts

//   while (attempts < maxAttempts) {
//       const year = now.getFullYear();
//       const month = String(now.getMonth() + 1).padStart(2, '0');
//       const day = String(now.getDate()).padStart(2, '0');
//       const hours = String(now.getHours()).padStart(2, '0');
//       const minutes = Math.floor(now.getMinutes() / 15) * 15;
//       const roundedMinutes = String(minutes).padStart(2, '0');

//       const imageUrl = `https://skymetweather.com/themes/skymet/images/dopplerRadar/DopplerIndia_${year}${month}${day}_${hours}_${roundedMinutes}.png`;

//       try {
//           const response = await fetch(imageUrl, { method: 'HEAD' });
//           if (response.ok) {
//               return imageUrl; 
//           }
//       } catch (error) {
//           // console.error("Error checking image:", error);
//       }

//       now.setMinutes(now.getMinutes() - 15);
//       attempts++; // Increment attempts
//   }

//   return null; // Return null if no image found in the last 24 hours
// }

// openFullscreen() {
//   if (this.windowService.isBrowser()) {
//     var elem: any = document.getElementById('map');
//     if (elem.requestFullscreen) {
//       elem.requestFullscreen();
//     } else if (elem.webkitRequestFullscreen) {
//       elem.webkitRequestFullscreen();
//     } else if (elem.msRequestFullscreen) {
//       elem.msRequestFullscreen();
//     }
//   }
// }
// shareThis() {
//   if (this.windowService.isBrowser()) {
//     if (navigator.share) {
//       navigator
//         .share({
//           title: 'Check out this cool website!',
//           text: 'I found this awesome site. Take a look!',
//           url: window.location.href,
//         })
//         .then(() => console.log('Share was successful'))
//         .catch((err) => console.error('Sharing failed', err));
//     } else {
//       alert('Your browser does not support the Web Share API');
//     }
//   }
// }
// }



// development 


import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { DataService } from '../../services/data.service';
import { SeoService } from '../../services/seo.service';
import { WindowService } from '../../services/window.service';
import * as L from 'leaflet';
@Component({
  selector: 'app-map',
 templateUrl: './live-map.component.html',
  styleUrl: './live-map.component.scss',
  encapsulation: ViewEncapsulation.None,
  imports:[CommonModule],
  standalone:true
})
export class LiveMapComponent implements AfterViewInit, OnChanges {
  map: any = null;
  velocityLayer: any;
  layerControl: any;
  lightningLayer: any;
  markerGroup: any;
  markerClusterGroup: any;
    L: any;
  constructor(
    private seoService: SeoService,
    public windowService: WindowService,
    private dataService:DataService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {}

  async ngAfterViewInit() {
    if (this.windowService.isBrowser()) {
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
      
     
    }
  }


   initMap(latLng: any) {
   if(this.windowService.isBrowser()) {

    try {
      this.map = this.L.map('map', {
        center: [latLng.lat, latLng.lng],
        zoom: 4,
        minZoom: 3,
        maxZoom: 12,
      });
      this.addBaseLayers(this.L);
      this.addControls(this.L);
      this.addMarkerLayer(this.L);
      this.addDoplerImage(this.L);
      this.plotIndiaLayer(this.L);
      this.addGeoJsonLayerWithClustering(this.L);
      this.plotVelocity()
      this.addCurrentLocation(this.L);
      setTimeout(() => {
        this.map.invalidateSize();

      }, 200);
    } catch (error) {
     throw error 
    }
    }
  }



 
  addCurrentLocation(L:any) {
    var customIcon = L.icon({
      iconUrl: 'https://www.skymetweather.com/assets/img/currentloc.svg', 
      iconSize: [32, 32], 
      iconAnchor: [16, 32],
      popupAnchor: [0, -32]
    });
    this.map.flyTo(this.map.options.center, 6);
    L.marker(this.map.options.center, { icon: customIcon })
        .addTo(this.map)
  }

  addBaseLayers(L: any) {
    const googleHybrid = this.L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    }).addTo(this.map);

    var OpenStreetMap =   L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.{ext}', {
      minZoom: 0,
      maxZoom: 20,
      attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      ext: 'png'
    });

    const baseLayers = {
      'Satellite View': googleHybrid
    };

     this.layerControl = this.L.control.layers(baseLayers).addTo(this.map);

  }

  addControls(L: any) {
    if(this.windowService.isBrowser()) {
      const elements: any = document.querySelectorAll('.leaflet-right');
      elements[0]?.classList.remove('leaflet-top');
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
      })
      .catch((error) => console.error('Error fetching marker data:', error));
  }

  async addDoplerImage(L:any) {
    var imageUrl =await this.findLatestImage();
    var imageBounds = new L.LatLngBounds(new L.LatLng(36.324355,97.56348),new L.LatLng(6.274355,67.21348));
    var radarImage = L.imageOverlay(imageUrl, imageBounds);
    this.layerControl.addOverlay(radarImage, 'Radar');
  }

  plotIndiaLayer(L: any) {
    L.tileLayer.wms('https://geo.skymetweather.com/geoserver/cite/wms?', {
      layers: 'cite:india',
      transparent: true,
      format: 'image/png',
      opacity: 1,
    }).addTo(this.map);
  }

  plotVelocity() {
    if (this.windowService.isBrowser()) {
      import('leaflet-velocity')
        .then((res) => {
          fetch('https://ngswims.skymetweather.com/serviceapi/api/windDataJSON')
            .then((response) => response.json())
            .then((data) => {
              const velocityLayer = this.L.velocityLayer({
                displayValues: true,
                maxVelocity: 15,
                velocityScale: 0.01,
                displayOptions: {
                  velocityType: 'Wind',
                  displayPosition: 'bottomleft',
                  displayEmptyString: 'No wind data',
                },
                data: data,
                colorScale: ['#00FF00', '#FF0000'],
              });

              velocityLayer.addTo(this.map);
              this.layerControl.addOverlay(velocityLayer, 'Winds');
            })
            .catch((error) => console.error('Error fetching wind data:', error));
        })
        .catch((err) => console.error('Error loading leaflet-velocity:', err));
    }
  }

  // addGeoJsonLayerWithClustering(L: any): void {
  //   import('leaflet.markercluster').then(() => {
  //     this.markerClusterGroup = L.markerClusterGroup();
  //     fetch('https://ngswims.skymetweather.com/serviceapi/api/awsDataJSON')
  //       .then((res) => res.json())
  //       .then((data) => {
  //         const geoJsonLayer = L.geoJson(data, {
  //           pointToLayer: (feature: any, latlng: any) =>
  //             L.marker(latlng, { icon: this.awsIcon(L) }),
            
  //         });
  //         this.markerClusterGroup.addLayer(geoJsonLayer);
  //         this.layerControl.addOverlay(this.markerClusterGroup, 'AWS');
  //         this.markerClusterGroup.addTo(this.map);
  //       })
  //       .catch((error) => console.error('Error fetching GeoJSON data:', error));
  //   });
  // }
  addGeoJsonLayerWithClustering(L: any): void {
    if(this.windowService.isBrowser()) {
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
        })
        .catch((error) => console.error('Error fetching GeoJSON data:', error));
    
      });
    }
  
  }
  
  getForecast(latLng: any, marker: any) {
    this.dataService.getDataByLatlng(latLng).subscribe((res: any) => {
      var actual =  this.dataService.bindIcon([res?.data?.actual])?.[0];
      var data = res.data;
      const popupContent = `<div class="card weather-card">
        <div class="card-body text-center">
          <!-- Title -->
          <h6 class="card-title location">
          ${data.metainfo?.TEHSIL_ALIAS_NAME},
          ${data.metainfo?.DISTRICT_NAME},
           ${data.metainfo?.STATE_NAME}</h6>
          <hr>
      
          <!-- Weather Icon & Description -->
          <div class="weather-icon">
            <img src="${actual.iconImage}" alt="Weather Icon" width="50">
            <p class="weather-text">Cloudy</p>
          </div>
      
          <!-- Weather Parameters -->
          <div class="weather-details">
            <p><strong>Temperature:</strong> ${actual?.tmp}°C</p>
            <p><strong>Wind Speed:</strong> ${actual?.wind} km/h</p>
            <p><strong>Humidity:</strong> ${actual?.hr} %</p>
            <p><strong>Rainfall:</strong> ${actual?.rain} mm</p>
          </div>
        </div>
      </div>`;
  
      marker.getPopup().setContent(popupContent);
      marker.openPopup();
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
      iconUrl: 'assets/img/aws_icon_red.svg',
      iconSize: [25, 25],
      iconAnchor: [45, 45],
      popupAnchor: [-3, -76],
    });
  }

//   async findLatestImage() {
//     let now = new Date();
    
//     while (true) {
//         const year = now.getFullYear();
//         const month = String(now.getMonth() + 1).padStart(2, '0');
//         const day = String(now.getDate()).padStart(2, '0');
//         const hours = String(now.getHours()).padStart(2, '0');
//         const minutes = Math.floor(now.getMinutes() / 15) * 15;
//         const roundedMinutes = String(minutes).padStart(2, '0');

//         const imageUrl = https://skymetweather.com/themes/skymet/images/dopplerRadar/DopplerIndia_${year}${month}${day}_${hours}_${roundedMinutes}.png;

//         try {
//             const response = await fetch(imageUrl, { method: 'HEAD' }); 
//             if (response.ok) {
//                 return imageUrl; 
//             }
//         } catch (error) {
//            // console.error("Error checking image:", error);
//         }

//         now.setMinutes(now.getMinutes() - 15);
//     }
// }
async findLatestImage() {
  let now = new Date();
  let attempts = 0; // Track the number of attempts
  const maxAttempts = 24; // 24 hours / 15-minute intervals = 96 attempts

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
      attempts++; // Increment attempts
  }

  return null; // Return null if no image found in the last 24 hours
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

