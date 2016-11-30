import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ToolbarComponent } from './toolbar/toolbar.component'


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [FooterComponent, SidebarComponent, ToolbarComponent],
  exports:[FooterComponent,SidebarComponent,ToolbarComponent]
})
export class PortalModule { }
