import { NgModule } from '@angular/core';
import { AuthGuard } from './auth.guard';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PerfilComponent } from './perfil/perfil.component';
import { RegistroComponent } from './registro/registro.component';
import { ControlReportesComponent } from './control-reportes/control-reportes.component';
import { ModalModificarComponent } from './modal-modificar/modal-modificar.component';
const routes: Routes = [
{path:'',component:LoginComponent},
{path:'registro',component:RegistroComponent },
{path:'perfil/:username',component:PerfilComponent, canActivate:[AuthGuard] },
{path: 'perfil/:username/control-reportes',component:ControlReportesComponent, canActivate:[AuthGuard]},
{path: 'perfil/:username/control-reportes/modificar-resena/:id_resena', component: ModalModificarComponent, canActivate:[AuthGuard]}

  
];

NgModule({
  imports: [
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
