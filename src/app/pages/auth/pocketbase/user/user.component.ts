import { Component } from '@angular/core';
import { PocketbaseService } from '../../../../services/pocketbase.service';
import { ActivatedRoute } from '@angular/router';
import { Profile } from '../../../../models/profile';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {
  id!: string;
  user!: Profile;

  constructor(
    private readonly pocketbase: PocketbaseService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
      this.getCurrentUser();
    });
  }

  getCurrentUser() {
    this.user = {
      collectionId: this.pocketbase.session?.['collectionId'] ?? '',
      collectionName: this.pocketbase.session?.['collectionName'] ?? '',
      verified: this.pocketbase.session?.['verified'] ?? false,
      avatar: this.pocketbase.session?.['avatar'] ?? '',
      created: this.pocketbase.session?.['created'] ?? new Date(),
      email: this.pocketbase.session?.['email'] ?? '',
      emailVisibility: this.pocketbase.session?.['emailVisibility'] ?? false,
      id: this.pocketbase.session?.id ?? '',
      name: this.pocketbase.session?.['name'] ?? '',
      updated: this.pocketbase.session?.['updated'] ?? new Date(),
      username: this.pocketbase.session?.['username'] ?? '',
    };
  }
}
