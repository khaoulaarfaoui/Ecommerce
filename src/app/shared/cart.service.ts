import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  products = [];
  add(p){
    this.products.push(p);
  }
  getProducts(){
    return this.products
  }
  delete(p){
    this.products.splice(this.products.indexOf(p),1);
  }
  clearCart() {
    this.products = [];
    return this.products;
  }
}
