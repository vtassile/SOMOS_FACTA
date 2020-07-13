import { Component, Output, EventEmitter, Input } from '@angular/core';
import { SesionService } from "@shared/services/sesion.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  public identity;
  public token;
  
  @Input() showToggle = true;
  @Input() showUser = true;
  @Input() showHeader = true;
  @Input() toggleChecked = false;

  @Output() toggleCollapsed = new EventEmitter<void>();

  constructor(private _sesionService: SesionService) {
    if (localStorage.getItem('isLoggedin')) {
      this.identity = this._sesionService.getIdentity();
      this.token = this._sesionService.getToken();
    }
  }

}
