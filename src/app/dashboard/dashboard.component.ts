import { Component, NgModule, ViewChild } from '@angular/core';
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
import { HttpClient } from '@angular/common/http';

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

  recommendedMonthlySave: number = 0;
  onTrack: boolean = true; 
  targetValue: number = 0; 
  goal = false
  
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

  @ViewChild(FormComponent) formComponent!: FormComponent;

  callSubmitFromParent() {
    this.formComponent.submitForm();
  }

  handleAction(action: string) {
    switch (action) {
      case 'save':
        this.callSubmitFromParent();
        break;
      case 'edit':
        this.edit();
        break;
      case 'update':
        this.update();
        break;
      default:
        break;
    }
  }
  update() {
    throw new Error('Method not implemented.');
  }
  edit() {
    throw new Error('Method not implemented.');
  }

  goalId: string = '';  // Variable to hold the received goal ID
  showID:boolean=false;
  
  handleFormSubmitted(goalId: string) {
    this.goalId = goalId;  // Store the goal ID
    this.showID=true
    console.log('Goal ID received in parent:', goalId);
  }
}
