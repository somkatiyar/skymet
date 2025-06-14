import { AfterViewInit, Component, OnChanges, SimpleChanges } from '@angular/core';
import { WindowService } from '../../../../services/window.service';
declare var Chart:any;
@Component({
  selector: 'app-air-quality',
  standalone: true,
  imports: [],
  templateUrl: './air-quality.component.html',
  styleUrl: './air-quality.component.scss'
})
export class AirQualityComponent implements AfterViewInit {
chart:any;
constructor(private windowService:WindowService) {

}
  ngAfterViewInit(): void {
    if(this.windowService.isBrowser()) {

  const aqiValue = 146;

  const segments = [
    { label: 'Good', value: 50, color: '#E30513' },
    { label: 'Moderate', value: 50, color: '#FF6457' },
    { label: 'Unhealthy for Sensitive Groups', value: 100,color:'green' },
    { label: 'Unhealthy', value: 100, color: '#FF6457' },
    { label: 'Very Unhealthy', value: 100, color: '#FF6457' },
    { label: 'Hazardous', value: 150, color: '#E30513' }
  ];

  const totalAQI = segments.reduce((sum, s) => sum + s.value, 0);

  const data = {
    labels: segments.map(s => s.label),
    datasets: [{
      data: segments.map(s => s.value),
      backgroundColor: segments.map(s => s.color),
      borderColor: "#ffffff",
      borderWidth: 1,
      borderRadius: 3, 
    }]
  };

  const config = {
    type: 'doughnut',
    data,
    options: {
      responsive: true,
      rotation: -90,
      circumference: 180,
      cutout: '80%', // ✅ Thinner ring
      plugins: {
        legend: { display: false }
      }
    },
   plugins: [{
  id: 'tickPlugin',
  afterDraw(chart:any) {
    const { ctx } = chart;
    const meta = chart.getDatasetMeta(0);
    const centerX = meta.data[0].x;
    const centerY = meta.data[0].y;
    const radius = meta.data[0].outerRadius;
    const startAngle = -Math.PI;
    const aqiRatio = Math.min(aqiValue / totalAQI, 1);
    const angle = startAngle + (Math.PI * aqiRatio);

    // Draw AQI tick
    const tickLength = 16;
    const tickX = centerX + Math.cos(angle) * radius;
    const tickY = centerY + Math.sin(angle) * radius;

    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.moveTo(
      centerX + Math.cos(angle) * (radius - tickLength),
      centerY + Math.sin(angle) * (radius - tickLength)
    );
    ctx.lineTo(tickX, tickY);
    ctx.stroke();
    ctx.restore();

    // AQI text in center
    const textCenterY = centerY - radius / 4;
    ctx.save();
    ctx.fillStyle = '#000';
    ctx.font = 'bold 18px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(aqiValue.toString(), centerX, textCenterY - 8);
    ctx.restore();

    ctx.save();
    ctx.fillStyle = '#444';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('AQI Index', centerX, textCenterY + 12);
    ctx.restore();

    // 📌 Draw numbers along the arc (e.g., 50, 100, ...)
    const values = [25, 100, 200, 300, 400];
    values.forEach(v => {
      const ratio = v / totalAQI;
      if (ratio <= 1) {
        const a = startAngle + ratio * Math.PI;
        const x = centerX + Math.cos(a) * (radius + 10);
        const y = centerY + Math.sin(a) * (radius + 10);

        ctx.save();
        ctx.fillStyle = '#333';
        ctx.font = '10px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(v.toString(), x, y);
        ctx.restore();
      }
    });
  }
}]

  };

  new Chart(document.getElementById('aqiDonutChart'), config);

    }
  }
}
