// objetos con utilidades comunes del framework
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';

// importación del componente raíz, definido en esta misma carpeta
import { AppComponent } from './app.component';
// importación de un módulo de funcionalidad
import { MovimientosModule } from './movimientos/movimientos.module'
import { MovimientosComponent } from './movimientos/movimientos.component'
import { ContactoModule } from './contacto/contacto.module';
import { ContactoComponent } from './contacto/contacto.component';
import { HomeComponent } from './home/home.component';
import { SaludoComponent } from './saludo/saludo.component';
import { SeguridadComponent } from './seguridad/seguridad.component';
import { PortalComponent } from './portal/portal.component'

//servicios
import { HttpToolsService } from './shared/http-tools.service';
import { UtilService } from './shared/util.service';
import { SeguridadService } from './seguridad/seguridad.service';
import { StorageService } from './shared/storage.service';

// material design
import { MaterialModule } from '@angular/material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

//importacion de rutas
import { SeguridadRoutes } from './seguridad/seguridad.routes';


// definir las rutas
const routes: Routes = [
  ...SeguridadRoutes,
  {
    path: 'home',
    component: PortalComponent,
    children: [
      { path: '', component: HomeComponent },
    ]
  },{
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

// decorador que define un módulo
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SaludoComponent,
    SeguridadComponent,
    PortalComponent
  ], // cosas declaradas en este módulo
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MovimientosModule, // el módulo de movimientos,
    ContactoModule,
    RouterModule.forRoot(routes),
    MaterialModule.forRoot(),
    NgbModule.forRoot()
  ], // otros módulos que necesitamos para que este funcione
  providers: [
    HttpToolsService,
    SeguridadService,
    UtilService,
    StorageService
  ],  // inyección de servicios comunes para la aplicación
  bootstrap: [AppComponent] // componente raíz para el arranque
})
// los módulos son clases contendoras 
// habitualmente con poco o ningún código
export class AppModule { }
