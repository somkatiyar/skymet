import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { NotificationService } from '../service/notification.service';
import { WindowService } from '../../services/window.service';

@Component({
  selector: 'app-notification-screen',
  standalone: true,
  imports: [],
  templateUrl: './notification-screen.component.html',
  styleUrl: './notification-screen.component.scss'
})
export class NotificationScreenComponent implements AfterViewInit,OnDestroy{
  constructor(private pushService: NotificationService,private windoSwervice:WindowService) {

  }
  ngAfterViewInit(): void {
    if(this.windoSwervice.isBrowser()) {
          document.body.style.paddingBottom = '0px';
    }
  }
  ngOnDestroy(): void {
       if(this.windoSwervice.isBrowser()) {
          document.body.style.paddingBottom = '100px';
    }
  }
  openNotificationPopUp() {
   this.pushService.initPush();
  }
}
