import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthlogintrialComponent } from './authlogintrial/authlogintrial.component';
import { BillingComponent } from './billing/billing.component';
import { AuthGuard } from './guard/auth.guard';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { ProductsDetailComponent } from './products-detail/products-detail.component';
import { SalesdetailComponent } from './salesdetail/salesdetail.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {path:'', redirectTo:'login',pathMatch:'full'},
  {path:'', component:HeaderComponent, canActivate:[AuthGuard]},
  {path:'login', component:LoginComponent},
  {path:'authlogintrial',component:AuthlogintrialComponent},
  {path:'nav', component:HeaderComponent,canActivate:[AuthGuard]},
  {path:'signup', component:SignupComponent,canActivate:[AuthGuard]},
  // {path:'billing', component:BillingComponent,canActivate:[AuthGuard]},
  {path:'billing', component:BillingComponent},

  {path:'product',component:ProductsDetailComponent,canActivate:[AuthGuard]},
  {path:'sales',component:SalesdetailComponent,canActivate:[AuthGuard]}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
