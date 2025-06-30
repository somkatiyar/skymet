import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { WindowService } from '../../../../services/window.service';

@Component({
  selector: 'app-moonrise',
  standalone: true,
  imports: [],
  templateUrl: './moonrise.component.html',
  styleUrl: './moonrise.component.scss'
})
export class MoonriseComponent implements AfterViewInit {

  @Input() angle: number = 0; 
  @ViewChild('tickLine', { static: true }) tickLine!: ElementRef<SVGLineElement>;
  @ViewChild('sunIcon', { static: true }) sunIcon!: ElementRef<HTMLImageElement>;
  @ViewChild('container', { static: true }) container!: ElementRef<HTMLDivElement>;
@ViewChild('svgRef', { static: true }) svgRef!: ElementRef<SVGSVGElement>;

  private centerX = 100;
  private centerY = 100;
  private length = 80;

  ngAfterViewInit(): void {
    this.updatePosition(this.angle);
  }

  // private updatePosition(angle: number) {
  //   const rad = angle * Math.PI / 180;
  //   const x2 = this.centerX + this.length * Math.sin(rad);
  //   const y2 = this.centerY - this.length * Math.cos(rad);

  //   // Update SVG line end
  //   this.tickLine.nativeElement.setAttribute('x2', `${x2}`);
  //   this.tickLine.nativeElement.setAttribute('y2', `${y2}`);

  //   // Update sun icon position
  //   const icon = this.sunIcon.nativeElement;
  //   icon.style.left = `${x2}px`;
  //   icon.style.top = `${y2}px`;
  // }

private updatePosition(angle: number) {
  const rad = angle * Math.PI / 180;
  const x2 = this.centerX + this.length * Math.sin(rad);
  const y2 = this.centerY - this.length * Math.cos(rad);

  // Update line position
  this.tickLine.nativeElement.setAttribute('x2', `${x2}`);
  this.tickLine.nativeElement.setAttribute('y2', `${y2}`);

  // Safely use SVG createSVGPoint
  const svg = this.svgRef.nativeElement;
  if (!svg.createSVGPoint) {
    console.warn('createSVGPoint not supported in this context');
    return;
  }

  const pt = svg.createSVGPoint();
  pt.x = x2;
  pt.y = y2;

  const globalPoint = pt.matrixTransform(svg.getScreenCTM()!);
  const containerRect = this.container.nativeElement.getBoundingClientRect();

  const left = globalPoint.x - containerRect.left;
  const top = globalPoint.y - containerRect.top;

  const icon = this.sunIcon.nativeElement;
  icon.style.left = `${left}px`;
  icon.style.top = `${top}px`;
}



}
