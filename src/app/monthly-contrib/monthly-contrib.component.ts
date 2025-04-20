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
  recommendedMonthlySave: any;
  constructor(private dataService: RetirementDataService) { }

  ngOnInit(): void {
    // Subscribe to formData from the data service
    this.dataService.formData$.subscribe(data => {
      this.formData = data;
      this.animateValue(); // Start animation when data is received
    });
  }



  animateValue() {
    const currentAge = this.formData?.currentAge || 18;
    const retirementAge = this.formData?.targetAge || 60;
    const currentSavings = this.formData?.currentSave || 0;
    const targetCorpus = this.formData?.targetSave || 0;

    const annualRate = 0.06; // ✅ 6% annual
    const monthlyRate = annualRate / 12; // ✅ 0.005 (0.5% per month)

    const totalMonths = (retirementAge - currentAge) * 12;

    // Formula for recommended monthly contribution (PMT)
    this.recommendedMonthlySave = Math.round((
      (targetCorpus - currentSavings * Math.pow(1 + monthlyRate, totalMonths)) *
      monthlyRate / ((Math.pow(1 + monthlyRate, totalMonths) - 1))
    ) * 100) / 100;





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
    }, 1000 / frameRate); 
    
    
    
    // Set the interval rate based on FPS
  }
}
