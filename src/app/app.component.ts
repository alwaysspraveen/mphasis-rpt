import { Component } from '@angular/core';
import { HeaderComponent } from "./header/header.component";
import { SearchComponent } from "./search/search.component";
import { FormComponent } from "./form/form.component";
import { MonthlyContribComponent } from "./monthly-contrib/monthly-contrib.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [HeaderComponent, SearchComponent, FormComponent, MonthlyContribComponent]
})
export class AppComponent {
  title = 'myapp';
}
