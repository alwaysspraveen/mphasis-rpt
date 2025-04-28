import { Component, NgModule } from '@angular/core';
import { HeaderComponent } from "./header/header.component";
import { SearchComponent } from "./search/search.component";
import { FormComponent } from "./form/form.component";
import { MonthlyContribComponent } from "./monthly-contrib/monthly-contrib.component";
import { ButtonComponent } from "./button/button.component";
import { ChartComponent } from "./chart/chart.component";
import { AdjustmentComponent } from "./adjustment/adjustment.component";
import { CreatedGoalComponent } from './created-goal/created-goal.component';
import { NoUserComponent } from './no-user/no-user.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { UpdatedGoalComponent } from "./updated-goal/updated-goal.component";
import { CommonModule } from '@angular/common';
import { DashboardComponent } from "./dashboard/dashboard.component";
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet, HeaderComponent, SearchComponent, FormComponent, MonthlyContribComponent, ButtonComponent, AdjustmentComponent, ChartComponent, CreatedGoalComponent, NoUserComponent, MatTooltipModule, UpdatedGoalComponent, DashboardComponent]
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

