import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PerfilComponent } from './perfil/perfil.component';
import { ControlReportesComponent } from './control-reportes/control-reportes.component';
import { RegistroComponent } from './registro/registro.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { featherAirplay } from '@ng-icons/feather-icons';
import { heroUsers, heroStar } from '@ng-icons/heroicons/outline';
import { heroStarSolid } from '@ng-icons/heroicons/solid';
import { NgIconsModule } from '@ng-icons/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModificarComponent } from './modal-modificar/modal-modificar.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PerfilComponent,
    ControlReportesComponent,
    RegistroComponent,
    SidebarComponent,
    ModalModificarComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgIconsModule.withIcons({ featherAirplay, heroUsers, heroStar, heroStarSolid }),
    BrowserAnimationsModule, // Importa BrowserAnimationsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
