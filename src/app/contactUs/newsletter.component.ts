/// <reference types="@types/googlemaps" />
import {MapsAPILoader} from '@agm/core';

declare var google: any;
import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {NgForm} from '@angular/forms';
import { ViewChild } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {GeoLocationServiceService} from '../shared/geo-location-service.service';
import {NavbarService} from '../shared/navbar.service';

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.css']
})

/*
    THIS IS A CONTACT US COMPONENT WHERE WE WILL USE TEMPLATE POWERED FORM AND BACKEND AS A SERVICE
 */
export class NewsletterComponent implements OnInit {

  title = 'My first AGM project';
  lat :number= 36.806496;
  lng : number= 10.181532;
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


  constructor( public nav: NavbarService, private mapsAPILoader: MapsAPILoader,private http: HttpClient, private geoService: GeoLocationServiceService) {
  }
  ngOnInit() {
    this.nav.show();
   this.getCurrentLocation();
  }






    /*
      OnSubmit(contactForm: NgForm) {
        if (contactForm.valid) {
          const email = contactForm.value;
          const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
          this.http.post('https://formspree.io/f/mleolvql',
              { name: email.name, replyto: email.email, message: email.msg },
              { 'headers': headers }).subscribe(
              response => {
                console.log(response);
              }
          );
        }
      }
    */

  onSubmit(contactForm: NgForm) {
    if (contactForm.valid) {
      const email = contactForm.value;
      const headers = new HttpHeaders({'Content-Type': 'application/json'});
      this.http.post('https://formspree.io/f/mwkwqjqy',
          {
            Nom: email.name, Email: email.email, Etablissement: email.etablissement,
            Fonction: email.fonction, Addresse: email.addresse, Message: email.messages
          },
          {'headers': headers}).subscribe(
          response => {
            console.log(response);
          }
      );
      this.sent = true;
    }
  }

  reset(contactForm: NgForm) {
    contactForm.reset();
  }

  getCurrentLocation() {
    this.mapsAPILoader.load().then(() => {
      let geocoder = new google.maps.Geocoder;
      let latlng = {lat: this.lat, lng: this.lng};
      console.log("aaaa"+latlng.lat);
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



