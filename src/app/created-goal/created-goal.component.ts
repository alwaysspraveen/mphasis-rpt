import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, Output } from '@angular/core';
import { PopBtnComponent } from "../pop-btn/pop-btn.component";

@Component({
  selector: 'app-created-goal',
  imports: [PopBtnComponent],
  templateUrl: './created-goal.component.html',
  styleUrl: './created-goal.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // ✅ add this line
  
})
export class CreatedGoalComponent {
@Input() data:string ='';
con : string = "Submit"
}
