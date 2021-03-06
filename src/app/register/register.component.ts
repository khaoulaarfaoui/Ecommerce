import {Component, OnInit} from '@angular/core';
import {AuthService} from '../shared/auth.service';
import {Router} from '@angular/router';


@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
    /* REGISTER IF NOT LOGGED IN COMPONENT
    USING SPRING BOOT BACK END AND JWT AUTHENTICATION BACKEND
    AND TEMPLATE DRIVEN FORM
     */
export class RegisterComponent implements OnInit {
    form: any = {};
    isSuccessful = false;
    isSignUpFailed = false;
    errorMessage = '';

    constructor(private router: Router,private authService: AuthService) {
    }

    ngOnInit() {
    }

    onSubmit() {
        this.authService.register(this.form).subscribe(
            data => {
                console.log(data);
                this.isSuccessful = true;
                this.isSignUpFailed = false;
                this.router.navigate(['/login']);
            },
            err => {
                this.errorMessage = err.error.message;
                this.isSignUpFailed = true;
            }
        );
    }
}
