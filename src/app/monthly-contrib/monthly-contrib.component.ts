import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RetirementFormService } from '../retirement-form.service';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-monthly-contrib',
  standalone: true,
  imports: [CommonModule, MatTooltipModule],
  templateUrl: './monthly-contrib.component.html',
  styleUrls: ['./monthly-contrib.component.css']
})
export class MonthlyContribComponent implements OnInit {
  formData: any;
  animatedRecommendedValue: number = 0;
  animatedActualValue: number = 0;
  recommendedMonthlySave: number = 0;
  animatedTotalSavings: number = 0;
  expectedTotalSavings: number = 0;
  monthlySave: number = 0;

  @Input() id = 0;
  @Output() recommendedSaveEmitter = new EventEmitter<[number, number]>();

  constructor(private dataService: RetirementFormService) {}

  ngOnInit(): void {
    this.dataService.formData$.subscribe(data => {
      this.formData = data;
      this.calculateMonthly(); // only call this now
    });
  }

  prepareFormData(): any {
    return {
      currentAge: this.formData?.currentAge || 18,
      retirementAge: this.formData?.targetAge || 60,
      currentSavings: this.formData?.currentSave || 0,
      targetSavings: this.formData?.targetSave || 0,
      monthlyContribution: this.formData?.monthlSave || 0,
      createdAt: new Date().toISOString()
    };
  }

  public calculateMonthly() {
    const payload = this.prepareFormData();

    this.dataService.calculateMonthly(payload).subscribe({
      next: (response) => {
        // Get value from backend
        this.recommendedMonthlySave = response.requiredMonthlySavings;
        this.monthlySave = this.formData?.monthlSave || 0;

        const currentAge = this.formData?.currentAge || 18;
        const retirementAge = this.formData?.targetAge || 60;
        const currentSavings = this.formData?.currentSave || 0;
        const targetCorpus = this.formData?.targetSave || 0;

        const annualRate = 0.06;
        const monthlyRate = annualRate / 12;
        const totalMonths = (retirementAge - currentAge) * 12;

        this.expectedTotalSavings = currentSavings * Math.pow(1 + monthlyRate, totalMonths) +
          this.monthlySave * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate);

        // Animate the results
        this.animateValue(this.expectedTotalSavings, val => this.animatedTotalSavings = val);
        this.animateValue(this.recommendedMonthlySave, val => this.animatedRecommendedValue = val);
        this.animateValue(this.monthlySave, val => this.animatedActualValue = val);

        // Emit to parent component
        this.recommendedSaveEmitter.emit([this.recommendedMonthlySave, this.monthlySave]);
      },
      error: (error) => {
        console.error('Error goal', error);
      }
    });
  }

  animateValue(target: number, setter: (val: number) => void) {
    let currentValue = 0;
    const duration = 800;
    const frameRate = 60;
    const increment = target / (duration / (1000 / frameRate));

    const interval = setInterval(() => {
      if (currentValue < target) {
        currentValue += increment;
        setter(Math.floor(currentValue));
      } else {
        clearInterval(interval);
        setter(Math.round(target));
      }
    }, 1000 / frameRate);
  }
}
