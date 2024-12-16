import { Routes } from '@angular/router';
import { ErrorComponent } from './pages/error/error.component';
import { SignupComponent } from './pages/auth/pocketbase/signup/signup.component';
import { LoginComponent } from './pages/auth/pocketbase/login/login.component';
import { UserComponent } from './pages/auth/pocketbase/user/user.component';
import { authGuard } from './shared/guard/auth.guard';
import { profileResolver } from './shared/resolver/profile.resolver';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [authGuard],
  },
  {
    path: 'profile/:id',
    component: UserComponent,
    pathMatch: 'full',
    canActivate: [authGuard],
    resolve: {
      profile: profileResolver,
    },
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'error',
    component: ErrorComponent,
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'error',
  },
];
