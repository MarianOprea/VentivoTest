import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'VentivoTest';

  constructor(private readonly auth: AuthService){}

  get isAuthenticated(): boolean {
    return this.auth.isAuthenticated;
  }
}
