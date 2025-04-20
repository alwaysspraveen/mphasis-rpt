import { Component, EventEmitter, Input, OnInit, Output , Pipe} from '@angular/core';
import { RetirementDataService } from '../retirement-form.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-monthly-contrib',
  standalone: true, 
  imports:[CommonModule],
  templateUrl: './monthly-contrib.component.html',
  styleUrls: ['./monthly-contrib.component.css']
})
export class MonthlyContribComponent implements OnInit {
  formData: any;
  animatedRecommendedValue: number = 0;
  animatedActualValue: number = 0;
  recommendedMonthlySave: number = 0;
  animatedTotalSavings:number = 0;
  expectedTotalSavings : number = 0;
  monthlySave: number = 0;

  @Input() id = this.recommendedMonthlySave
  @Output() recommendedSaveEmitter = new EventEmitter<[number, number]>();

  constructor(private dataService: RetirementDataService) {}

  ngOnInit(): void {
    this.dataService.formData$.subscribe(data => {
      this.formData = data;
      this.animateValues(); // Start animation for both values
    });
  }

  animateValues() {
    const currentAge = this.formData?.currentAge || 18;
    const retirementAge = this.formData?.targetAge || 60;
    const currentSavings = this.formData?.currentSave || 0;
    const targetCorpus = this.formData?.targetSave || 0;
    const monthlySave = this.formData?.monthlSave || 0;

    const annualRate = 0.06;
    const monthlyRate = annualRate / 12;
    const totalMonths = (retirementAge - currentAge) * 12;

    this.recommendedMonthlySave = Math.round((
      (targetCorpus - currentSavings * Math.pow(1 + monthlyRate, totalMonths)) *
      monthlyRate / ((Math.pow(1 + monthlyRate, totalMonths) - 1))
    ) * 100) / 100;

    this.monthlySave = monthlySave;

    this.expectedTotalSavings = currentSavings * Math.pow(1 + monthlyRate, totalMonths) +
    monthlySave * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate);


    this.animateValue(this.expectedTotalSavings, (val) => this.animatedTotalSavings = val)
    this.animateValue(this.recommendedMonthlySave, (val) => this.animatedRecommendedValue = val);
    this.animateValue(this.monthlySave, (val) => this.animatedActualValue = val);

    this.recommendedSaveEmitter.emit([this.recommendedMonthlySave, this.monthlySave]);

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
