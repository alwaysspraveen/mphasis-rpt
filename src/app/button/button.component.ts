import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})

export class ButtonComponent {
@Input() isValid:boolean = false;
@Input() isSave: boolean = false;
@Input() isEdit: boolean = false;
@Input() isUpdate: boolean = false;
}
