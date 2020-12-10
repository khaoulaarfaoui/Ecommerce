/// <reference types="@types/googlemaps" />
import {MapsAPILoader} from '@agm/core';

declare var google: any;
import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {ViewChild} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {GeoLocationServiceService} from '../shared/geo-location-service.service';
import {NavbarService} from '../shared/navbar.service';
import {TokenStorageService} from '../shared/token-storge.service';

@Component({
    selector: 'app-newsletter',
    templateUrl: './newsletter.component.html',
    styleUrls: ['./newsletter.component.css']
})

/*
    THIS IS A CONTACT US COMPONENT WHERE WE WILL USE MODEL DRIVEN FORM  AND BACKEND AS A SERVICE (mail)
    GOOGLE MAPS API WITH ACTIVATED KEY

 */
export class NewsletterComponent implements OnInit {

    title = 'My first AGM project';
    lat: number = 36.806496;
    lng: number = 10.181532;
    focus;
    focus1;
    focus2;
    focus3;
    focus4;
    focus5;
    focus6;
    etb = 'Etablissement';
    et = this.etb.bold();
    fct = 'Fonction: ';
    ft = this.fct.bold();
    adr = 'Adresse';
    ad = this.adr.bold();
    suj = 'Sujet: ';
    sj = this.suj.bold();
    sent = false;
    coordinates;
    ContactUsForm: FormGroup;
    username: string;

    constructor(public nav: NavbarService, private tokenStorageService: TokenStorageService, private mapsAPILoader: MapsAPILoader, private http: HttpClient, private geoService: GeoLocationServiceService) {
    }

    get name() {
        return this.ContactUsForm.get('name');
    }

    get email() {
        return this.ContactUsForm.get('email');
    }

    get addresse() {
        return this.ContactUsForm.get('addresse');
    }

    get messages() {
        return this.ContactUsForm.get('messages');
    }

    ngOnInit() {
        this.nav.show();
        this.getCurrentLocation();
        const user = this.tokenStorageService.getUser();
        this.username = user.username;
        this.ContactUsForm = new FormGroup({
            name: new FormControl('', Validators.required),
            addresse: new FormControl('', Validators.required),
            email: new FormControl('', [Validators.required,
                Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$')]),
            messages: new FormControl('', Validators.required),

        });
    }

    onSubmit() {
        console.log('aaaaaaaaaa' + this.ContactUsForm);
        if (this.ContactUsForm.valid) {
            const email = this.ContactUsForm.value;
            console.log(email);
            const headers = new HttpHeaders({'Content-Type': 'application/json'});
            this.http.post('https://formspree.io/f/mwkwqjqy',
                {
                    Nom: email.name, Email: email.email, Addresse: email.addresse, Message: email.messages
                },
                {'headers': headers}).subscribe(
                response => {
                    console.log(response);
                }
            );
            this.sent = true;
        }
    }

    reset() {
        this.ContactUsForm.reset();
    }

    getCurrentLocation() {
        this.mapsAPILoader.load().then(() => {
            let geocoder = new google.maps.Geocoder;
            let latlng = {lat: this.lat, lng: this.lng};
            console.log('aaaa' + latlng.lat);
            let that = this;
            geocoder.geocode({'location': latlng}, function (results) {
                if (results[0]) {
                    that.coordinates = results[0].formatted_address;
                    console.log(results[0].formatted_address);
                } else {
                    console.log('No results found');
                }
            });
        });
    }
}



