// clase con métoddos de ayuda para utilizar en los demás servicios
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { UtilService, StorageService} from '../shared';


// importación de funciones Rx una a una
import 'rxjs/add/observable/throw'


@Injectable()
export class HttpToolsService {


  private static _token: String = '';

  constructor(private utilService: UtilService, private storageService: StorageService) {
   
    HttpToolsService._token = atob(storageService.getToken());
    
  }
  // puesto que los envíos requieren siempre la misma configuración
  configurarCabeceras() {
    let headers = new Headers({
      "token": HttpToolsService._token
    })
    // llamar a este método en cada llamda, equivale a los interceptores de Angular1
    let options = new RequestOptions({ headers: headers })
    return options
  }

  public static _jsonEncode(str){
    return JSON.parse(str);
  }
  // para extraer los datos json de la respuesta http 
  obtenerDatos(response) {
    console.log(response);
    
    // TODO: validar el satusCode y controlar vacíos
    return response.json()
  }

  // tratar errores de comunicación
  tratarErrores(error) {
   // console.log(JSON.stringify(error));
    if (error.status == 401) {
      //console.log("Error de permisos");
      UtilService.goto('seguridad');
      this.storageService.removeBrowser(StorageService.TOKEN);

    }
    else {
      //console.log("Otro Error");
    }
    return Observable.throw(error._body)
  }

  // despues de obtener credenciales  
  guardarCredenciales(session) {
    // guardar credenciales
    //console.log('Guardando token: ' + session.token);
    this.storageService.setToken(session.token);
    HttpToolsService._token = session.token;
    //localStorage.setItem("gim-web-user",btoa(JSON.stringify(session.user)));
    //HttpToolsService._token = token.token
    // ir a la página principal
    //HttpToolsService._router.navigate([''])
    return session
  }

  public static _decode64Url(response) {
    console.log(response);
    console.log(response._body);
    
    let m =atob(response._body);
    console.log(m);
    return m;
  }
   



  public static _borrarToken() {
    sessionStorage.removeItem(StorageService.TOKEN);
    HttpToolsService._token = '';
    
  }
  public static _activo() {
    return HttpToolsService._token != '';
  }
}