// clase con métoddos de ayuda para utilizar en los demás servicios
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { UtilService, StorageService} from '../shared';
// importación de funciones Rx una a una
import 'rxjs/add/observable/throw'


@Injectable()
export class HttpToolsService {

constructor(private utilService: UtilService, public storageService: StorageService) {
   
    HttpToolsService._storage = storageService;
    HttpToolsService._token = this.storageService.getToken();
   
  }
  private static _storage: StorageService;
  private static _token: String = '';
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
    var result = JSON.parse(str);
    console.log(result);
    
    return result;
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
      HttpToolsService._storage.removeBrowser(StorageService.TOKEN);

    }
    else {
      //console.log("Otro Error");
    }
    return Observable.throw(error._body)
  }

  // despues de obtener credenciales  
  guardarCredenciales(session) {
    //console.log(session);
    
    // guardar credenciales
    //console.log('Guardando token: ' + session.token);
    HttpToolsService._token = session.token;
    HttpToolsService._storage.setToken(session.token);
    HttpToolsService._storage.setUser(session.user);
    //localStorage.setItem("gim-web-user",btoa(JSON.stringify(session.user)));
    //HttpToolsService._token = token.token
    // ir a la página principal
    //HttpToolsService._router.navigate([''])
    return session
  }

  public static _decode64Url(response) {
    //console.log(response);
    //console.log(response._body);
    let m =UtilService.decode64(response._body);
    //console.log(m);
    return m;
  }

  public static _borrarToken() {
    HttpToolsService._storage.removeBrowser(StorageService.TOKEN);
    HttpToolsService._token = '';
    
  }
  public static _activo() {
    return HttpToolsService._token != '';
  }
}