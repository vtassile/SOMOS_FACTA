import { Component, OnInit } from '@angular/core';
import { SesionService } from "@shared/services/sesion.service";


@Component({
  selector: 'app-user',
  template: `
    <button
      mat-button
      class="matero-toolbar-button matero-avatar-button"
      href="javascript:void(0)"
      [matMenuTriggerFor]="menu"
    >    
      <img *ngIf="usuario_imagen!='null'"class="matero-avatar" src="{{usuario_imagen}}" width="32" alt="avatar" />
      <img *ngIf="usuario_imagen=='null'" class="matero-avatar" src="assets/images/usuario_anonimo.jpg" width="32" alt="avatar" />
      <span class="matero-username" fxHide.lt-sm>{{nombre}}</span>
    </button>

    <mat-menu #menu="matMenu">
      <a [routerLink]="['/musuario/abc', identity._id]"  mat-menu-item>
        <mat-icon>account_circle</mat-icon>
        <span>{{ 'user.profile' | translate }}</span>
      </a>
      <a routerLink="/profile/settings" mat-menu-item>
        <mat-icon>settings</mat-icon>
        <span>{{ 'user.settings' | translate }}</span>
      </a>
      <a routerLink="/auth/login" (click)="onLoggedout()" mat-menu-item>
        <mat-icon>exit_to_app</mat-icon>
        <span>{{ 'user.logout' | translate }}</span>
      </a>
    </mat-menu>
  `,
})
export class UserComponent implements OnInit {

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
      this.nombre_apellido = this.identity.s_name + " " + this.identity.s_surname;
      this.mail = this.identity.s_email;
      this.rol = this.identity.rol.n_nivel;
      this.usuario_imagen = this.identity.s_imagen;
    }


  }

  onLoggedout() {
    localStorage.removeItem('isLoggedin');
    localStorage.removeItem('identity');
    localStorage.removeItem('token');
  }


}
