import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DataService } from '../../services/data.service';
import { CommonModule } from '@angular/common';
import { WindowService } from '../../services/window.service';

@Component({
  selector: 'app-district-location',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './district-location.component.html',
  styleUrl: './district-location.component.scss'
})
export class DistrictLocationComponent {
  tehsilList: any[] = [];
  state:any;
  district:any;
  constructor(private route: ActivatedRoute, 
    private router:Router,private windowService: WindowService,
    private dataService: DataService) {
    this.route.paramMap.subscribe(params => {
      this.state = params.get('state');
      this.district = params.get('district');
      if (this.state && this.district) {
        this.getDistrictWiseList(this.state, this.district);
      }
    });
  }

  getDistrictWiseList(state: string, district: string) {
    this.dataService.districtwiseList(state, district).subscribe(res => {
      this.tehsilList = res && res;
    })
  }
  goToForecast(item:any) {
    if(this.windowService.isBrowser()) {
      this.router.navigate(['/weather/forecast/india', this.state, this.district,item.Tehsil]);
  }
}
}
