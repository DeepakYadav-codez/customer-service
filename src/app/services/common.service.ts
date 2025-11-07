import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

 _customerInfoDataSubject = new BehaviorSubject<string>('Initial message');

  private _customerData: any;
  constructor() { }

  get customerData(){
    return this._customerData;
  }
  set customerData(data){
    this._customerData = data;
  }

  fetchCustomerData(){
    this._customerInfoDataSubject.next(this._customerData);
  }
}
