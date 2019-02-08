import { Component} from '@angular/core';
import { MessagesComponent } from './message.component'
import {NewMessageComponent} from './new-message.component';
import {NavComponent} from './nav.component';
import {LoginComponent} from './login.component';
@Component({
  selector: 'app-root',
  template: `
            <nav></nav>
            <router-outlet></router-outlet>
             `,
})
export class AppComponent {}
