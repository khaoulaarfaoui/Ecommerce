import { Component, OnInit } from '@angular/core';
import {UploadFileService} from '../services/upload-file.service';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl,  SafeHtml } from '@angular/platform-browser';
@Component({
  selector: 'app-filetest',
  templateUrl: './filetest.component.html',
  styleUrls: ['./filetest.component.css']
})
export class FiletestComponent implements OnInit {
 /* fileInfos: Observable<any>;
  selectedFile: File;
  public retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: string;
  imageName: string= 'avatar';
  srcData : SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer, private http: HttpClient, private uploadService: UploadFileService) { }
  ngOnInit(): void {

    this.fileInfos = this.uploadService.getFiles();
    }
  getImage(imageName: string) {
    console.log('testttttttt');
    this.http.get(`http://localhost:8087/get/`+this.imageName)
        .subscribe(
            res => {
              console.log('testttttttt');
              this.retrieveResonse = res;
              console.log(res);
              this.base64Data = this.retrieveResonse.data;
              this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
            }
        );

        }
        */
    constructor(private sanitizer: DomSanitizer,private httpClient: HttpClient , private uploadService: UploadFileService) { }
    selectedFile: File;
    retrievedImage: any;
    base64Data: any;
    retrieveResonse: any;
    message: string;
    imageName: any;
    fileInfos: Observable<any>;
    ngOnInit(): void {
        this.fileInfos = this.uploadService.getFiles();

    }
    //Gets called when the user selects an image
    public onFileChanged(event) {
        //Select File
        this.selectedFile = event.target.files[0];
    }
    //Gets called when the user clicks on submit to upload the image
    onUpload() {
        console.log(this.selectedFile);

        //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
        const uploadImageData = new FormData();
        uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);

        //Make a call to the Spring Boot Application to save the image
        this.httpClient.post('http://localhost:8087/image/upload', uploadImageData, { observe: 'response' })
            .subscribe((response) => {
                    if (response.status === 200) {
                        this.message = 'Image uploaded successfully';
                    } else {
                        this.message = 'Image not uploaded successfully';
                    }
                }
            );
    }
    //Gets called when the user clicks on retieve image button to get the image from back end
    getImage() {
        //Make a call to Sprinf Boot to get the Image Bytes.
        this.httpClient.get('http://localhost:8087/image/getimagebyid/' + 1)
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
