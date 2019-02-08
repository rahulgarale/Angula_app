import { Component } from '@angular/core'
import{AuthService} from './auth.service';


@Component ({
    selector: 'login',
    template:`
    <mat-card-content>
           <mat-form-field>
                <input style="width:350px" matInput type="email" [(ngModel)]="loginData.email" placeholder = "Email: "  />
             </mat-form-field>
             <mat-form-field>
                <input style="width:350px" matInput type="password" [(ngModel)]="loginData.pass" placeholder = "Password: " />
            </mat-form-field>
             <button mat-raised-button color="primary" (click)="login()">Login</button>
    </mat-card-content>    
           `
})

export class LoginComponent {
    constructor(private auth:AuthService){
    }
loginData={
    email:'',
    pass:''
}
login(){
    this.auth.login(this.loginData);
}
}