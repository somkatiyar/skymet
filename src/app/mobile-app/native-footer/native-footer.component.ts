import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NativeService } from '../service/native.service';
import { NgStyle } from '@angular/common';
import { SafeArea } from 'capacitor-plugin-safe-area';
@Component({
  selector: 'app-native-footer',
  standalone: true,
  imports: [RouterLink,NgStyle],
  templateUrl: './native-footer.component.html',
  styleUrl: './native-footer.component.scss'
})
export class NativeFooterComponent implements AfterViewInit,OnDestroy {
  constructor(public nativeService:NativeService) {}

  async ngAfterViewInit() {
  //this.initSafeArea();

  }

async  initSafeArea() {
  const { insets } = await SafeArea.getSafeAreaInsets();
  this.updateFooterInset(insets.bottom);

  await SafeArea.removeAllListeners();
  await SafeArea.addListener('safeAreaChanged', ({ insets }) => {
    this.updateFooterInset(insets.bottom);
  });
}
updateFooterInset(bottom: number) {
  const footerBottom = bottom > 20 ? 23 : 0;
  document.documentElement.style.setProperty('--footer-bottom', `${footerBottom}px`);
}
  ngOnDestroy() {
  }




}
