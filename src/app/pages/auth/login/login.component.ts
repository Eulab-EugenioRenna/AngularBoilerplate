import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SupabaseService } from '../../../services/supabase.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LogService } from '../../../services/log.service';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    CommonModule,
    ButtonModule,
    RippleModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  signInForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });
  constructor(
    private readonly supabase: SupabaseService,
    private log: LogService,
    private router: Router
  ) {}
  loading = this.signInForm.invalid;
  async onSubmitEmailPassword(): Promise<void> {
    try {
      this.loading = true;
      const email = this.signInForm.value.email as string;
      const password = this.signInForm.value.password as string;
      const { error } = await this.supabase.signInPassword(email, password);
      if (error) throw error;
      this.router.navigate(['/']);
      this.loading = false;
    } catch (error) {
      this.log.error('Sign In Password Error', error as Error);
      this.loading = false;
    }
  }
  async onSubmitOTP(): Promise<void> {
    try {
      this.loading = true;
      const email = this.signInForm.value.email as string;
      const { error } = await this.supabase.signInOTP(email);
      if (error) throw error;
      this.router.navigate(['/']);
      this.loading = false;
    } catch (error) {
      this.log.error('Sign In OTP Error', error as Error);
      this.loading = false;
    }
  }
}
