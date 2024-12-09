import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SupabaseService } from '../../../services/supabase.service';
import { LogService } from '../../../services/log.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  constructor(
    private supabase: SupabaseService,
    private router: Router,
    private log: LogService
  ) {}

  loading = false;

  signUpForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(32),
      Validators.pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[a-zA-Z\d!@#$%^&*(),.?":{}|<>]{8,32}$/
      ),
    ]),
  });

  onSubmit(): void {
    try {
      this.loading = true;
      const email = this.signUpForm.value.email as string;
      const password = this.signUpForm.value.password as string;
      if (email === '' || password === '') throw new Error('Input Blank');
      this.supabase.register(email, password).then(({ error }) => {
        if (error) throw error;
        this.router.navigate(['/']);
        this.loading = false;
      });
    } catch (error) {
      this.log.error('Signup Error', error as Error);
      this.loading = false;
    }
  }
}
