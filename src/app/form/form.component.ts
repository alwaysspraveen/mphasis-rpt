import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent {
  retirementForm: FormGroup = new FormGroup({
    currentAge: new FormControl('', [Validators.required, Validators.min(18), Validators.max(60)]),
    currentSave: new FormControl('', [Validators.required, Validators.min(0), Validators.max(100000)]),
    monthlSave: new FormControl('', [Validators.required, Validators.min(0), Validators.max(10000)]),
    targetAge: new FormControl('', [Validators.required, Validators.min(18), Validators.max(60)]),
    targetSave: new FormControl('', [Validators.required, Validators.min(0), Validators.max(1000000)])
  });


hasError(controlName: string, errorType: string): boolean {
  const control = this.retirementForm.get(controlName);
  return !!(control && (control.touched || control.dirty) && control.hasError(errorType));
}


  updateSlider(controlName: string, event: any): void {
    const sliders = {
      currentAge: 'currentAgeSlider',
      currentSave: 'currentSaveSlider',
      monthlSave: 'monthlSaveSlider',
      targetAge: 'targetAgeSlider',
      targetSave: 'targetSaveSlider'
    };
    
    const value = event.target.value;
    const slider = document.getElementById(sliders[controlName as keyof typeof sliders]) as HTMLInputElement;
    if (slider) {
      slider.value = value;
    }
  }

  updateInput(controlName: string, event: any): void {
    const value = event.target.value;
    this.retirementForm.get(controlName)?.setValue(value);
    this.retirementForm.get(controlName)?.markAsTouched();
  }


  getErrorMessage(controlName: string): string {
    const control = this.retirementForm.get(controlName);
    
    if (control?.hasError('required')) {
      return 'This is a required field';
    }
    
    if (controlName === 'currentAge' || controlName === 'targetAge') {
      if (control?.hasError('min')) {
        return 'Age should not be less than 18';
      }
      if (control?.hasError('max')) {
        return 'Age should not be more than 60';
      }
    }
        
    if (controlName === 'currentSave') {
      if (control?.hasError('min')) {
        return 'Savings should not be less than 0';
      }
    }
    if (controlName === 'currentSave') {
      if (control?.hasError('max')) {
        return 'Savings should not exceed $100,000';
      }
    }

    if (controlName === 'monthlSave') {
      if (control?.hasError('min')) {
        return 'Monthly contribution should not be less than 0';
      }
    }
    
    if (controlName === 'monthlSave') {
      if (control?.hasError('max')) {
        return 'Monthly contribution should not exceed $10,000';
      }
    }
    if (controlName === 'targetSave') {
      if (control?.hasError('min')) {
        return 'Target savings should not be less than 0';
      }
    }
    if (controlName === 'targetSave') {
      if (control?.hasError('max')) {
        return 'Target savings should not exceed $1,000,000';
      }
    }
    return '';
  }
}