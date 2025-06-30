import { AfterViewInit, Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './pages/header/header.component';
import { FooterComponent } from './pages/footer/footer.component';
import { WindowService } from './services/window.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HeaderComponent,FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit {
  title = 'skymetweather';
  constructor(private windowService:WindowService,private router:Router) {

   }

   ngAfterViewInit(): void {
    // this.headerConfig();

     
   }

   headerConfig() {
    if(this.windowService.isBrowser()) {
    this.router.events.subscribe((event) => {
      if(event instanceof NavigationEnd) {
      const url = window.location.pathname;
      
      const header = document.getElementById('Header');
      if (!url.includes('resources') && header) {
          header.classList.add('navActive');
          header.style.background= 'transparent';
        
      } else if (header) {
        header.classList.remove('navActive');
        header.style.background = `linear-gradient(
       180deg,
      rgba(0, 0, 0, 0.6) 52.29%,
      rgba(255, 255, 255, 0) 100%
     )`;
      }
    }
    });
  }
   }
}
