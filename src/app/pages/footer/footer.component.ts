import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink,TranslateModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  adsEmail:any = "ads@skymetweather.com";
constructor(
  private translateService: TranslateService,
  private dataService: DataService
) {
  this.dataService.selectedLanguages.subscribe(lng => {
    this.translateService.use(lng);
  });
}

}
