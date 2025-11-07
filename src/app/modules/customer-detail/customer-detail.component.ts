import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { take } from 'rxjs';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent implements OnInit {
  customerDetail!: FormGroup;
  productList: Array<String> = [];
  callTypeList: Array<String> = [];
  serviceTypeList: Array<String> = [];
  constructor(private fireStore: AngularFirestore, private commonService: CommonService, private router: Router, private formBuilder: FormBuilder) {
    this.customerDetail = this.formBuilder.group({
      serviceType: new FormControl(null, [Validators.required]),
      fullName: new FormControl(null, [Validators.required]),
      // emailId: new FormControl(null),
      contactNo: new FormControl(null, [Validators.required]),
      complaintNo: new FormControl(null, [Validators.required]),
      address: new FormControl(null),
      area: new FormControl(null),
      productType: new FormControl(null, [Validators.required]),
      modelNo: new FormControl(null, [Validators.required]),
      serialNo: new FormControl(null),
      purchaseDate: new FormControl(null, [Validators.required]),
      callType: new FormControl(null),
      technicalDetails: new FormArray([])
    })

    // this.productList = ['RO Membrane In Wielded Housing', 'SHF RO Membrane In Wielded Housing', 'HF RO Membrane In Wielded Housing', 'RO Membrane In Wielded Compact', 'UF Membrane In Wielded Housing', 'Inline Sediment Filter', 'Inline Carbon Filter', 'Post Carbon Filter', 'Inline UF Filter', 'Sediment Filter']; // more need to be added or given by the client
    // this.callTypeList = ['Warranty', 'Out of Warranty', 'Contract']
    this.serviceTypeList = ['customer Services']

    this.commonService._customerInfoDataSubject.asObservable().pipe(take(1)).subscribe((custData: any) => {


      this.fireStore.collection('editproduct').get().subscribe(productEditData => {
        let productData: any =  productEditData?.docs.map(item => item.data());
        productData["docId"] = productEditData?.docs.map(doc => doc.id)?.toString();
        this.productList = productData[0]?.spareItem?.map((item: any) => item?.name);
        this.callTypeList = productData[0]?.callTypeItem?.map((item: any) => item?.name);;
        console.log(productData)
      });
  


      // this.commonService.customerData = custData;
      setTimeout(() => {
        console.log(this.commonService.customerData, "customer data", custData);
      if(this.commonService.customerData){
          if(this.commonService?.customerData?.technicalDetails?.length){
            this.commonService?.customerData?.technicalDetails?.forEach((item: any, index: number) => {
              let visitSplitArray = this.commonService.customerData.visitDate.split('/');
              let date = visitSplitArray[2]+'-'+visitSplitArray[1]+'-'+(visitSplitArray[0]);
              this.commonService.customerData.technicalDetails[index].visitDate = new Date(date);
              (this.customerDetail.get('technicalDetails') as FormArray).push(this.formBuilder.group({
                technicianName : new FormControl(item?.technicianName, [Validators.required]),
                technicianRemarks: new FormControl(item?.technicianRemarks, [Validators.required]),
                billNo: new FormControl(item?.billNo, [Validators.required]),
                amount: new FormControl(item?.amount, [Validators.required]),
                visitDate: new FormControl(item?.visitDate),
              }))
            })

            if(this.commonService.customerData?.purchaseDate){
              let purcharseSplitArray = this.commonService.customerData.visitDate.split('/');
              let datePurchase = purcharseSplitArray[2]+'-'+purcharseSplitArray[1]+'-'+(purcharseSplitArray[0]);
              this.commonService.customerData.purchaseDate = new Date(datePurchase);
            }

            this.customerDetail.patchValue({
              serviceType: this.commonService.customerData?.serviceType,
              fullName: this.commonService.customerData?.fullName,
              contactNo: this.commonService.customerData?.contactNo,
              complaintNo: this.commonService.customerData?.complaintNo,
              address: this.commonService.customerData?.address,
              area: this.commonService.customerData?.area,
              productType: this.commonService.customerData?.productType,
              modelNo: this.commonService.customerData?.modelNo,
              serialNo: this.commonService.customerData?.serialNo,
              purchaseDate: this.commonService.customerData?.purchaseDate,
              callType: this.commonService.customerData?.callType
            });        
          } 
          this.addTechnicanGroup();     
        }else {
          this.addTechnicanGroup();
        }
      }, 1000);
    })

  }

  ngOnInit(): void {
    // if(this.commonService.customerData){
    //   if(this.commonService?.customerData?.technicalDetails?.length){
    //     this.commonService?.customerData?.technicalDetails?.forEach((item: any, index: number) => {
    //       let visitSplitArray = this.commonService.customerData.visitDate.split('/');
    //       let date = visitSplitArray[2]+'-'+visitSplitArray[1]+'-'+(visitSplitArray[0]);
    //       this.commonService.customerData.technicalDetails[index].visitDate = new Date(date);
    //     })
    //     this.customerDetail.patchValue(this.commonService.customerData);        
    //   } 
    //   this.addTechnicanGroup();     
    // }
  }

  ngOnChanges(){
    this.commonService.fetchCustomerData();
  }

  addTechnicanGroup(){
    (this.customerDetail.get('technicalDetails') as FormArray).push(this.createTechnicanGroup())
  }

  createTechnicanGroup():FormGroup{
    return this.formBuilder.group({      
      technicianName : new FormControl(null, [Validators.required]),
      technicianRemarks: new FormControl(null, [Validators.required]),
      billNo: new FormControl(null, [Validators.required]),
      amount: new FormControl(null, [Validators.required]),
      visitDate: new FormControl(null),
    })
  }

  saveCustomerDetails(formData: any){

    if(formData?.value?.technicalDetails?.length){
      formData?.value?.technicalDetails.forEach((itemFormData: any) => {
        var getVisitDate = itemFormData.visitDate;
        var getDate = getVisitDate.getDate() && getVisitDate.getDate() < 10 ? '0'+ getVisitDate.getDate(): getVisitDate.getDate();
        var getMonth = getVisitDate.getMonth() && (getVisitDate.getMonth()+1) < 10 ? ('0'+ (getVisitDate.getMonth()+1)): (getVisitDate.getMonth()+1);
        var getYear = getVisitDate.getFullYear();
        var setVisitDate = getDate+'/'+getMonth+'/'+getYear;
        itemFormData.visitDate =  setVisitDate;
      });
    }

    if(formData?.value?.purchaseDate){
      var getPurchaseDate = formData?.value?.purchaseDate;
      var getDate = getPurchaseDate.getDate() && getPurchaseDate.getDate() < 10 ? '0'+ getPurchaseDate.getDate(): getPurchaseDate.getDate();
      var getMonth = getPurchaseDate.getMonth() && (getPurchaseDate.getMonth()+1) < 10 ? ('0'+ (getPurchaseDate.getMonth()+1)): (getPurchaseDate.getMonth()+1);
      var getYear = getPurchaseDate.getFullYear();
      var setPurchaseDate = getDate+'/'+getMonth+'/'+getYear;
      formData.value.purchaseDate =  setPurchaseDate;
    }


    if(formData && formData.valid) {      
      console.log(this.fireStore, 'fire store');
      // if customer data is present then edit method is there and update
      if(this.commonService.customerData && this.commonService.customerData.id){
        this.fireStore.doc('customerData/' + this.commonService.customerData.id).update(formData.value).then(update => {
          console.log('sucess');
          this.commonService.customerData = null;
          this.customerDetail.reset();
          this.router.navigate(['customerinfo']);
        })
      }else {        
        this.fireStore.collection('customerData').add(formData.value).then(response => {
          this.customerDetail.reset();
          this.customerDetail.markAsUntouched();
        }, error => {
          alert('something went wrong contact admin');
        })
      }
      
    }else {
      alert('something went wrong');
    }
  }


  get technicalDetails(): FormArray {
    return this.customerDetail.get('technicalDetails') as FormArray;
  }

}
