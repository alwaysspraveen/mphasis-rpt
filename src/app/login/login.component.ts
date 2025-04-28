import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-loginpage',
  imports: [RouterModule,CommonModule],
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
