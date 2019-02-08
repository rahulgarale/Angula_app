import { Component } from '@angular/core'
import {WebService} from './web.services'

@Component ({
    selector: 'user',
    template: `<mat-card class="card">
                    <mat-card-content>
                        <mat-form-field>
                            <input [(ngModel)] = "model.firstName" matInput placeholder = "first Name: ">
                        </mat-form-field>
                        <mat-form-field>
                            <input [(ngModel)] = "model.lastName" matInput placeholder = "Last Name: "/> 
                        </mat-form-field>
                        <mat-card-actions>
                            <button (click)= "post()" mat-raised-button color = "primary">
                                Save Changes </button>
                        </mat-card-actions>
                    </mat-card-content>
                </mat-card>`
})

export class userComponent {

    
    constructor(private webService: WebService){}

    model = {
        firstName : "",
        lastName : ""
    }

    ngOnInit(){
        this.webService.getuser().subscribe(res=>{
            this.model.firstName=res.firstName;
            this.model.lastName=res.lastName;
        })    
    }
    post()
    {
        this.webService.saveuser(this.model).subscribe();
       
    };
}