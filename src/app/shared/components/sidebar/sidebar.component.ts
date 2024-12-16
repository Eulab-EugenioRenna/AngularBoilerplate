import { Component, Input, ViewChild } from '@angular/core';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { Ripple } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { StyleClass } from 'primeng/styleclass';
import { Drawer } from 'primeng/drawer';
import { PocketbaseService } from '../../services/pocketbase.service';
import { LogService } from '../../services/log.service';
import { CommonModule } from '@angular/common';
import { Profile } from '../../models/profile';

@Component({
  selector: 'app-sidebar',
  imports: [
    DrawerModule,
    ButtonModule,
    AvatarModule,
    Ripple,
    StyleClass,
    Drawer,
    CommonModule,
  ],
  standalone: true,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  @Input() user!: Profile | null;

  @ViewChild('drawerRef') drawerRef!: Drawer;

  visible = false;

  constructor(private pocketbase: PocketbaseService, private log: LogService) {}

  closeCallback(e: Event): void {
    this.drawerRef.close(e);
  }
}
