import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class LogService {
  constructor(private messageService: MessageService) {}

  log(message: string) {
    console.log(message);
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: message,
    });
  }

  error(message: string, optionalParams?: Error) {
    console.error(message, optionalParams);
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: message + ' : ' + optionalParams?.message,
    });
  }

  warn(message: string) {
    console.warn(message);
    this.messageService.add({
      severity: 'warn',
      summary: 'Warning',
      detail: message,
    });
  }
}
