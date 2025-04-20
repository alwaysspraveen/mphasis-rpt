import { Component, OnInit } from '@angular/core';
import { RetirementDataService } from '../retirement-form.service'; // Ensure the correct path

@Component({
  selector: 'app-monthly-contrib',
  templateUrl: './monthly-contrib.component.html',
  styleUrls: ['./monthly-contrib.component.css']
})
export class MonthlyContribComponent implements OnInit {
  formData: any;
  animatedValue: number = 0; // This will hold the animated value
  monthlySave: any;
  constructor(private dataService: RetirementDataService) { }

  ngOnInit(): void {
    // Subscribe to formData from the data service
    this.dataService.formData$.subscribe(data => {
      this.formData = data;
      this.animateValue(); // Start animation when data is received
    });
  }

  animateValue() {
    const targetValue = this.formData ? this.formData.monthlSave : 0; // Set target value
    let currentValue = 0;
    const duration = 800; // Duration of the animation in ms (2 seconds)
    const frameRate = 60; // FPS (frames per second) for the animation
    const increment = targetValue / (duration / (1000 / frameRate)); // Calculate increment value per frame

    const interval = setInterval(() => {
      if (currentValue < targetValue) {
        currentValue += increment; // Increase current value
        this.animatedValue = Math.floor(currentValue); // Update animated value
      } else {
        clearInterval(interval); // Stop the animation when the target value is reached
        this.animatedValue = targetValue; // Ensure we reach the target value
      }
    }, 1000 / frameRate); // Set the interval rate based on FPS
  }
}
