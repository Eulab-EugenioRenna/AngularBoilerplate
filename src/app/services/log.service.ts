import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class LogService {
  constructor(private messageService: MessageService) {}

  log(message: string, optionalParams?: unknown) {
    console.log(message, optionalParams);
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: message + ' : ' + optionalParams,
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

  warn(message: string, optionalParams?: Error) {
    console.warn(message, optionalParams);
    this.messageService.add({
      severity: 'warning',
      summary: 'Warning',
      detail: message + ' : ' + optionalParams?.message,
    });
  }
}
