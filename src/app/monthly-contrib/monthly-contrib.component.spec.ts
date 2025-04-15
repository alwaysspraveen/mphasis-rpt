import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyContribComponent } from './monthly-contrib.component';

describe('MonthlyContribComponent', () => {
  let component: MonthlyContribComponent;
  let fixture: ComponentFixture<MonthlyContribComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonthlyContribComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthlyContribComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
