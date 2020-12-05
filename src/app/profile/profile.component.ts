import {Component, Input, OnInit} from '@angular/core';
import {TokenStorageService} from '../services/token-storge.service';
import {UserDetailsService} from '../shared/user-details.service';
import {Userdetails} from '../Models/userdetails';
import {MatDialogRef} from '@angular/material/dialog';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  DetailUser: Userdetails;
  @Input() userDetails = { FirstName: '',LastName: '', Address: '',City: '',Country: '', PostalCode:0, AboutMe: '' }
  update=false;
  deletevar=false;
  constructor(private userdetailsservice: UserDetailsService, private token: TokenStorageService) { }

  ngOnInit() {
    this.currentUser = this.token.getUser();
    this.userdetailsservice.getById(this.currentUser.id)
        .subscribe((data: Userdetails)=>{
          this.DetailUser = data;
    })
  }


  btnclick() {
    this.update=true;
  }

  delete() {
    this.deletevar=true;
  }

  updateprofile() {
    this.userdetailsservice.update(this.currentUser.id, this.userDetails)
        .subscribe((data: Userdetails)=>{
          this.DetailUser = data;
        })
  }
}
