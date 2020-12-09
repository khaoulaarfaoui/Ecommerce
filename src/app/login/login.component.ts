import {Component, OnInit} from '@angular/core';
import {AuthService} from '../shared/auth.service';
import {TokenStorageService} from '../shared/token-storge.service';
import {Router} from '@angular/router';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
/*
    LOGIN COMPONENT USING SPRING BOOT AS A BACKEND AND JWT FOR AUTHENTICATION
    USING TEMPLATE DRIVEN FORM
 */
export class LoginComponent implements OnInit {
    form: any = {};
    isLoggedIn = false;
    isLoginFailed = false;
    errorMessage = '';
    roles: string[] = [];

    constructor(private router: Router, private authService: AuthService, private tokenStorage: TokenStorageService) {
    }

    ngOnInit() {
        if (this.tokenStorage.getToken()) {
            this.isLoggedIn = true;
            this.roles = this.tokenStorage.getUser().roles;
        }
    }

    onSubmit() {
        this.authService.login(this.form).subscribe(
            data => {
                this.tokenStorage.saveToken(data.accessToken);
                this.tokenStorage.saveUser(data);

                this.isLoginFailed = false;
                this.isLoggedIn = true;
                this.roles = this.tokenStorage.getUser().roles;
                this.reloadPage();
            },
            err => {
                this.errorMessage = err.error.message;
                this.isLoginFailed = true;
            }
        );
    }

    reloadPage() {
        window.location.reload();

        //  this.router.navigate(['/dashboard']);
    }
}
