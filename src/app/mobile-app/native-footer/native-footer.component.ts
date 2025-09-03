import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NativeService } from '../service/native.service';
import { NgStyle } from '@angular/common';
import { NavigationBar } from '@squareetlabs/capacitor-navigation-bar'

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
    
    await NavigationBar.setTransparency({
      isTransparent:true
    });
 
  }

  ngOnDestroy() {
  }




}
