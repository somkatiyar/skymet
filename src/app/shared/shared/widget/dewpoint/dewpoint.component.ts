import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { WindowService } from '../../../../services/window.service';

@Component({
  selector: 'app-dewpoint',
  standalone: true,
  imports: [],
  templateUrl: './dewpoint.component.html',
  styleUrl: './dewpoint.component.scss'
})
export class DewpointComponent implements OnChanges {

  @Input() dewPointPercent: number = 0; // Accept value between 0 and 100

  constructor(private windowService: WindowService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.windowService.isBrowser()) {
      setTimeout(() => {
        const outerHeight = 134;
      const innerDiv = document.getElementById('innerDiv') as HTMLElement | null;
      
        
      if (innerDiv) {
        const percent = Math.max(0, Math.min(100, this.dewPointPercent)); 
        const fillRatio = percent / 100;
        const newHeight = outerHeight * fillRatio;
  console.log(newHeight,'innerDiv');
        innerDiv.style.height = `${newHeight}px`;
      }
      }, 2000);
    }
  }
} 
