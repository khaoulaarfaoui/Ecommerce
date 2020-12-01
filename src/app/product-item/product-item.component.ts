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
  @Input() idProduct: number;
  selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: string;
  imageName: any;
  fileInfos: Observable<any>;
  constructor(private http: HttpClient, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  this.getimage()
  }
getimage() {
  //Make a call to Sprinf Boot to get the Image Bytes.
  this.http.get('http://localhost:8087/image/getimagebyid/'+this.idProduct)
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
