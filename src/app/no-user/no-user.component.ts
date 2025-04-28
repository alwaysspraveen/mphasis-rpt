import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PopBtnComponent } from "../pop-btn/pop-btn.component";
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-no-user',
  imports: [PopBtnComponent, CommonModule],
  templateUrl: './no-user.component.html',
  styleUrl: './no-user.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // ✅ add this line
})
export class NoUserComponent {
  update: string = "Ok"
  notFound = true;
}
