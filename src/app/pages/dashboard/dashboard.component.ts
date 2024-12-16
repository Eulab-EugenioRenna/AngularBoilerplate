import { Component } from '@angular/core';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { PocketbaseService } from '../../shared/services/pocketbase.service';
import { LogService } from '../../shared/services/log.service';

@Component({
  selector: 'app-dashboard',
  imports: [SidebarComponent],
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  user = this.getCurrentUser();

  constructor(private pocketbase: PocketbaseService, private log: LogService) {}

  getCurrentUser() {
    try {
      const res = this.pocketbase.getCurrentUser();
      return res;
    } catch (error) {
      this.log.error('Error getting user:', error as Error);
      return null;
    }
  }
}
