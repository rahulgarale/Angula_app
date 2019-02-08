import { Component} from '@angular/core';
import { MessagesComponent } from './message.component'
import {NewMessageComponent} from './new-message.component';
import {FormBuilder,Validator, Validators, FormsModule} from '@angular/forms';
import {AuthService} from './auth.service';
@Component({

  selector: 'register',
  templateUrl:'./register.component.html',
  styles:[`
    .error{
        bakground-color: #fff0f0
    }
  `]
})
export class RegisterComponent {
    form;
    constructor(private fb:FormBuilder,private auth:AuthService){
        this.form=fb.group({
            firstName:['',Validators.required],
            lastName:['',Validators.required],
            email:['',[Validators.required,emailValid()]],
            pass:['',Validators.required],
            cpass:['',Validators.required]
        },{validator:matchingField('pass','cpass')}
        );
    }
    onSubmit(){
        //console.log(this.form.valid);
        console.log(this.form.value);
        this.auth.register(this.form.value);
    }
    isValid(control){
        return this.form.controls[control].invalid && this.form.controls[control].touched;
    }
}
function matchingField(field1,field2){
    return form=>{
        if(form.controls[field1].value !== form.controls[field2].value)
            return {mismatchedFields:true};
    }
}
function emailValid(){
    return control=>{
        var regx= /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regx.test(control.value)? null:{invalidEmail:true};
    }
}
