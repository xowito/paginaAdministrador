import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  token:string='';
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService,
    private router: Router){}

  ngOnInit() {
    //this.authService.logout();
    if (this.authService.isAuthenticated()) {
      
      const username = this.authService.getUsername();

      if (username) {
        this.router.navigateByUrl(`/perfil/${username}`);
      }
    }
    
  }


  login() {
    this.authService.login(this.username, this.password).subscribe(
      (response: any) => {
        if (response && response.mensaje) {
          console.log('Inicio de sesión exitoso:', response.mensaje);
          this.authService.saveToken(response.token); // Almacena el token
          
          this.router.navigateByUrl(`/perfil/${this.username}`);
        } else {
          console.error('Respuesta inesperada del servidor:', response);
        }
      },
      (error) => {
        console.error('Error al iniciar sesión:', error);
      }
    );
  }


}
