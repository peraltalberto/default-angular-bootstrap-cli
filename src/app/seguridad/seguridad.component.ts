import { SeguridadService } from './seguridad.service';
import { Component, OnInit } from '@angular/core';
import { UtilService , StorageService} from '../shared';

@Component({
    selector: 'app-seguridad',
    templateUrl: './seguridad.component.html',
    styleUrls: ['./seguridad.component.scss']
})
export class SeguridadComponent implements OnInit {

    usuario = {};//:any = { email:'', password:''}
    mensaje = "";
    recuerda: boolean;
    constructor(private seguridadService: SeguridadService) {
        this.recurdaLogin();
    }

    ngOnInit() {
        this.inSession();
    }
    recurdaLogin() {
        this.recuerda = true;
        if (localStorage.getItem(StorageService.RECORDAR_LOGIN) == 'true') {
            this.recuerda = true;
            if (localStorage.getItem("gim-web-ga") === null) {
                this.usuario = {};
            } else {
                this.usuario =JSON.parse(atob(localStorage.getItem("gim-web-ga")));
            }
        } else {
            this.recuerda = false;
        }
    }
    toolgerRecuerda() {
        this.recuerda = !this.recuerda;
        localStorage.setItem("gim-web-recuerda", "" + this.recuerda);
    }

    entrarUsuario() {
        this.mensaje = "validando...";
        this.seguridadService
            .registrar(this.usuario)
            .subscribe(
            r => {
                console.log(this.recuerda);
                if (this.recuerda) {
                    localStorage.setItem("gim-web-ga", btoa(JSON.stringify(this.usuario)));
                } else {
                    localStorage.removeItem("gim-web-ga");
                }
                this.seguridadService.enSession();
            },
            e => {
                this.mostrarError(e);
            })
    }

    inSession() {
        this.seguridadService
            .inSession()
            .subscribe(
                r => {
                    this.seguridadService.enSession();
                },
            e => {
                //this.mostrarError(e);
            })
    }

    mostrarError(e) {
        this.mensaje = "ERROR";
        //console.error(e);
    }
}
