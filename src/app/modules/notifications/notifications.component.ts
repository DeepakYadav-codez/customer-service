import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  customerDataList: any = [];
  @Output() messageEvent = new EventEmitter<boolean>();
  constructor(private fireStore: AngularFirestore, private commonService: CommonService, private router: Router) { }

  ngOnInit(): void {
    this.fetchUserData();
  }

  fetchUserData(){
    this.fireStore.collection('customerData').get().subscribe((data: any) => {
      console.log(data,'data');
      this.customerDataList = data.docs.map((list: any) => {
        console.log(list.id);
        let obj = list.data();
        obj['id'] = list.id;
        // return { id : list.id, ...list.data()}
        return obj;
      });
      console.log(this.customerDataList, 'customer list');
      
      // map the latest technician latest details
      this.customerDataList?.map((item: any) => {
        let getLatestTechnicianDetails = item?.technicalDetails[item?.technicalDetails.length - 1 ];
        item.amount = getLatestTechnicianDetails?.amount;
        item.billNo = getLatestTechnicianDetails?.billNo;
        item.technicianName = getLatestTechnicianDetails?.technicianName;
        item.technicianRemarks = getLatestTechnicianDetails?.technicianRemarks;
        item.visitDate = getLatestTechnicianDetails?.visitDate;
        return item;
      })
      // map the latest technician latest details end

      this.customerDataList = this.customerDataList.filter((item: any) => {
        if(item?.visitDate){
          const createdAt: any = this.parseDate(item.visitDate);
          const today: any = new Date();
          const diffInDays = Math.floor((today - createdAt) / (1000 * 60 * 60 * 24));
          return diffInDays >= 90 && diffInDays <= 100;
        }else {
          return item;
        }
      });
    })
    console.log(this.customerDataList, "customer detail notif");
  }


  parseDate(date: any) {
    const [day, month, year] = date.split("/").map(Number);
    return new Date(year, month - 1, day); // month is 0-based
  }

  closePanel(){
    this.messageEvent.emit(false);
  }

  viewCustomerData(rowData: any){
    this.commonService.customerData = rowData;
    this.messageEvent.emit(false);
    this.router.navigate(['customerdetail']);
  }

}
