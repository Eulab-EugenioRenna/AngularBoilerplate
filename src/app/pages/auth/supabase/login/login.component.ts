import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { InputOtpModule } from 'primeng/inputotp';
import { SupabaseService } from '../../../../shared/services/supabase.service';
import { LogService } from '../../../../shared/services/log.service';

@Component({
  selector: 'app-login-supabase',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    CommonModule,
    ButtonModule,
    RippleModule,
    InputOtpModule,
    FormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginSupabaseComponent {
  signInForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });
  otpValue!: string;
  showOTP = false;

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
      this.router.navigate(['/profile/' + this.supabase.session?.user.id]);
      this.loading = false;
    } catch (error) {
      this.log.error('Sign In Password Error', error as Error);
      this.loading = false;
    }
  }
  async onSubmitOTP(): Promise<void> {
    this.showOTP = true;
    this.loading = true;
    try {
      const email = this.signInForm.value.email as string;
      const { error } = await this.supabase.signInOTP(email);
      if (error) throw error;
    } catch (error) {
      this.log.error('Sign In OTP Error', error as Error);
    }
  }
  async verifyOTP(): Promise<void> {
    try {
      const { error } = await this.supabase.verifyOTP(
        this.signInForm.value.email as string,
        this.otpValue
      );
      if (error) throw error;
      this.otpValue = '';
      this.signInForm.reset();
      this.router.navigate(['/profile' + this.supabase.session?.user.id]);
    } catch (error) {
      this.log.error('Verify OTP Error', error as Error);
    } finally {
      this.loading = false;
      this.showOTP = false;
    }
  }

  async resendOTP() {
    try {
      const email = this.signInForm.value.email as string;
      const { error } = await this.supabase.signInOTP(email);
      if (error) throw error;
    } catch (error) {
      this.log.error('Sign In OTP Error', error as Error);
    }
  }
}
