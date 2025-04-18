import { Component } from '@angular/core';
import { PopBtnComponent } from "../pop-btn/pop-btn.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-no-user',
  imports: [PopBtnComponent, CommonModule],
  templateUrl: './no-user.component.html',
  styleUrl: './no-user.component.css'
})
export class NoUserComponent {
  update: string = "Continue"
  notFound = true;
}
