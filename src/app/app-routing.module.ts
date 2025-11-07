import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerDetailComponent } from './modules/customer-detail/customer-detail.component';
import { CustomerInfoComponent } from './modules/customer-info/customer-info.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { EditProductInfoComponent } from './modules/edit-product-info/edit-product-info.component';
import { LoginComponent } from './modules/login/login.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'customerinfo', component: CustomerInfoComponent },
  { path: 'customerdetail', component: CustomerDetailComponent },
  { path: 'editproductInfo', component: EditProductInfoComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}