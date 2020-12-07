import {Component, Input, OnInit} from '@angular/core';
import {TokenStorageService} from '../services/token-storge.service';
import {UserDetailsService} from '../shared/user-details.service';
import {Userdetails} from '../Models/userdetails';
import {  Router } from '@angular/router';




@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  DetailUser: Userdetails;
  id=3;
  @Input() userDetails = { FirstName: '',LastName: '', Address: '',City: '',Country: '', PostalCode:0, AboutMe: '' }
  update=false;
  deletevar=false;
  constructor( private router: Router, private userdetailsservice: UserDetailsService, private token: TokenStorageService) { }

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

    if (window.confirm('Are you sure, you want to delete?')){
      this.userdetailsservice.delete(this.id).subscribe(data => {
        this.router.navigate(['/dashboard'])
      })
    }
  }

  updateprofile() {
    this.userdetailsservice.update(this.currentUser.id, this.userDetails)
        .subscribe((data: Userdetails)=>{
          this.DetailUser = data;
        })
  }
}
