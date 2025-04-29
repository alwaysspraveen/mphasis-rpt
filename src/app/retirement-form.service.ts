import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RetirementFormService {
  saveGoal(formData: any) {
    throw new Error('Method not implemented.');
  }
  private formDataSource = new BehaviorSubject<any>(null);
  formData$ = this.formDataSource.asObservable();

  updateFormData(data: any) {
    this.formDataSource.next(data);
  }

  constructor(private http: HttpClient) {}

  saveRetirementGoal(payload: any): Observable<any> {
    return this.http.post('http://localhost:5177/api/RetirementGoal', payload);
  }
}
