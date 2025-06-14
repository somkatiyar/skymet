import { Routes } from '@angular/router';
import { ForecastClubComponent } from '../forecast-club/forecast-club.component';
import { HomeComponent } from '../home/home.component';


export const forecastRoutes: Routes = [
  {path:'', component:HomeComponent},
    {
        path: '',
        children: [
          {
            path: ':country/:state/:district/:tehsil',
            component: ForecastClubComponent
          },
          {
            path: ':country/:state/:district/:tehsil/fifteen-days-forecast',
            component: ForecastClubComponent
          },
          {
            path: ':country/:state/:district/:tehsil/extended-forecast',
            component: ForecastClubComponent
          },
          {
            path: ':country/:state/:district/:tehsil/weekly-forecast',
            component: ForecastClubComponent
          },
          {
            path: ':country/:state/:district/:tehsil/hourly-forecast',
            component: ForecastClubComponent
          },
          {
            path: ':country/:state/:district/:tehsil/current-weather',
            component: ForecastClubComponent
          }
        ]
      },
      {
        path: 'weather',
        children: [
          {
            path: ':country/:state/:district/:tehsil',
            component: ForecastClubComponent
          },
          {
            path: ':country/:state/:district/:tehsil/fifteen-days-forecast',
            component: ForecastClubComponent
          },
          {
            path: ':country/:state/:district/:tehsil/extended-forecast',
            component: ForecastClubComponent
          },
          {
            path: ':country/:state/:district/:tehsil/weekly-forecast',
            component: ForecastClubComponent
          },
          {
            path: ':country/:state/:district/:tehsil/hourly-forecast',
            component: ForecastClubComponent
          },
          {
            path: ':country/:state/:district/:tehsil/current-weather',
            component: ForecastClubComponent
          }
        ]
      },
      {
        path: 'forecast',
        children: [
          {
            path: ':country/:state/:district/:tehsil',
            component: ForecastClubComponent
          },
          {
            path: ':country/:state/:district/:tehsil/fifteen-days-forecast',
            component: ForecastClubComponent
          },
          {
            path: ':country/:state/:district/:tehsil/extended-forecast',
            component: ForecastClubComponent
          },
          {
            path: ':country/:state/:district/:tehsil/weekly-forecast',
            component: ForecastClubComponent
          },
          {
            path: ':country/:state/:district/:tehsil/hourly-forecast',
            component: ForecastClubComponent
          },
          {
            path: ':country/:state/:district/:tehsil/current-weather',
            component: ForecastClubComponent
          }
        ]
      },
      {
        path: 'forecast/weather',
        children: [
          {
            path: ':country/:state/:district/:tehsil',
            component: ForecastClubComponent
          },
          {
            path: ':country/:state/:district/:tehsil/fifteen-days-forecast',
            component: ForecastClubComponent
          },
          {
            path: ':country/:state/:district/:tehsil/extended-forecast',
            component: ForecastClubComponent
          },
          {
            path: ':country/:state/:district/:tehsil/weekly-forecast',
            component: ForecastClubComponent
          },
          {
            path: ':country/:state/:district/:tehsil/hourly-forecast',
            component: ForecastClubComponent
          },
          {
            path: ':country/:state/:district/:tehsil/current-weather',
            component: ForecastClubComponent
          }
        ]
      },
 

    // with lng
    {
        path:':lng',
        children:[
            {
                path:':country/:state/:district/:tehsil',
                component:ForecastClubComponent
            },
            {
                path:':country/:state/:district/:tehsil/fifteen-days-forecast',
                component:ForecastClubComponent
            },
            {
                path:':country/:state/:district/:tehsil/extended-forecast',
                component:ForecastClubComponent
            },
            {
                path:':country/:state/:district/:tehsil/weekly-forecast',
                component:ForecastClubComponent
            },
            {
                path:':country/:state/:district/:tehsil/hourly-forecast',
                component:ForecastClubComponent
            },
            {
                path:':country/:state/:district/:tehsil/current-weather',
                component:ForecastClubComponent
            }
        ]
    },
    {
        path:':lng/weather',
        children:[
            {
                path:':country/:state/:district/:tehsil',
                component:ForecastClubComponent
            },
            {
                path:':country/:state/:district/:tehsil/fifteen-days-forecast',
                component:ForecastClubComponent
            },
            {
                path:':country/:state/:district/:tehsil/extended-forecast',
                component:ForecastClubComponent
            },
            {
                path:':country/:state/:district/:tehsil/weekly-forecast',
                component:ForecastClubComponent
            },
            {
                path:':country/:state/:district/:tehsil/hourly-forecast',
                component:ForecastClubComponent
            },
            {
                path:':country/:state/:district/:tehsil/current-weather',
                component:ForecastClubComponent
            }
        ]
    },
    {
        path:':lng/forecast',
        children:[
            {
                path:':country/:state/:district/:tehsil',
                component:ForecastClubComponent
            },
            {
                path:':country/:state/:district/:tehsil/fifteen-days-forecast',
                component:ForecastClubComponent
            },
            {
                path:':country/:state/:district/:tehsil/extended-forecast',
                component:ForecastClubComponent
            },
            {
                path:':country/:state/:district/:tehsil/weekly-forecast',
                component:ForecastClubComponent
            },
            {
                path:':country/:state/:district/:tehsil/hourly-forecast',
                component:ForecastClubComponent
            },
            {
                path:':country/:state/:district/:tehsil/current-weather',
                component:ForecastClubComponent
            }
        ]
    },
    {
        path:':lng/forecast/weather',
        children:[
            {
                path:':country/:state/:district/:tehsil',
                component:ForecastClubComponent
            },
            {
                path:':country/:state/:district/:tehsil/fifteen-days-forecast',
                component:ForecastClubComponent
            },
            {
                path:':country/:state/:district/:tehsil/extended-forecast',
                component:ForecastClubComponent
            },
            {
                path:':country/:state/:district/:tehsil/weekly-forecast',
                component:ForecastClubComponent
            },
            {
                path:':country/:state/:district/:tehsil/hourly-forecast',
                component:ForecastClubComponent
            },
            {
                path:':country/:state/:district/:tehsil/current-weather',
                component:ForecastClubComponent
            }
        ]
    },



];




