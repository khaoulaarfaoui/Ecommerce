import { Component, OnInit } from '@angular/core';
import {CartService} from '../shared/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartproducts=[];
  constructor(private cartService : CartService) { }

  ngOnInit(): void {
    this.cartproducts = this.cartService.getProducts();
    console.log(this.cartproducts);
  }

}
