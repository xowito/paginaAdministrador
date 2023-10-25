import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { ModalModificarComponent } from '../modal-modificar/modal-modificar.component';
@Component({
  selector: 'app-control-reportes',
  templateUrl: './control-reportes.component.html',
  styleUrls: ['./control-reportes.component.css']
})
export class ControlReportesComponent implements OnInit {
  username:string='';
  resenasPorRevisar:any[]=[];
  calificacion: number = 0;
  starData1!: { enteras: number; fraccion: number; };
  constructor(private authService:AuthService,
    private router: Router,
    private route: ActivatedRoute
    
    ){}

    getStarData(calificacion: number): { enteras: number, fraccion: number } {
      const enteras = Math.floor(calificacion); // Parte entera
      const fraccion = calificacion - enteras; // Parte fraccionaria
      return { enteras, fraccion };
    
    }
    ngOnInit(){
      this.route.params.subscribe((params)=>{
        this.username = params['username'];
      })
      this.authService.obtenerResenaAdmin().subscribe((data:any)=>{
        this.resenasPorRevisar = data;
      })
        
    }

    getStarArray(): number[] {
      return [1, 2, 3, 4, 5];
    }
    getStarIcon(index: number, calificacion: number): string {
      // Determina el nombre del ícono de estrella (star, star-half o star-outline) en función de 'index' y 'promedio'
      if (index <= Math.floor(calificacion)) {
        return 'heroStarSolid'; // Estrella completa
      } else if (index === Math.ceil(calificacion)) {
        return 'star-half'; // Media estrella si el índice es igual al valor entero más cercano del promedio
      } else {
        return 'heroStar'; // Estrella vacía
      }
    }


   
    goToModificarResena(resenaId:number){
      this.router.navigate([`/perfil/${this.username}/control-reportes/modificar-resena/${resenaId}`])
    }
    okButton(resenaId: number) {
      Swal.fire({
        title: 'Seguro que esta reseña cumple los requisitos?',
        timerProgressBar:true,
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: 'Si',
        cancelButtonText: 'No, modificar',
      }).then((result: SweetAlertResult<any>) => {
        if (result.isConfirmed) {
          this.authService.actualizarEstadoResena(resenaId,'Ok').subscribe(
            (data: any) => {
              console.log('Reporte emitido con exito');
              location.reload();
              
            (error: any) => {
              console.error('Error al emitir el reporte:', error);
            }}
          );
          
        } else if (result.dismiss === Swal.DismissReason.cancel) {
         this.goToModificarResena(resenaId);
        }
      });
      
    }
    // showCustomAlert() {
    //   Swal.fire({
    //     title: '¿Qué acción deseas realizar?',
    //     showCloseButton: true,
    //     showCancelButton: true,
    //     confirmButtonText: 'Ok',
    //     cancelButtonText: 'Modificar',
    //   }).then((result: SweetAlertResult<any>) => {
    //     if (result.isConfirmed) {
    //       
    //       //this.authService.realizarAccionOk();
    //       console.log("Ok funcionando");
    //     } else if (result.dismiss === Swal.DismissReason.cancel) {
    //       
    //       //this.router.navigate(['/modificar-reseña']);
    //       console.log("Modificar funcionando");
    //       // this.router.navigate([`/perfil/${this.username}/control-reportes/modificar-resena/${this.resenaId}`])
    //     }
    //   });
    // }


   
  



}
