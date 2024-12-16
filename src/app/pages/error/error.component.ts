import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './error.component.html',
  styleUrl: './error.component.scss',
})
export class ErrorComponent {
  constructor(private router: Router) {}
  goBack(): void {
    window.history.back();
  }
  goHome(): void {
    this.router.navigate(['/']);
  }
}
