import { CanActivateFn, Router } from '@angular/router';
import { PocketbaseService } from '../services/pocketbase.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {
  const pocketbase = inject(PocketbaseService);
  const router = inject(Router);
  if (pocketbase.user) return true;
  router.navigate(['/login']);
  pocketbase.signOut();
  return false;
};
