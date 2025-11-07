import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  viewNotificationsBar : boolean = false;
  constructor(private router: Router, private commonService: CommonService) { }

  ngOnInit(): void {
  }

  openLink(routeTo: any){
    this.router.navigate([routeTo]);
    this.commonService.customerData = null;
  }

  viewNotifications(){
    console.log('view');
    this.viewNotificationsBar = true;
  }

  panelTrigger(event: boolean){
    this.viewNotificationsBar = event;
  }
}
