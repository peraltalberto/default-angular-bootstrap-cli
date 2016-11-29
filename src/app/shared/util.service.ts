import { Injectable } from '@angular/core';
import { Router } from '@angular/router'
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UtilService {


  constructor(private router: Router) {
    UtilService._router = this.router
  }

  private static _router: Router

  public static goto(ruta) {
    UtilService._router.navigate(ruta);
  }
  public static decode64(response) {
    let m = atob(response);
    console.log(m);
    return m;
  }

  public static encode64(msg) {
    return btoa(msg);
  }

}
