import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-created-goal',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './created-goal.component.html',
  styleUrls: ['./created-goal.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CreatedGoalComponent {

  goal: boolean = true;
  close() {
    // Suggested code may be subject to a license. Learn more: ~LicenseLog:2040947296.
    this.goal = !this.goal;
  }
  @Input() data: string = '';
  userEmail: string = '';
  emailErrorMessage: string = '';

  validateEmail() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (this.userEmail && !emailRegex.test(this.userEmail)) {
      this.emailErrorMessage = "Please enter a valid Email address.";
    } else if (this.userEmail && emailRegex.test(this.userEmail)) {
      this.emailErrorMessage = '';
    } else {
      this.emailErrorMessage = '';
    }
  }

  sendEmail() {
    const templateParams = {
      user_Email: this.userEmail,
      reference_id: this.data
    };

    emailjs.send(
      'service_z71wuta',
      'template_fbr61qe',
      templateParams,
      'krF-ogkjcNyFgQGuN'
    )
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        alert("Email sent successfully!");
      }, (error) => {
        console.log('FAILED...', error);
        alert("Failed to send email. Please try again later.");
      });
  }
}
