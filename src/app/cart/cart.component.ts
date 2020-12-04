import {Component, Input, OnInit} from '@angular/core';
import {CartService} from '../shared/cart.service';
import {TokenStorageService} from '../services/token-storge.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartproducts=[];
  isLoggedIn = false;

  count=1;

  constructor(private tokenStorageService: TokenStorageService, private cartService : CartService) { }

  ngOnInit(): void {
    this.cartproducts = this.cartService.getProducts();
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    console.log(this.cartproducts);
  }


  increment() {
    this.count=this.count+1;
  }

  Deletecart(p: any) {
    console.log(p.title);
    this.cartService.delete(p);
  }
}
