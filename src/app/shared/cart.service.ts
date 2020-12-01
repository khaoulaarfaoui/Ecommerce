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
}
