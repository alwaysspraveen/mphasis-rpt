import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-adjustment',
  imports: [CommonModule],
  templateUrl: './adjustment.component.html',
  styleUrl: './adjustment.component.css'
})
export class AdjustmentComponent {
  onTrack=true;
}
