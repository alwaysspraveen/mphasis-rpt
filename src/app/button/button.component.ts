import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})

export class ButtonComponent {

  @Input() isValid: boolean = false;
  @Input() isSave: boolean = false;
  @Input() isEdit: boolean = false;
  @Input() isUpdate: boolean = false;
  @Output() clickAction: EventEmitter<string> = new EventEmitter<string>();


  onButtonClick() {
    if (this.isSave) {
      this.clickAction.emit('save');
    } else if (this.isEdit) {
      this.clickAction.emit('edit');
    } else if (this.isUpdate) {
      this.clickAction.emit('update');
    }
  }
}
