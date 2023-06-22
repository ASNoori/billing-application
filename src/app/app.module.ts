import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { BillingComponent } from './billing/billing.component';
import { BillDetailComponent } from './bill-detail/bill-detail.component';
import { ProductDialogComponent } from './product-dialog/product-dialog.component';
import { ProductsDetailComponent } from './products-detail/products-detail.component';
import { ProductDialogEditComponent } from './product-dialog-edit/product-dialog-edit.component';
import { BilldetailComponent } from './billdetail/billdetail.component';
import { SalesdetailComponent } from './salesdetail/salesdetail.component';
import { ToastrModule } from 'ngx-toastr';
import { AuthlogintrialComponent } from './authlogintrial/authlogintrial.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    BillingComponent,
    BillDetailComponent,
    ProductDialogComponent,
    ProductsDetailComponent,
    ProductDialogEditComponent,
    BilldetailComponent,
    SalesdetailComponent,
    AuthlogintrialComponent,
   
    
  ],
  entryComponents:[ProductDialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ToastrModule.forRoot({
      preventDuplicates:true,
      timeOut:10000
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
