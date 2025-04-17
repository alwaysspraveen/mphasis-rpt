import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-adjustment',
  imports: [CommonModule],
  templateUrl: './adjustment.component.html',
  styleUrl: './adjustment.component.css'
})
export class AdjustmentComponent {
  @Input() onTrack: boolean=false;
}