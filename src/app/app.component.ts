import { Component } from '@angular/core';
import { HeaderComponent } from "./header/header.component";
import { SearchComponent } from "./search/search.component";
import { FormComponent } from "./form/form.component";
import { MonthlyContribComponent } from "./monthly-contrib/monthly-contrib.component";
import { ButtonComponent } from "./button/button.component";
import { ChartComponent } from "./chart/chart.component";
import { AdjustmentComponent } from "./adjustment/adjustment.component";
import { TotalAmountComponent } from "./total-amount/total-amount.component";
import { CreatedGoalComponent } from "./created-goal/created-goal.component";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [HeaderComponent, SearchComponent, FormComponent, MonthlyContribComponent, ButtonComponent, AdjustmentComponent, ChartComponent, CreatedGoalComponent]
})
export class AppComponent {
  title = 'myapp';

  id: string = 'RPT100';

  
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
}
