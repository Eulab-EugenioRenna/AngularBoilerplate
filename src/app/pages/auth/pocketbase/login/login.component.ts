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
import { LogService } from '../../../../services/log.service';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { InputOtpModule } from 'primeng/inputotp';
import { PocketbaseService } from '../../../../services/pocketbase.service';

@Component({
  selector: 'app-login',
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
export class LoginComponent {
  signInForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });
  otpValue!: string;
  showOTP = false;
  pocketbaseOptId!: string;

  constructor(
    private readonly pocketbase: PocketbaseService,
    private log: LogService,
    private router: Router
  ) {}
  loading = this.signInForm.invalid;
  async onSubmitEmailPassword(): Promise<void> {
    try {
      this.loading = true;
      const email = this.signInForm.value.email as string;
      const password = this.signInForm.value.password as string;
      const authData = await this.pocketbase.signInPassword(email, password);
      this.router.navigate(['/profile/' + authData.record['id']]);
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
      const authData = await this.pocketbase.signInOTP(email);
      if (authData.otpId) {
        this.pocketbaseOptId = authData.otpId;
      }
    } catch (error) {
      this.log.error('Sign In OTP Error', error as Error);
    }
  }
  async verifyOTP(): Promise<void> {
    try {
      const authData = await this.pocketbase.verifyOTP(
        this.pocketbaseOptId,
        this.otpValue
      );
      this.otpValue = '';
      this.signInForm.reset();
      this.router.navigate(['/profile' + authData.record.id]);
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
      const authData = await this.pocketbase.signInOTP(email);
      if (authData.otpId) {
        this.pocketbaseOptId = authData.otpId;
      }
    } catch (error) {
      this.log.error('Sign In OTP Error', error as Error);
    }
  }
}
