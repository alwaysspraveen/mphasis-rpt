import { Component, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class RetirementChartComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    const ctx = document.getElementById('retirementChart') as HTMLCanvasElement;

    const currentAge = 22;
    const retirementAge = 60;
    const currentSavings = 200000;
    const targetCorpus = 13000000; // ₹1.6 Cr

    const annualContribution = 200000;
    const rate = 0.06;

    const years: string[] = [];
    const actualSavings: number[] = [];
    const targetSavings: number[] = [];

    for (let age = currentAge; age <= retirementAge; age++) {
      const n = age - currentAge;
      const futureValue = currentSavings * Math.pow(1 + rate, n) +
                          annualContribution * ((Math.pow(1 + rate, n) - 1) / rate);
      actualSavings.push(Math.round(futureValue));

      const target = targetCorpus / Math.pow(1 + rate, retirementAge - age);
      targetSavings.push(Math.round(target));

      years.push(`Age ${age}`);
    }

    new Chart(ctx, {
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
        scales: {
          y: {
            beginAtZero: true,
            suggestedMax: targetCorpus * 1.1, // adds 10% headroom
            ticks: {
              callback: function (tickValue: string | number) {
                const value = typeof tickValue === 'number' ? tickValue : parseFloat(tickValue);
                return '₹' + value.toLocaleString();
              }
            }
          }
        },
        plugins: {
          legend: {
            display: true
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return context.dataset.label + ': ₹' + (context.raw as number).toLocaleString();
              }
            }
          }
        }
      }      
    });
  }
}
export class ChartComponent {

}
