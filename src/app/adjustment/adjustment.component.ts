import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-adjustment',
  imports: [CommonModule],
  templateUrl: './adjustment.component.html',
  styleUrl: './adjustment.component.css'
})
export class AdjustmentComponent {
 
  @Output() trackStatusEmitter = new EventEmitter<boolean>();
@Input() onTrack: boolean = true; // Show/hide message based on this
  toggleTrackStatus() {
    
    this.onTrack = !this.onTrack;
    this.trackStatusEmitter.emit(this.onTrack);  // Emit the status to parent
  }
}
