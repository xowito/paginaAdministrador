import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'paginaAdministrador';

  constructor(private router: Router,
    private authService: AuthService){

  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
