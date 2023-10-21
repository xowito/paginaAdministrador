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
  username:string= '';
  datosUsuario: any = {};
  constructor(private route: ActivatedRoute,
    private authService: AuthService,
    private sanitizer: DomSanitizer,
    private router: Router){}

  ngOnInit() {
   this.route.params.subscribe((params)=>{
    this.username = params['username']
   })
    
  }
 
  

  
}
