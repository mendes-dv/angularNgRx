import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { RegisterRequestInterface } from '../types/registerRequest.interface';
import { AuthStateInterface } from '../types/authState.interface';
import { AsyncPipe, NgIf } from '@angular/common';
import { selectIsSubmitting, selectValidationErrors } from '../../store/reducer';
import { AuthService } from '../../services/auth.service';
import { authActions } from '../../store/actions';
import { combineLatest } from 'rxjs';
import {
  BackEndErrorMessageComponent
} from '../../../shared/components/backEndErrorMessage/backEndErrorMessage.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    AsyncPipe,
    NgIf,
    BackEndErrorMessageComponent
  ],
  standalone: true
})

export class RegisterComponent {
  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required]
  });
  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    backEndErrors: this.store.select(selectValidationErrors)
  });

  constructor(
    private fb: FormBuilder,
    private store: Store<{ auth: AuthStateInterface }>,
    private authService: AuthService
  ) {}

  onSubmit() {
    console.log('form', this.form.getRawValue());
    const request: RegisterRequestInterface = {
      user: this.form.getRawValue()
    };
    this.store.dispatch(authActions.register({ request }));
    this.authService.register(request).subscribe(res => console.log('res', res));
  }
}
