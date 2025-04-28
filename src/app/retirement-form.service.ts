import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RetirementDataService {
  private formDataSource = new BehaviorSubject<any>(null);
  formData$ = this.formDataSource.asObservable();

  updateFormData(data: any) {
    this.formDataSource.next(data);
  }
}
