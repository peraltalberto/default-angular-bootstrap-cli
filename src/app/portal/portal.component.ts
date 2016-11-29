import { Component, OnInit } from '@angular/core';
import { DomAdapter } from '@angular/platform-browser/src/dom/dom_adapter';

import {HttpToolsService} from '../shared'


@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.css']
})
export class PortalComponent implements OnInit {

  constructor(private httpToolsService :HttpToolsService) { }

  ngOnInit() {

  }
  
  cerrarSession(){
      HttpToolsService._borrarToken();
     //console.log(this.isActivo());
      
  }
  isActivo(){
    return HttpToolsService._activo()
  }
}
