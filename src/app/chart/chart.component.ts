import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { RetirementDataService } from '../retirement-form.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, AfterViewInit {
  formData: any;
  chart: Chart | undefined;
  isViewInitialized = false;

  constructor(private dataService: RetirementDataService) {}

  ngAfterViewInit(): void {
    this.isViewInitialized = true;
  }

  ngOnInit(): void {
    this.dataService.formData$.subscribe(data => {
      this.formData = data;

      if (this.isViewInitialized) {
        this.updateChart();
      } else {
        // Slight delay to ensure canvas is ready
        setTimeout(() => this.updateChart(), 0);
      }
    });
  }

  updateChart() {
    const ctx = document.getElementById('retirementChart') as HTMLCanvasElement;
    if (!ctx) return;

    const currentAge = this.formData?.currentAge || 18;
    const retirementAge = this.formData?.targetAge || 60;
    const currentSavings = this.formData?.currentSave || 0;
    const targetCorpus = this.formData?.targetSave || 0;
    const monthlySave = this.formData?.monthlSave || 0;
    
    const annualRate = 0.06; // ✅ 6% annual
    const monthlyRate = annualRate / 12; // ✅ 0.005 (0.5% per month)
    
    const years: string[] = [];
    const actualSavings: number[] = [];
    const targetSavings: number[] = [];
    
    for (let age = currentAge; age <= retirementAge; age++) {
      const months = (age - currentAge) * 12;
    
      const futureValue = currentSavings * Math.pow(1 + monthlyRate, months) +
                          monthlySave * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
    
      const target = targetCorpus / Math.pow(1 + monthlyRate, (retirementAge - age) * 12);

      actualSavings.push(Math.round(futureValue));
      targetSavings.push(Math.round(target));
      years.push(`Age ${age}`);
    }
    
    // Destroy existing chart instance before creating a new one
    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: years,
        datasets: [
          {
            label: 'Actual Savings',
            data: actualSavings,
            borderColor: 'blue',
            fill: false,
            tension: 0.3
          },
          {
            label: 'Target Savings Goal',
            data: targetSavings,
            borderColor: 'green',
            borderDash: [5, 5],
            fill: false,
            tension: 0.3
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false, // 🛑 Important for mobile
        scales: {
          y: {
            beginAtZero: true,
            suggestedMax: targetCorpus * 1.1,
            ticks: {
              callback: function (tickValue: string | number) {
                const value = typeof tickValue === 'number' ? tickValue : parseFloat(tickValue);
                return value.toLocaleString() + ' $';
              },
              font: {
                size: 12 // 📱 Better readable on mobile
              }
            }
          },
          x: {
            ticks: {
              font: {
                size: 12
              }
            }
          }
        },
        plugins: {
          legend: {
            display: true,
            labels: {
              font: {
                size: 14
              }
            }
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                return context.dataset.label + ': $' + (context.raw as number).toLocaleString();
              }
            }
          }
        }
      }
    });
  }
}
