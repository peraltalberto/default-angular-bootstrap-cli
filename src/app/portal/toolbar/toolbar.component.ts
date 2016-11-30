import { Component, OnInit } from '@angular/core';
import {HttpToolsService} from '../../shared/http-tools.service';
import {UtilService} from '../../shared/util.service';
import { User} from '../../shared/user';
import {StorageService} from '../../shared/storage.service';
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  public usuario : User;

  constructor(private httpToolsService :HttpToolsService, private storageService: StorageService) {
    this.usuario = this.storageService.getUser();
    console.log(this.usuario);
    
   }

  ngOnInit() {
    
    
  }




  isActivo(){
    return HttpToolsService._activo()
  }

  goLogin(){
    UtilService.goto(['login']);
  }

  cerrarSession(){
      HttpToolsService._borrarToken();
  }

}
