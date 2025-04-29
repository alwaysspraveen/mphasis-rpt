import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginpageComponent } from './login/login.component';

export const routes: Routes = [
    
    { path: 'dashboard', component: DashboardComponent },
    { path: 'login', component: LoginpageComponent },
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    
  })
  
  export class AppRoutingModule { }