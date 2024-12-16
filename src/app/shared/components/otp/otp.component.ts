import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputOtpModule } from 'primeng/inputotp';

@Component({
  selector: 'app-otp',
  imports: [InputOtpModule, FormsModule, ButtonModule],
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.scss',
  standalone: true,
})
export class OtpComponent {
  @Output() value = new EventEmitter<string>();
  @Output() resend = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();

  otpValue!: string;

  emitValue(value: string) {
    this.value.emit(value);
    this.otpValue = '';
  }

  emitResend() {
    this.resend.emit();
  }

  emitClose() {
    this.close.emit();
  }
}
