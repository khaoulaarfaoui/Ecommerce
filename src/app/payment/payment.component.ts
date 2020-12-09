import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NavbarService} from '../shared/navbar.service';
import {CartService} from '../shared/cart.service';

@Component({
    selector: 'app-payment',
    templateUrl: './payment.component.html',
    styleUrls: ['./payment.component.css']
})
/*
    PAYMENT COMPONENT USING PAYU API
 */
export class PaymentComponent implements OnInit {


    public payuform: any = {};
    disablePaymentButton: boolean = true;
    cartproducts = [];
    titles: string='';
    price: number=0;
    constructor(private cartservice: CartService,public nav: NavbarService, private http: HttpClient) {

    }
    ngOnInit() {
        this.nav.show();
        this.cartproducts = this.cartservice.getProducts();
        for(let i=0; i<this.cartproducts.length; i++){
            this.titles+=this.cartproducts[i].title+ "--";
            this.price+=this.cartproducts[i].price;

        }
    }

    confirmPayment() {
        const paymentPayload = {
            email: this.payuform.email,
            name: this.payuform.firstname,
            phone: this.payuform.phone,
            productInfo: this.titles,
            amount: this.price
        }
        return this.http.post<any>('http://localhost:8087/payment/payment-details', paymentPayload).subscribe(
            data => {
                console.log(data);
                this.payuform.txnid = data.txnId;
                this.payuform.surl = data.sUrl;
                this.payuform.furl = data.fUrl;
                this.payuform.key = data.key;
                this.payuform.hash = data.hash;
                this.payuform.txnid = data.txnId;
                this.disablePaymentButton = false;
            }, error1 => {
                console.log(error1);
            })
    }



}
