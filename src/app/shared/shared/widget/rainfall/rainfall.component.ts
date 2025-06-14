import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rainfall',
  standalone: true,
  imports: [],
  templateUrl: './rainfall.component.html',
  styleUrl: './rainfall.component.scss'
})
export class RainfallComponent {
@Input() rainPercent: number = 0;


}
