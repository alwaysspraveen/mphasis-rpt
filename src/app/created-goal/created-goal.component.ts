import { Component, Input, Output } from '@angular/core';
import { PopBtnComponent } from "../pop-btn/pop-btn.component";

@Component({
  selector: 'app-created-goal',
  imports: [PopBtnComponent],
  templateUrl: './created-goal.component.html',
  styleUrl: './created-goal.component.css'
})
export class CreatedGoalComponent {
@Input() data:string ='';
}
