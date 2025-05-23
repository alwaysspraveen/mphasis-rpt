import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalAmountComponent } from './total-amount.component';

describe('TotalAmountComponent', () => {
  let component: TotalAmountComponent;
  let fixture: ComponentFixture<TotalAmountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TotalAmountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalAmountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
