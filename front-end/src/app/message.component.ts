import { Component } from '@angular/core'
import {WebService} from './web.services'
import{ActivatedRoute} from '@angular/router';

@Component ({
    selector: 'messages',
    template:`
            <div *ngFor="let msg of webService.messages | async">
                <mat-card class="card">
                    <mat-card-title style="cursor:pointer" [routerLink]="['/messages',msg.owner]">
                        {{msg.owner}}
                    </mat-card-title>
                    
                    <mat-card-content>
                        {{msg.text}}
                    </mat-card-content>
                </mat-card>
            </div><br/>
            <button mat-button>Test</button>`
})

export class MessagesComponent {
    constructor(private webService: WebService,private route:ActivatedRoute){}
    ngOnInit(){
        var name=this.route.snapshot.params.name;
        this.webService.getMessages(name);
        this.webService.getuser().subscribe();

    }
}