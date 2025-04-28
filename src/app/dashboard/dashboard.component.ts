import { Component, NgModule } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormComponent } from "../form/form.component";
import { SearchComponent } from "../search/search.component";
import { HeaderComponent } from '../header/header.component';
import { MonthlyContribComponent } from '../monthly-contrib/monthly-contrib.component';
import { ButtonComponent } from '../button/button.component';
import { AdjustmentComponent } from '../adjustment/adjustment.component';
import { ChartComponent } from '../chart/chart.component';
import { CreatedGoalComponent } from '../created-goal/created-goal.component';
import { NoUserComponent } from '../no-user/no-user.component';
import { UpdatedGoalComponent } from '../updated-goal/updated-goal.component';

@Component({
  selector: 'app-dashboard',
  imports: [HeaderComponent, SearchComponent, FormComponent, MonthlyContribComponent, ButtonComponent, AdjustmentComponent, ChartComponent, CreatedGoalComponent, NoUserComponent, MatTooltipModule, UpdatedGoalComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
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

}
