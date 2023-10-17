import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  correo_electronico: string = '';
  password: string = '';

  constructor(private authService: AuthService,
    private router: Router){}

  ngOnInit() {
    //this.authService.logout();
    if (this.authService.isAuthenticated()) {
      
      const correoElectronico = this.authService.getCorreoElectronico();

      if (correoElectronico) {
        this.router.navigate([`/perfil/${correoElectronico}`]);
      }
    }
    
  }


  login() {
    this.authService.login(this.correo_electronico, this.password).subscribe(
      (response: any) => {
        if (response && response.mensaje) {
          console.log('Inicio de sesión exitoso:', response.mensaje);
          this.authService.saveToken(response.token); // Almacena el token
          
          this.router.navigate([`/perfil/${this.correo_electronico}`]);
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
