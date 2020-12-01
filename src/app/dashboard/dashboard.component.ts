import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

import {ServiceProductService} from '../shared/service-product.service';
import {DisplayService} from '../shared/display.service';
import {CartService} from '../shared/cart.service';
import {ToastrService} from 'ngx-toastr';
import {NotificationsService} from '../shared/notifications.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
public products: any;
public size:number=6;
public currentPage:number=0;
public totalPages: number;
public pages:Array<number>;
page1:1;
public key:string='test';
currentKeyword:string="";
num:number=0;
//added
    selectedFile: File;
    retrievedImage: any;
    base64Data: any;
    retrieveResonse: any;
    message: string;
    imageName: any;
    fileInfos: Observable<any>;


    constructor(private sanitizer: DomSanitizer,private http: HttpClient, private notifyservice: NotificationsService ,private cartservice: CartService, private productservice: ServiceProductService,private displayservice: DisplayService) { }
  ngOnInit(){
      this.OnGetProduct();


  }
    getImage(i: any) {
        //Make a call to Sprinf Boot to get the Image Bytes.
        this.http.get('http://localhost:8087/image/getimagebyid/'+i)
            .subscribe(
                res => {
                    this.retrieveResonse = res;
                    this.base64Data = this.retrieveResonse.picByte;
                    this.retrievedImage= this.sanitizer.bypassSecurityTrustUrl(`data:image/png;base64,${this.base64Data}`);
                    //this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
                }
            );
    }
  OnGetProduct() {
      this.productservice.getProduct(this.currentPage, this.size).subscribe(data => {this.totalPages=data['page'].totalPages;
      this.pages=new Array<number>(this.totalPages); this.products = data;},
              err => {console.log(err); }); }
              OnPageProduct(i) {
            this.currentPage=i;
            this.OnchercherProd();
                }
    Onchercher(form: any) {
        this.currentPage=1;
        this.currentKeyword=form.keyword;
        this.OnchercherProd();}
      OnchercherProd() {
          this.productservice.getProductByKey(this.currentKeyword,this.currentPage, this.size).subscribe(
              data => {this.totalPages=data[ 'page'].totalPages;
                  this.pages=new Array<number>(this.totalPages); this.products = data;},
              err => {console.log(err); });

      }

    addtocart(p: any) {
        this.cartservice.add(p);
        this.displayservice.nextCount();
        this.notifyservice.showSuccess('check your cart!', 'Product Added to Cart!');
        console.log(this.cartservice.products);
    }

    like(p: any) {
        
    }

    onItemLabelLoaded($event: any) {
        
    }
}
