import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyContribComponent } from './monthly-contrib.component';
import { FormsModule } from '@angular/forms';

describe('MonthlyContribComponent', () => {
  let component: MonthlyContribComponent;
  let fixture: ComponentFixture<MonthlyContribComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonthlyContribComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MonthlyContribComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render current and expected monthly savings', () => {
    component.formData = { monthlSave: 1000 };
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('p.text-\\[24px\\]')?.textContent).toContain('$1000');
    expect(compiled.querySelector('p.text-\\[24px\\]:last-of-type')?.textContent).toContain('$0');
  });

  it('should render "No Data" when formData is not available', () => {
    component.formData = null;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('p.text-\\[24px\\]')?.textContent).toContain('$');
  });

  it('should render images correctly', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const images = compiled.querySelectorAll('img');
    expect(images.length).toBe(2);
    expect(images[0].getAttribute('src')).toBe('images/target.png');
    expect(images[1].getAttribute('src')).toBe('images/target-1.png');
    expect(images[0].getAttribute('alt')).toBe('logo');
    expect(images[1].getAttribute('alt')).toBe('logo');
  });

  it('should have divs with specific background colors', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const divs = compiled.querySelectorAll('div[class*="bg-"]');
    expect(divs.length).toBeGreaterThanOrEqual(2);

    let div1Found = false;
    let div2Found = false;

    divs.forEach(div => {
      if (div.classList.contains('bg-[#E6ECFE]')) {
        div1Found = true;
      }
      if (div.classList.contains('bg-[#CFEDFF]')) {
        div2Found = true;
      }
    });

    expect(div1Found).toBe(true);
    expect(div2Found).toBe(true);
  });

  it('should display 0 if monthlSave is 0', () => {
    component.formData = { monthlSave: 0 };
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('p.text-\\[24px\\]')?.textContent).toContain('$0');
  });



});
