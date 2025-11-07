import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// AngularFire (compat-only to avoid 'auth not registered' issues)
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './modules/login/login.component';

import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { CommonService } from './services/common.service';
import { CustomerInfoComponent } from './modules/customer-info/customer-info.component';
import { CustomerDetailComponent } from './modules/customer-detail/customer-detail.component';
import { EditProductInfoComponent } from './modules/edit-product-info/edit-product-info.component';
import { NotificationsComponent } from './modules/notifications/notifications.component';

// const firebaseConfig = {
//   apiKey: "AIzaSyAdoQAurH1lK2IMOqVdBZvWNin0uRmSLsY",
//   authDomain: "kent-3b295.firebaseapp.com",
//   projectId: "kent-3b295",
//   storageBucket: "kent-3b295.firebasestorage.app",
//   messagingSenderId: "1053046070991",
//   appId: "1:1053046070991:web:40ff295f28bd90072ce1ba",
//   measurementId: "G-CZPZH8HW98"
// };


const firebaseConfig = {
  apiKey: "AIzaSyDh--ZV33Pjg1_PjvQbi6LNGzJB6uql5h4",
  authDomain: "customer-management-276c3.firebaseapp.com",
  projectId: "customer-management-276c3",
  storageBucket: "customer-management-276c3.firebasestorage.app",
  messagingSenderId: "445035486831",
  appId: "1:445035486831:web:1188525e09a19c0fcc779a",
  measurementId: "G-ST6LLSK6HC"
};

@NgModule({
  declarations: [AppComponent, LoginComponent, DashboardComponent, CustomerInfoComponent, CustomerDetailComponent, EditProductInfoComponent, NotificationsComponent],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    BrowserAnimationsModule, 
    ReactiveFormsModule,
    SharedModule 
  ],
  providers: [CommonService],
  bootstrap: [AppComponent]
})
export class AppModule {}