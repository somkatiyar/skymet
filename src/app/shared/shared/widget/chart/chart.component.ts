import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss'
})
export class ChartComponent {
 @Input() humidity: number = 70;
   Math = Math;
}
