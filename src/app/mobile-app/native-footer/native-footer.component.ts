import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NativeService } from '../service/native.service';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-native-footer',
  standalone: true,
  imports: [RouterLink,NgStyle],
  templateUrl: './native-footer.component.html',
  styleUrl: './native-footer.component.scss'
})
export class NativeFooterComponent {
  constructor(public nativeService:NativeService) {

  }
}
