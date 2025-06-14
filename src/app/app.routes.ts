import { Routes } from '@angular/router';
import { ForecastClubComponent } from './pages/forecast-club/forecast-club.component';
import { HomeComponent } from './pages/home/home.component';
import { SatelliteImageComponent } from './pages/satellite-image/satellite-image.component';
import { GallaryComponent } from './shared/shared/widget/gallary/gallary.component';
import { SpeedometerComponent } from './shared/shared/widget/speedometer/speedometer.component';
import { ResourcesComponent } from './pages/resources/resources.component';
import { StateWeatherComponent } from './pages/state-weather/state-weather.component';
import { ArticleDetailComponent } from './pages/article-detail/article-detail.component';
import { RainfallModelComponent } from './shared/shared/widget/rainfall-model/rainfall-model.component';


export const routes: Routes = [
    { path:'', component: HomeComponent},
    { path:'en', component: HomeComponent},
    { path:'hi', component: HomeComponent},
    { path:'mr', component: HomeComponent},
    { path:'resources', component: ResourcesComponent},
     { path:'state-weather', component: StateWeatherComponent},
     { path:'forecast-map', component: RainfallModelComponent},
    { path:'content/:category/:title', component: ArticleDetailComponent},
    { path: ':himawari-latest-satellite-images-of-india', component: GallaryComponent },
    { path: ':himawari-latest-satellite-images-of-india/:time', component: GallaryComponent },
    { path: 'insat/weather-satellite-images-of-india/:time', component: GallaryComponent },
    { path: 'insat/weather-satellite-images-of-india', component: GallaryComponent },
    {path:'forecast', component:ForecastClubComponent},
    {
        path: ':lang',
        children:[

            {
                path:':country/:state/:district/:tehsil',
                component:ForecastClubComponent
            },
            {
                path:':country/:state/:district/:tehsil/:mode',
                component:ForecastClubComponent
            },
            {
                path:':country/:state/:district/:tehsil/:mode',
                component:ForecastClubComponent
            },
            {
                path:':country/:state/:district/:tehsil/:mode',
                component:ForecastClubComponent
            },
            {
                path:':country/:state/:district/:tehsil/:mode',
                component:ForecastClubComponent
            },






            {
                path:'weather/:country/:state/:district/:tehsil',
                component:ForecastClubComponent
            },
            {
                path:'weather/:country/:state/:district/:tehsil/:mode',
                component:ForecastClubComponent
            },
            {
                path:'weather/:country/:state/:district/:tehsil/:mode',
                component:ForecastClubComponent
            },
            {
                path:'weather/:country/:state/:district/:tehsil/:mode',
                component:ForecastClubComponent
            },
            {
                path:'weather/:country/:state/:district/:tehsil/:mode',
                component:ForecastClubComponent
            },



            {
                path:'forecast/:country/:state/:district/:tehsil',
                component:ForecastClubComponent
            },
            {
                path:'forecast/:country/:state/:district/:tehsil/:mode',
                component:ForecastClubComponent
            },
            {
                path:'forecast/:country/:state/:district/:tehsil/:mode',
                component:ForecastClubComponent
            },
            {
                path:'forecast/:country/:state/:district/:tehsil/:mode',
                component:ForecastClubComponent
            },
            {
                path:'forecast/:country/:state/:district/:tehsil/:mode',
                component:ForecastClubComponent
            },



            {
                path:'weather/forecast/:country/:state/:district/:tehsil',
                component:ForecastClubComponent
            },
            {
                path:'weather/forecast/:country/:state/:district/:tehsil/hourly-forecast',
                component:ForecastClubComponent
            },
            {
                path:'weather/forecast/:country/:state/:district/:tehsil/weekly-forecast',
                component:ForecastClubComponent
            },
            {
                path:'weather/forecast/:country/:state/:district/:tehsil/extended-forecast',
                component:ForecastClubComponent
            },
            {
                path:'weather/forecast/:country/:state/:district/:tehsil/fifteen-days-forecast',
                component:ForecastClubComponent
            },
            
        ]
        
    }
];
