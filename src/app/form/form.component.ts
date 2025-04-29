import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  ValidationErrors,
  AbstractControl,
} from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { RetirementFormService } from '../retirement-form.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit, AfterViewInit {
 
  retirementForm: FormGroup;
  @Output() formValidChange = new EventEmitter<boolean>();
  @Output() formSubmitted = new EventEmitter<boolean>();
  isSubmitting = false;
  submitError: string | null = null;

  constructor(
    private dataService: RetirementFormService,
  ) {
    this.retirementForm = new FormGroup(
      {
        currentAge: new FormControl('22', [
          Validators.required,
          Validators.min(18),
          Validators.max(60),
        ]),
        currentSave: new FormControl('0', [
          Validators.required,
          Validators.min(0),
          Validators.max(100000),
        ]),
        monthlSave: new FormControl('0', [
          Validators.required,
          Validators.min(0),
          Validators.max(10000),
        ]),
        targetAge: new FormControl('35', [
          Validators.required,
          Validators.min(18),
          Validators.max(60),
        ]),
        targetSave: new FormControl('0', [
          Validators.required,
          Validators.min(0),
          Validators.max(1000000),
        ]),
      },
      { validators: this.targetAgeGreaterThanCurrentAge }
    );
  }

  ngOnInit(): void {
    this.retirementForm.markAllAsTouched();
    this.retirementForm.valueChanges.pipe(debounceTime(300)).subscribe((values) => {
      this.formValidChange.emit(this.retirementForm.valid);

      if (this.retirementForm.valid) {
        this.dataService.updateFormData(values);
      } else {
        this.dataService.updateFormData(null);
      }
    });
  }

  ngAfterViewInit() {
    const sliders = document.querySelectorAll<HTMLInputElement>('input.slider');

    sliders.forEach(slider => {
      this.updateSliderBackground(slider);

      slider.addEventListener('input', (event) => {
        this.onSliderInput(event);
      });
    });
  }

  onSliderInput(event: Event) {
    const slider = event.target as HTMLInputElement;
    this.updateSliderBackground(slider);
  }

  updateSliderBackground(slider: HTMLInputElement) {
    const min = Number(slider.min);
    const max = Number(slider.max);
    const value = Number(slider.value);

    const fillPercentage = ((value - min) / (max - min)) * 100;

    slider.style.background = `linear-gradient(to right, #006EFF ${fillPercentage}%, #e1e1e1 ${fillPercentage}%)`;
  }

  hasError(controlName: string, errorType: string): boolean {
    const control = this.retirementForm.get(controlName);
    if (!control) return false;

    if (errorType === 'required') {
      return control.hasError('required');
    }

    if (controlName === 'targetAge' && errorType === 'targetAgeLessThanCurrentAge') {
      return this.retirementForm.hasError('targetAgeLessThanCurrentAge');
    }

    return (control.touched || control.dirty) && control.hasError(errorType);
  }

  updateSlider(controlName: string, event: any): void {
    const sliders = {
      currentAge: 'currentAgeSlider',
      currentSave: 'currentSaveSlider',
      monthlSave: 'monthlSaveSlider',
      targetAge: 'targetAgeSlider',
      targetSave: 'targetSaveSlider',
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
      if (control?.hasError('min')) return 'Age should not be less than 18';
      if (control?.hasError('max')) return 'Age should not be more than 60';
    }

    if (controlName === 'currentSave') {
      if (control?.hasError('min')) return 'Savings should not be less than 0';
      if (control?.hasError('max')) return 'Savings should not exceed $100,000';
    }

    if (controlName === 'monthlSave') {
      if (control?.hasError('min')) return 'Monthly contribution should not be less than 0';
      if (control?.hasError('max')) return 'Monthly contribution should not exceed $10,000';
    }

    if (controlName === 'targetSave') {
      if (control?.hasError('min')) return 'Target savings should not be less than 0';
      if (control?.hasError('max')) return 'Target savings should not exceed $1,000,000';
    }

    if (controlName === 'targetAge' && this.retirementForm.hasError('targetAgeLessThanCurrentAge')) {
      return 'Target age must be greater than current age';
    }

    return '';
  }

  targetAgeGreaterThanCurrentAge(group: AbstractControl): ValidationErrors | null {
    const currentAge = group.get('currentAge')?.value;
    const targetAge = group.get('targetAge')?.value;

    if (currentAge && targetAge && parseInt(targetAge) <= parseInt(currentAge)) {
      return { targetAgeLessThanCurrentAge: true };
    }

    return null;
  }

  prepareFormData(): any {
    const formValues = this.retirementForm.value;

    return {
      currentAge: Number(formValues.currentAge),
      retirementAge: Number(formValues.targetAge),
      currentSavings: Number(formValues.currentSave),
      targetSavings: Number(formValues.targetSave),
      monthlyContribution: Number(formValues.monthlSave),
      createdAt: new Date().toISOString()
    };
  }


  submitForm() {
    if (this.retirementForm.valid) {
      const payload = this.prepareFormData();

      this.isSubmitting = true;
      this.submitError = null;

      this.dataService.saveRetirementGoal(payload).subscribe({
        next: (response) => {
          console.log('Goal saved successfully!', response);
          this.formSubmitted.emit(true);
          this.isSubmitting = false;
        },
        error: (error) => {
          console.error('Error saving goal', error);
          this.submitError = 'Failed to save goal. Please try again.';
          this.isSubmitting = false;
        }
      });
    }
  }
}
