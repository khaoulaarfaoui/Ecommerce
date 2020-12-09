import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
//this service will help us to remove the navbar from the login and register components
export class NavbarService {
  visible: boolean;
  constructor() {
    this.visible = false;
  }

  hide() {
    this.visible = false;
  }

  show() {
    this.visible = true;
  }

  toggle() {
    this.visible = !this.visible;
  }
}
