import { Component, Input, input, OnChanges, SimpleChanges } from '@angular/core';
import { WindowService } from '../../../../services/window.service';

@Component({
  selector: 'app-uv-index',
  standalone: true,
  imports: [],
  templateUrl: './uv-index.component.html',
  styleUrl: './uv-index.component.scss'
})
export class UvIndexComponent {
  @Input()uvIndexValue:any= 0;


  constructor(private windowService:WindowService) {

  }

  
}
