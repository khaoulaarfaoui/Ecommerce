import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {
 // listDetailUser: DetailUser[];
  url='http://localhost:3000/Server/usersDetails';

  constructor(private http: HttpClient) { }
  getUserDetails(){
    return this.http.get(this.url);
  }
  PostUserDetails(){

  }
}
