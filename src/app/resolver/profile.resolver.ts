import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { PocketbaseService } from '../services/pocketbase.service';
import { LogService } from '../services/log.service';

export const profileResolver: ResolveFn<boolean> = async (route) => {
  const pocketbase = inject(PocketbaseService);
  const router = inject(Router);
  const log = inject(LogService);
  const idRoute = route.params['id'];
  try {
    const user = await pocketbase.getUserById(idRoute);
    log.log('Retrieve User:,' + user['username']);
    return true;
  } catch (error) {
    log.error('Error getting user:', error as Error);
    router.navigate(['/error']);
    return false;
  }
};
