import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
/**
 * La libreria RxJS viene desglosada en operaciones
 * Hay que importarlas de forma individual
 */
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch'
/**
 * Importación del servicicio de utilidad
 */
import { HttpToolsService } from '../shared/http-tools.service'
import { UtilService } from '../shared/util.service'


@Injectable()
export class SeguridadService {
  urlBase: string = 'http://api.dime-que.es';
  constructor(
    private http: Http, 
    private httpToolsService: HttpToolsService
    

) {
  
  }

  registrar(credenciales) {
    let ruta = `${this.urlBase}/pub/usuarios`;
    return this.comunicar(credenciales, ruta);
  }

  entrar(credenciales) {
    let ruta = `${this.urlBase}/prv/sesiones`;
    return this.comunicar(credenciales, ruta);
  }

 inSession() {
    let ruta = `${this.urlBase}/prv/in-session`;
    let options = this.httpToolsService.configurarCabeceras()
    return this.http
        .get(ruta,options)
        .map(this.httpToolsService.obtenerDatos)
        .catch(this.httpToolsService.tratarErrores)
 
  }
  enSession(){
    UtilService.goto(['home', '']);
  }

  comunicar(credenciales, ruta) {
    // la llamada de seguridad debería devolvernos credenciales
    // parte de nuestra labor será guardarla para futuros usos
    let body = JSON.stringify(credenciales)
    console.log(body);
    let options = this.httpToolsService.configurarCabeceras()
    return this.http
        .post(ruta,body,options)
        .map(HttpToolsService._decode64Url)
        .map(HttpToolsService._jsonEncode)
        .map(this.httpToolsService.guardarCredenciales)
        .catch(this.httpToolsService.tratarErrores)
  }

  
}

