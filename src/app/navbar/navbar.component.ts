import {Component, OnInit, ElementRef, Output} from '@angular/core';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { Router } from '@angular/router';
import {ServiceProductService} from '../shared/service-product.service';
import {DisplayService} from '../shared/display.service';
import * as EventEmitter from 'events';
import {CartService} from '../shared/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    @Output() public found = new EventEmitter<any>();
    private listTitles: any[];
    location: Location;
      mobile_menu_visible: any = 0;
    private toggleButton: any;
    private sidebarVisible: boolean;
    public products: any;
    public size:number=6;
    public currentPage:number=0;
    public totalPages: number;
    public pages:Array<number>;
    count: number;
    cartproducts=[];
    constructor(private cartService : CartService,private productservice: ServiceProductService, private displayservice: DisplayService) {

    }

    ngOnInit() {
        this.productservice.getProduct(this.currentPage, this.size).subscribe(
            data => {
                this.totalPages = data['page'].totalPages;
                this.pages = new Array<number>(this.totalPages);
                this.products = data;
            },
            err => {
                console.log(err);
            });
        this.displayservice.count.subscribe(c => {
            this.count = c;
        });
        this.cartproducts = this.cartService.getProducts();
    }

    Onchercher(form: any) {

        this.productservice.getProductByKey(form.keyword,this.currentPage, this.size).subscribe(
            data => {this.totalPages=data[ 'page'].totalPages;
                this.pages=new Array<number>(this.totalPages); this.products = data;},
            err => {console.log(err); });

    }

    sidebarToggle() {

    }
}
