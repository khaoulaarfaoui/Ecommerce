import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {
  private baseUrl = 'http://localhost:8087';




  constructor(private http: HttpClient) { }
  getFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/image/files`);
  }


}
