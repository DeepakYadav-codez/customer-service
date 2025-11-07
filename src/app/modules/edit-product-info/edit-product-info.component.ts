import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

@Component({
  selector: 'edit-product-info',
  templateUrl: './edit-product-info.component.html',
  styleUrls: ['./edit-product-info.component.scss']
})
export class EditProductInfoComponent implements OnInit {
  productInfo!: FormGroup;
  addOnBlur = true;
  addOnBlur2 = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  spareList: any = [];
  callTypeList: any = [];
  editProductInfoData: any;

  constructor(private fireStore: AngularFirestore, private commonService: CommonService, private router: Router) { 
  
  }

  ngOnInit(): void {
    this.fireStore.collection('editproduct').get().subscribe(productEditData => {
      this.editProductInfoData = productEditData?.docs.map(item => item.data());
      this.editProductInfoData["docId"] = productEditData?.docs.map(doc => doc.id)?.toString();
      this.spareList = this.editProductInfoData[0]?.spareItem;
      this.callTypeList = this.editProductInfoData[0]?.callTypeItem;
      console.log(this.editProductInfoData)
    });

  }

  add(event: any): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.spareList.push({name: value});
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(spare: any): void {
    const index = this.spareList.indexOf(spare);

    if (index >= 0) {
      this.spareList.splice(index, 1);
    }
  }

  addCallType(event: any): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.callTypeList.push({name: value});
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  removeCallType(spare: any): void {
    const index = this.callTypeList.indexOf(spare);

    if (index >= 0) {
      this.callTypeList.splice(index, 1);
    }
  }


  saveProductData(){
    if(this.editProductInfoData?.docId){
      this.fireStore.collection("editproduct").doc(this.editProductInfoData?.docId).set({
        spareItem: this.spareList,
        callTypeItem: this.callTypeList
      })
    }
  }

}
