import { HttpInterceptorFn } from '@angular/common/http';
import { PocketbaseService } from '../services/pocketbase.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const interceptValidStateInterceptor: HttpInterceptorFn = (
  req,
  next
) => {
  const pocketbase = inject(PocketbaseService);
  const router = inject(Router);
  if (!pocketbase.getValidatedUser()) {
    pocketbase.signOut();
    router.navigate(['/login']);
  }
  return next(req);
};
