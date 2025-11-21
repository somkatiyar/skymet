import { Component } from '@angular/core';
import { WindowService } from '../../services/window.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  
})
export class ProfileComponent {
  selectedTheme:any = 'light';
  constructor(private windowService:WindowService){
   
  }

  goBack(){
     if(this.windowService.isBrowser()){
    window.history.back();
    }
  }
  toggleTheme(theme: 'light' | 'dark-theme') {
    if(this.windowService.isBrowser()){
      this.selectedTheme = theme;
    document.body.classList.remove('light', 'dark-theme');
    document.body.classList.add(theme);
    }
  }
}
