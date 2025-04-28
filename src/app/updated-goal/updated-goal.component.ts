import { Component } from '@angular/core';
import { PopBtnComponent } from "../pop-btn/pop-btn.component";

@Component({
  selector: 'app-updated-goal',
  imports: [PopBtnComponent],
  templateUrl: './updated-goal.component.html',
  styleUrl: './updated-goal.component.css'
})
export class UpdatedGoalComponent {
update:string = "Ok"
}
