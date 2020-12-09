import {Component, Input, OnInit} from '@angular/core';
import {CartService} from '../shared/cart.service';
import {TokenStorageService} from '../shared/token-storge.service';
import {NavbarService} from '../shared/navbar.service';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css']
})
/*
    CART WHERE USER CAN ADD ALL THE PRODUCT TO BUY
 */
export class CartComponent implements OnInit {
    cartproducts = [];
    isLoggedIn = false;



    constructor(public nav: NavbarService, private tokenStorageService: TokenStorageService, private cartService: CartService) {
    }

    ngOnInit(): void {
        this.nav.show();
        this.cartproducts = this.cartService.getProducts();
        this.isLoggedIn = !!this.tokenStorageService.getToken();
        console.log(this.cartproducts);

    }
    total() {


    }
    Deletecart(p: any) {
        console.log(p.title);
        this.cartService.delete(p);
    }
    increase(p) {

    console.log();
    }

    decrease(p) {

    }
}
