// src/app/services/pull-to-refresh.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PullToRefreshService {
  private startY = 0;
  private isPulling = false;

  init(callback: () => void) {
    window.addEventListener('touchstart', this.onTouchStart.bind(this));
    window.addEventListener('touchmove', this.onTouchMove.bind(this));
    window.addEventListener('touchend', this.onTouchEnd.bind(this, callback));
  }

  private onTouchStart(event: TouchEvent) {
    this.startY = event.touches[0].clientY;
    this.isPulling = false;
  }

  private onTouchMove(event: TouchEvent) {
    const currentY = event.touches[0].clientY;
    if (window.scrollY === 0 && currentY - this.startY > 60) {
      this.isPulling = true;
      document.body.classList.add('pulling');
    }
  }

  private onTouchEnd(callback: () => void) {
    if (this.isPulling) {
      callback();
    }
    this.isPulling = false;
    document.body.classList.remove('pulling');
  }
}
