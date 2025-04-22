import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-adjustment',
  imports: [CommonModule],
  templateUrl: './adjustment.component.html',
  styleUrl: './adjustment.component.css'
})
export class AdjustmentComponent {
  monthlySave: number = 0;
   

  @Output() trackStatusEmitter = new EventEmitter<boolean>();

  @Input() recommendedMonthly: number = 0;
  @Input() onTrack: boolean = true;

  toggleTrackStatus() {
    this.onTrack = !this.onTrack;
    this.trackStatusEmitter.emit(this.onTrack);  // Emit the status to parent
  }
}
