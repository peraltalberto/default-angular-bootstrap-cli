import { SeguridadService } from './seguridad.service';
import { Component, OnInit } from '@angular/core';
import { UtilService , StorageService,User,Login} from '../shared';


@Component({
    selector: 'app-seguridad',
    templateUrl: './seguridad.component.html',
    styleUrls: ['./seguridad.component.scss']
})
export class SeguridadComponent implements OnInit {

    usuario:Login = new Login();//:any = { email:'', password:''}
    mensaje = "";
    recuerda: boolean;
    constructor(private seguridadService: SeguridadService, private storageService:StorageService) {
        this.recurdaLogin();
    }

    ngOnInit() {
        this.inSession();
    }
    recurdaLogin() {
        this.recuerda = true;
        if (localStorage.getItem(StorageService.RECORDAR_LOGIN) == 'true') {
            this.recuerda = true;

             this.usuario =this.storageService.getLogin();
            if (this.usuario === null) {
                this.usuario =new Login();
            } 

        } else {
            this.recuerda = false;
        }
    }
    toolgerRecuerda() {
        this.recuerda = !this.recuerda;
       this.storageService.setBrowser(StorageService.RECORDAR_LOGIN, "" + this.recuerda);
    }

    entrarUsuario() {
        this.mensaje = "validando...";
        this.seguridadService
            .registrar(this.usuario)
            .subscribe(
            r => {
                console.log(r);
                if (this.recuerda) {
                     this.storageService.setLogin(this.usuario);
                } else {
                    this.storageService.removeBrowser(StorageService.LOGIN);
                }
                //this.storageService.setToken(r.token);
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
