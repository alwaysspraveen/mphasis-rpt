import { Component } from '@angular/core';
import { AdjustmentComponent } from "../adjustment/adjustment.component";
import { RetirementChartComponent } from "../chart/chart.component";

@Component({
  selector: 'app-monthly-contrib',
  imports: [AdjustmentComponent, RetirementChartComponent],
  templateUrl: './monthly-contrib.component.html',
  styleUrl: './monthly-contrib.component.css'
})
export class MonthlyContribComponent {

}
