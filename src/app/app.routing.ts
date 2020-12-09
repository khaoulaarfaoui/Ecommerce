import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import {CartComponent} from './cart/cart.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {ProfileComponent} from './profile/profile.component';
import {FiletestComponent} from './filetest/filetest.component';
import {PaymentComponent} from './payment/payment.component';
import {NewsletterComponent} from './contactUs/newsletter.component';


const routes: Routes =[
  //spring boot backend part
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
    {
    path: 'home',
    component: DashboardComponent,
  },
    //this will take you to the cart
  {
    path: 'cart',
    component: CartComponent
  },
// this will take you to contact us page
  {
    path: 'contactUs',
    component: NewsletterComponent
  },
    //this will take you from the cart to the payment
    //the api used here is PayU
  { path: 'payment', component: PaymentComponent },
    //read image test
  { path: 'file', component: FiletestComponent },

    //profile user (json part)
  { path: 'profile', component: ProfileComponent },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
       useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
