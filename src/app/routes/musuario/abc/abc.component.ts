
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from "@angular/router";

import { AuthService } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import * as CryptoJS from 'crypto-js';

import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

import { User } from "@shared";
import { Rol } from "@shared";
import { UserClass } from "@shared";
import { TMenu } from "@shared";

import { SesionService } from "@shared/services/sesion.service";
import { UserService } from "@shared/services/user.service";
import { RolService } from "@shared/services/rol.service";
import { UserClasService } from "@shared/services/clasuser.service";
import { TMenuService } from "@shared/services/tmenu.service";

import { CLAVES } from "@shared";

@Component({
  selector: 'app-musuario-abc',
  templateUrl: './abc.component.html',
  styleUrls: ['./abc.component.scss']
})
export class MusuarioAbcComponent implements OnInit {
  
  public title="Usuarios";

  public user: SocialUser;
  public agente: any = {};
  public roles: Rol[];
  public userclases: UserClass[];
  public tmenus: TMenu[];
  public identity;
  public rol;
  public token;
  public permite_edit;
  angForm_2: FormGroup;
  public ancho_imagen=100;
  public alto_imagen=100;
  public calidad_imagen=70;
  public leido=false;

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private _userService: UserService,
    private _sesionService: SesionService,
    private authService: AuthService,
    private _snackBar: MatSnackBar,
    private rolservice: RolService,
    private userclasservice: UserClasService,
    private tmenuservice: TMenuService) {
  }

  ngOnInit() {

    if (localStorage.getItem('isLoggedin')) {
      this.identity = this._sesionService.getIdentity();
       this.rol=parseInt(this.identity.rol.n_nivel);
      this.token = this._sesionService.getToken();
      this.permite_edit = true;
  
      if (this.rol < 3) {
        this.permite_edit = false;
      }
    }

    this.authService.authState.subscribe(user => {
      this.user = user;
    });

    this.angForm_2 = this.fb.group({
      s_username: [{value:"",disabled:true}],
      s_clave_vieja: ['0', [Validators.required]],
      s_clave: ['', [Validators.required, Validators.minLength(12)]],
      confirmPassword: ['', [this.confirmValidator]],
      s_name: "",
      s_surname: "",
      s_email: ['', [Validators.required, Validators.email]],
      id_face: "",
      id_google: "",
      s_fono: "",
      rol: "",
      clase: "",
      tmenu: "",
      s_imagen: "",
      s_mostrar: false
    });

    this.rolservice.get().subscribe((data: Rol[]) => {
      this.roles = data;
      this.userclasservice.get().subscribe((data: UserClass[]) => {
        this.userclases = data;
        this.tmenuservice.get().subscribe((data: TMenu[]) => {
          this.tmenus = data;
        });
      });
    });

    this.route.params.subscribe(params => {
      this._userService.edita(params["id"]).subscribe(res => {
        this.agente = res;
        this.angForm_2.get("s_username").setValue(this.agente.s_username);
        this.angForm_2.get("s_name").setValue(this.agente.s_name);
        this.angForm_2.get("s_surname").setValue(this.agente.s_surname);
        this.angForm_2.get("s_fono").setValue(this.agente.s_fono);
        this.angForm_2.get("s_email").setValue(this.agente.s_email);
        this.angForm_2.get("rol").setValue(this.agente.rol);
        this.angForm_2.get("clase").setValue(this.agente.clase);
        this.angForm_2.get("tmenu").setValue(this.agente.tmenu);
        this.angForm_2.get("id_face").setValue(this.agente.id_face);
        this.angForm_2.get("id_google").setValue(this.agente.id_google);
        this.angForm_2.get("s_imagen").setValue(this.agente.s_imagen);
        this.leido=true;
      });
    });

  }

  confirmValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== this.angForm_2.controls.s_clave.value) {
      return { error: true, confirm: true };
    }
    return {};
    
  };

  update(event: Event) {
    event.preventDefault();
    if(this.angForm_2.invalid && this.angForm_2.value.s_mostrar ){
      this.mensaje("Por Favor reingrese Contraseñas Válidad");
    }else{
    /// aca pedimos cambio de contraseña contra la verificacion de la vieja
    this.route.params.subscribe(params => {
      this._userService
        .update(
          this.angForm_2.value.s_username,
          this.angForm_2.value.s_name,
          this.angForm_2.value.s_surname,
          this.angForm_2.value.s_fono,
          this.angForm_2.value.s_email,
          this.angForm_2.value.clase,
          this.angForm_2.value.rol,
          this.angForm_2.value.tmenu,
          params["id"],
          this.angForm_2.value.id_face,
          this.angForm_2.value.id_google,
          this.angForm_2.value.s_imagen
        )
        .subscribe(res => {
          this.mensaje("Usuario Modificado");
          if (this.angForm_2.value.s_clave_vieja != "" && this.angForm_2.value.mostrar) {
            this._userService
              .resetea2(params["id"], this.angForm_2.value.s_clave_vieja, this.angForm_2.value.s_clave)
              .subscribe(res => {
                this.mensaje("Contraseña Modificada");
              });
          }
          this.router.navigate([""]);
        });
    });

    }

  }

  checked(event: Event) {
    event.preventDefault();
    this.angForm_2.value.mostrar = !this.angForm_2.value.mostrar;
  }

  cambia_valor(recipiente:string,valor: string) {
    this.angForm_2.get(recipiente).setValue(valor);
  }


  signInWithFB(event: Event): void {
    event.preventDefault();
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(x => {
      if (x) {
        this.angForm_2.get("id_face").setValue(x.id);
        this.mensaje("Se ha enlazado tu cuenta de Facebook Satisfactoriamente");
      } else {
        this.mensaje("No pudimos enlazarnos a Facebook");
      }
      this.signOut();
    });
  }

  signInWithGoogle(event: Event): void {
    event.preventDefault();
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(x => {
      if (x) {
        this.angForm_2.get("id_google").setValue(x.id);
        this.mensaje("Se ha enlazado tu cuenta de Google Satisfactoriamente");
      } else {
        this.mensaje("No pudimos enlazarnos a Google");
      }
      this.signOut();
    });
  }

  signOut(): void {
    this.authService.signOut();
  }

  mensaje(message: string) {
    let action = "";
    this._snackBar.open(message, action, {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "bottom"
    });
  }



}
