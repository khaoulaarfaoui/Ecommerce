import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  @Input() idProduct: string;
  selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: string;
  imageName: any;
  fileInfos: Observable<any>;
  image: any;
  id: void;
  constructor(private http: HttpClient, private sanitizer: DomSanitizer) { }

     ngOnInit() :void {
        // (async () => {
             //this.id = await this.getimage();
             this.http.get('http://localhost:8087/products/1/fileDB')
                 .subscribe(res => {
                     this.image = res;
                     this.id=this.image.id;
                     console.log("inside the URL function"+this.id)
                     this.getimage();
                 });
             console.log("outside the URL function"+this.id)
        // })();
         //this.getimage()
     }


getUrl(){
    this.http.get('http://localhost:8087/products/1/fileDB')
        .subscribe(res => {
            this.image = res;
            this.id=this.image.id;
            console.log("inside the URL function"+this.id)
        });
    console.log("outside the URL function"+this.id)
}
getimage() {
    console.log("outside the get Image function"+this.id)

            //Make a call to Spring Boot to get the Image Bytes.
  this.http.get('http://localhost:8087/image/getimagebyid/'+this.id)
      .subscribe(
          res => {
            this.retrieveResonse = res;
            this.base64Data = this.retrieveResonse.picByte;
            this.retrievedImage= this.sanitizer.bypassSecurityTrustUrl(`data:image/png;base64,${this.base64Data}`);
            //this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
          }
      );
}
}
