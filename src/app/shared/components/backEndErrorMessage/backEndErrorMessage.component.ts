import { Component, Input, OnInit } from '@angular/core';
import { BackendErrorsInterface } from '../../../auth/components/types/backendErrorsInterface';
import { CommonModule, NgForOf } from '@angular/common';

@Component({
  selector: 'app-backend-error-message',
  templateUrl: './backEndErrorMessage.component.html',
  imports: [
    NgForOf,
    CommonModule
  ],
  standalone: true
})

export class BackEndErrorMessageComponent implements OnInit {
  @Input() backendErrors: BackendErrorsInterface = {};

  errorMessages: string[] = [];

  ngOnInit() {
    this.errorMessages = Object.keys(this.backendErrors).map((name: string) => {
      const messages = this.backendErrors[name].join(' ');
      return `${name} ${messages}`;
    });
  }
}
