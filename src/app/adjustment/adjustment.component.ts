import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-adjustment',
  imports: [CommonModule],
  templateUrl: './adjustment.component.html',
  styleUrl: './adjustment.component.css'
})
export class AdjustmentComponent {
  recommendedMonthlySave: number = 0;
  monthlySave: number = 0;
  
  onRecommendedSaveChange([recommendedMonthlySave, monthlySave]: [number, number]) {
    this.recommendedMonthlySave = recommendedMonthlySave;
    
  }


  @Output() trackStatusEmitter = new EventEmitter<boolean>();
  @Input() recommendedMonthly: number = 0;
  @Input() onTrack: boolean = true; // Show/hide message based on this
  toggleTrackStatus() {

    this.onTrack = !this.onTrack;
    this.trackStatusEmitter.emit(this.onTrack);  // Emit the status to parent
  }
}
