import { Injectable } from '@angular/core';
import {UtilService, User,Login} from './'

@Injectable()
export class StorageService {

  public static TOKEN: string = "gim-web-st";
  public static USUARIO: string = "gim-web-dpu";
  public static RECORDAR_LOGIN: string = "gim-web-recuerda";
  public static LOGIN: string = "gim-web-ga";

  constructor() { }

  setSession(key, value) {
    sessionStorage.setItem(key, value);
  }
  setBrowser(key, value) {
     localStorage.setItem(key, value);
  }
  removeSession(key) {
    sessionStorage.removeItem(key);
  }
  removeBrowser(key) {
    localStorage.removeItem(key);
  }
  getSession(key) {
    sessionStorage.getItem(key);
  }
  getBrowser(key) {
    return localStorage.getItem(key);
  }


  getToken() : string{
    var tk = this.getBrowser(StorageService.TOKEN);
    var valor = tk=== null ?'':UtilService.decode64(tk);
    return valor;
  }
   setToken(value){
     this.setBrowser(StorageService.TOKEN,UtilService.encode64(value));
  }

 getUser() : User{
    var result = this.getBrowser(StorageService.USUARIO);
    console.log(UtilService.decode64(result));
    var usu = result === null ?new User():JSON.parse(UtilService.decode64(result));
    console.log(usu);
    
    return usu;
  }
  setUser(value){
     this.setBrowser(StorageService.USUARIO,UtilService.encode64(JSON.stringify(value)));
  }
   getLogin() : Login{
    var result = this.getBrowser(StorageService.LOGIN);
    var usu = result === null ?new User():JSON.parse(UtilService.decode64(result));
    return usu;
  }
  setLogin(value){
     this.setBrowser(StorageService.LOGIN,UtilService.encode64(JSON.stringify(value)));
  }
}
