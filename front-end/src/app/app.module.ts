import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {
          MatButtonModule, 
          MatCheckboxModule, 
          MatCardModule,
          MatInputModule,
          MatSnackBarModule,
          MatToolbarModule,
        } from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MessagesComponent } from './message.component';
import { Http, HttpModule } from '@angular/http';
import {WebService} from './web.services';
import {NewMessageComponent} from './new-message.component';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { NavComponent } from './nav.component';
import { HomeComponent } from './home.component';
import {RouterModule} from '@angular/router';
import{RegisterComponent} from './register.component';
import { AuthService } from './auth.service';
import {LoginComponent} from './login.component';
import{userComponent} from './user.component';
var routers=[{
  path:'',
  component: HomeComponent
},
{
  path:'messages',
  component: MessagesComponent
},
{
  path:'messages/:name',
  component: MessagesComponent
},
{
  path:'register',
  component: RegisterComponent
},
{
  path:'login',
  component: LoginComponent
},
{
  path:'user',
  component: userComponent
}
]

@NgModule({
  declarations: [
    AppComponent, MessagesComponent, NewMessageComponent,NavComponent,HomeComponent,RegisterComponent,LoginComponent,userComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,RouterModule.forRoot(routers),
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatInputModule,
    HttpModule,
    MatInputModule,
    FormsModule,ReactiveFormsModule
  ],
  providers: [WebService,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {
  
 }
