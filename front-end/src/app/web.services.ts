import { Http } from '@angular/http';
import {Injectable, Inject} from '@angular/core';
//import 'rxjs/add/operator/toPromise';
import {Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import { MatSnackBar} from '@angular/material';
import { hasParentInjector } from '@angular/core/src/render3/util';
import {AuthService} from './auth.service';


@Injectable()

export class WebService
{

    BASE_URL = 'http://localhost:63145/api';

   private messageStore = [];
    messageSubject=new Subject();
    messages=this.messageSubject.asObservable();

    constructor(private http: Http,private sb:MatSnackBar,private auth:AuthService){
        this.getMessages(name);
    }

     getMessages(user)
    {
        
            user=(user) ? '/' + user: '';
            this.http.get(this.BASE_URL + '/messages'+ user).subscribe(response=>{
                this.messageStore = response.json();
                this.messageSubject.next(this.messageStore);
            },
            error=>{
                this.handleError("unable to get message");
            }
            
            );
  
    }

   async postMessage(message)
    {
        try {
        var response = await this.http.post(this.BASE_URL +  '/messages',message).toPromise();
        this.messageStore.push(response.json());
        this.messageSubject.next(this.messageStore);
        
        } catch (error) {
            this.handleError("Unable to post messages");
        }
       
    }
    getuser(){
        return this.http.get(this.BASE_URL+"/users/me" ,this.auth.tokenHeader).pipe(map(res=>res.json()));
    }
    saveuser(userData){
        return this.http.post(this.BASE_URL+"/users/me",userData ,this.auth.tokenHeader).pipe(map(res=>res.json()));
    }
    private handleError(error)
    {
        console.error(error);
            this.sb.open(error,'close',{duration:2000});
    }
}