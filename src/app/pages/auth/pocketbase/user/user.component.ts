import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LogService } from '../../../../shared/services/log.service';
import { PocketbaseService } from '../../../../shared/services/pocketbase.service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {
  id!: string;
  user = this.getCurrentUser();

  constructor(
    private readonly pocketbase: PocketbaseService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private log: LogService
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
    });
  }

  getCurrentUser() {
    try {
      const res = this.pocketbase.getCurrentUser();
      return res;
    } catch (error) {
      this.log.error('Error getting user:', error as Error);
      return null;
    }
  }

  requestVerify() {
    this.pocketbase.requestVerification(this.user!['email']);
  }

  verifyEmail() {
    this.pocketbase.verifyEmail(this.id);
  }

  logOut() {
    this.pocketbase.signOut();
  }

  toHome() {
    this.router.navigate(['/']);
  }
}
