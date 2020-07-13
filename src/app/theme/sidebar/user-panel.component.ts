import { Component, OnInit } from '@angular/core';
import { SesionService } from "@shared/services/sesion.service";

@Component({
  selector: 'app-user-panel',
  template: `
    <div class="matero-user-panel" fxLayout="column" fxLayoutAlign="center center">
      <img
        class="matero-user-panel-avatar"
        src="{{usuario_imagen}}"
        alt="avatar"
        width="64"
      />
      <h4 class="matero-user-panel-name">{{nombre_apellido}}</h4>
      <h5 class="matero-user-panel-email">{{mail}}</h5>
      <div class="matero-user-panel-icons">
        <a [routerLink]="['/musuario/abc', identity._id]" mat-icon-button>
          <mat-icon>account_circle</mat-icon>
        </a>
        <a routerLink="/profile/settings" mat-icon-button>
          <mat-icon>settings</mat-icon>
        </a>
        <a routerLink="/auth/login" (click)="onLoggedout()" mat-icon-button>
          <mat-icon>exit_to_app</mat-icon>
        </a>
      </div>
    </div>
  `,
})
export class UserPanelComponent implements OnInit {

  public identity;
  public token;
  public nombre;
  public nombre_apellido;
  public mail;
  public rol;
  public usuario_imagen;

  ngOnInit() { }

  constructor(private _sesionService: SesionService) {

    if (localStorage.getItem('isLoggedin')) {
      this.identity = this._sesionService.getIdentity();
      this.token = this._sesionService.getToken();
      this.nombre = this.identity.s_name; 
      this.nombre_apellido = this.identity.s_name+" "+this.identity.s_surname;
      this.mail=this.identity.s_email;
      this.rol=this.identity.rol.n_nivel;
      this.usuario_imagen=this.identity.s_imagen;      
       }
   
  }

  onLoggedout() {
    localStorage.removeItem('isLoggedin');
    localStorage.removeItem('identity');
    localStorage.removeItem('token');
}

}
