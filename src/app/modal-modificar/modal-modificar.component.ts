import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-modal-modificar',
  templateUrl: './modal-modificar.component.html',
  styleUrls: ['./modal-modificar.component.css']
})
export class ModalModificarComponent {


  resenaData = {
    id_reseña:'',
    descripcion:'',
    calificacion:'',
    estado:'',
    id_solicitud:'',
    created_at:'',
    updated_at:''
  }

  resenaId:number=0;

  username:string='';
  resenasObtenidas: any={};
  constructor(private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService){}


  ngOnInit() {
    this.route.params.subscribe((params)=>{
      this.resenaId = params['id_resena']
      this.username = params['username']
      console.log(this.resenaId);
    })
   this.authService.obtenerResenaEspecifica(this.resenaId).subscribe((data:any)=>{
    this.resenasObtenidas = data;
    console.log(this.resenasObtenidas);
    this.resenaData.id_reseña = this.resenasObtenidas[0].id_resena;
    this.resenaData.descripcion = this.resenasObtenidas[0].descripcion;
    this.resenaData.calificacion = this.resenasObtenidas[0].calificacion;
    this.resenaData.estado = this.resenasObtenidas[0].estado;
    this.resenaData.id_solicitud = this.resenasObtenidas[0].id_solicitud;
    this.resenaData.created_at = this.resenasObtenidas[0].created_at;
    this.resenaData.updated_at = this.resenasObtenidas[0].updated_at;
    
    
   })
    
  }
  goToModificarResena(){
    this.router.navigate([`/perfil/${this.username}/control-reportes/modificar-resena`])
   }
  

   modificarResena(){
    console.log(this.resenaData);
    this.authService.modificarReseña(this.resenaId, this.resenaData).subscribe((response)=>{
      console.log("Reseña modificada con exito", response);
      console.log("Datos modificados", this.resenaData);
      this.router.navigate([`/perfil/${this.username}/control-reportes`])
    },
    (error)=>{
      console.log("Error al modificar la reseña", error);
    });
   }
}
