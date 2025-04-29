import { Component, NgModule } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet, MatTooltipModule]
})


export class AppComponent {
  title = 'myapp';
  id: string = 'RPT100';

  @NgModule({
    imports: [MatTooltipModule]
  })

  recommendedMonthlySave: number = 0; // Hold the recommended value from MonthlyContribComponent
  onTrack: boolean = true;  // Track the onTrack status from AdjustmentComponent
  targetValue: number = 0; // Monthly savings value (assumed to be input from user or form)

  // Handle the emitted recommended value from MonthlyContribComponent
  onRecommendedSaveChange([recommendedSave, targetValue]: [number, number]) {
    this.targetValue = targetValue;
    this.recommendedMonthlySave = recommendedSave;
    this.checkOnTrack();
  }

  checkOnTrack() {
    this.onTrack = this.targetValue >= this.recommendedMonthlySave;
  }
  onTrackStatusChange(status: boolean) {
    this.onTrack = status;
  }
  isValid: boolean = false;

  onFormValidChange(formValid: boolean) {
    this.isValid = formValid;
    console.log("Form valid?", formValid); // Debug
  }


  toggleDarkMode() {
    document.documentElement.classList.toggle('dark');
  }


}

