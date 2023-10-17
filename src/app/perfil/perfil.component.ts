import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  usuarioId: string | null = null;
  correoElectronico:string= '';
  datosUsuario: any = {};
  constructor(private route: ActivatedRoute,
    private authService: AuthService,
    private sanitizer: DomSanitizer,
    private router: Router){}

  ngOnInit() {
    console.log(this.datosUsuario.correo_electronico);
    this.route.params.subscribe((params) => {
      this.correoElectronico = params['correoElectronico'];
      this.authService.getUserProfile(this.correoElectronico).subscribe(
        (profileData: any) => {
          console.log(profileData);
          this.datosUsuario = profileData;  
          
          if (this.datosUsuario.img_base64 !== null) {
            // Crear una URL segura a partir de los datos base64
            this.datosUsuario.img_base64 = this.sanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,' + this.datosUsuario.img_base64);
          }
          
          console.log(this.datosUsuario);
        },
        (error: any) => {
          console.error('Error al cargar el perfil del usuario:', error);
        }
      );
    });
    
  }
 
  

  perfil_menu() {
    if (this.authService.isAuthenticated()) {
      const correoElectronico = this.authService.getCorreoElectronico();
      if (correoElectronico) {
        this.navigateToUserProfile(correoElectronico);
      }
    } else {
      this.router.navigateByUrl('/login');
    }
  }
  private navigateToUserProfile(correoElectronico: string) {
    this.router.navigate(['/perfil', correoElectronico]);
  }
}
