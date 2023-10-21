import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  username: string = '';
  password: string = '';
  constructor(private authService: AuthService,
    private router:Router){

  }

  ngOnInit(){
    if (this.authService.isAuthenticated()) {
      
      this.router.navigate(['/perfil',this.username]);
    }
    
  }

  register() {
    console.log(this.username);
    const userData = {
      username: this.username,
      password: this.password
    };
    console.log(userData);

    this.authService.registerUser(userData).subscribe(
      (response: any) => {
        console.log('Registro exitoso',response);
        this.router.navigate(['/']);
      },
      (error)=>{
        console.log("Error al registrarse:",error);
      }
        
    );
  }

}
