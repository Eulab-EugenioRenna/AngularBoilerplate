import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ErrorComponent } from './pages/error/error.component';
import { SignupComponent } from './pages/auth/pocketbase/signup/signup.component';
import { LoginComponent } from './pages/auth/pocketbase/login/login.component';
import { UserComponent } from './pages/auth/pocketbase/user/user.component';
import { authGuard } from './guard/auth.guard';
import { profileResolver } from './resolver/profile.resolver';

export const routes: Routes = [
  {
    path: '',
    component: AppComponent,
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
