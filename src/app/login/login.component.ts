import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';


@Component({
  selector: 'app-loginpage',
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginpageComponent {
  SignUp:boolean = false ;
  SignIn:boolean = true ;

  signin(){
   this.SignIn = false
   this.SignUp= true
  }

  signup(){
    this.SignIn = true
    this.SignUp= false
  }
}
