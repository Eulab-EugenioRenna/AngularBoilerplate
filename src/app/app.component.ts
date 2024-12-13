import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { SupabaseService } from './services/supabase.service';
import { LogService } from './services/log.service';
import { PocketbaseService } from './services/pocketbase.service';
import { BehaviorSubject, interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [LogService],
})
export class AppComponent implements OnInit, OnDestroy {
  private validationSubscription?: Subscription;
  private readonly CHECK_INTERVAL = 5 * 60 * 1000;

  constructor(
    private readonly supabase: SupabaseService,
    private logService: LogService,
    private pocketbase: PocketbaseService,
    private router: Router
  ) {}

  session = this.supabase.session;
  isLogged = new BehaviorSubject<boolean>(false);
  isLogged$ = this.isLogged.asObservable();

  ngOnInit() {
    this.supabase.authChanges((_, session) => (this.session = session));

    // Gestione cambio autenticazione Pocketbase
    this.pocketbase.authChanges(() => {
      this.validateAndUpdateAuthStatus();
    });

    // Controllo periodico token
    this.validationSubscription = interval(this.CHECK_INTERVAL).subscribe(
      () => {
        this.validateAndUpdateAuthStatus();
      }
    );
  }

  private validateAndUpdateAuthStatus() {
    const isValid = this.pocketbase.getValidatedUser();
    this.checkValidLogin(isValid);
    if (!isValid) {
      this.logService.log('Token not valid, redirecting to login');
      this.router.navigate(['/login']);
    }
  }

  ngOnDestroy() {
    if (this.validationSubscription) {
      this.validationSubscription.unsubscribe();
    }
  }

  checkValidLogin(validUser: boolean) {
    this.isLogged.next(validUser);
  }
}
