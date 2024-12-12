import { Component } from '@angular/core';
import { PocketbaseService } from '../../../../services/pocketbase.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LogService } from '../../../../services/log.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {
  id!: string;
  user = this.getCurrentUser();

  constructor(
    private readonly pocketbase: PocketbaseService,
    private activatedRoute: ActivatedRoute,
    private log: LogService
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
    });
  }

  getCurrentUser() {
    const avatar = this.getAvatar();
    const currentUser = {
      collectionName: this.pocketbase.session?.['collectionName'] ?? '',
      verified: this.pocketbase.session?.['verified'] ?? false,
      avatar: avatar ?? '',
      created: this.pocketbase.session?.['created'] ?? new Date(),
      email: this.pocketbase.session?.['email'] ?? '',
      emailVisibility: this.pocketbase.session?.['emailVisibility'] ?? false,
      id: this.pocketbase.session?.id ?? '',
      name: this.pocketbase.session?.['name'] ?? '',
      updated: this.pocketbase.session?.['updated'] ?? new Date(),
      username: this.pocketbase.session?.['username'] ?? '',
    };

    return currentUser;
  }

  getAvatar() {
    try {
      const res = this.pocketbase.getAvatarImage();
      return res;
    } catch (error) {
      this.log.error('Error getting avatar:', error as Error);
      return 'https://placehold.co/120X120';
    }
  }

  requestVerify() {
    this.pocketbase.requestVerification(this.user.email);
  }

  verifyEmail() {
    this.pocketbase.verifyEmail(this.id);
  }
}
