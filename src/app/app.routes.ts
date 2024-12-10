import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './guard/auth.guard';
import { ErrorComponent } from './pages/error/error.component';
import { SignupComponent } from './pages/auth/pocketbase/signup/signup.component';
import { LoginComponent } from './pages/auth/pocketbase/login/login.component';
import { UserComponent } from './pages/auth/pocketbase/user/user.component';

export const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'profile/:id',
        component: UserComponent,
        pathMatch: 'full',
      },
    ],
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
