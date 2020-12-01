import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceProductService {
public  host:string="http://localhost:8087/"
  constructor(private httpcliet: HttpClient) {}
    public getAllProduct(){
        return this.httpcliet.get(this.host+"products");

    }
     public getProduct(page:number, size: number){
      return this.httpcliet.get(this.host+"products?page="+page+"&size="+size);

  }
    public getProductByKey(title:string,page:number, size: number){
        return this.httpcliet.get(this.host+"products/search/ByTitlePage?title="+title+"&page="+page+"&size="+size);

    }
}
