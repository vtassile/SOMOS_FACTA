import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

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
import { UserClasService} from "@shared/services/clasuser.service";
import {TMenuService } from "@shared/services/tmenu.service";


import { CLAVES } from "@shared";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {

  logo_aplicacion = "assets/images/sonriente.jpg";
  titulo_aplicacion = "Somos Facta";
  version_aplicacion="Versión 1.0";

  roles: Rol[];
  userclases: UserClass[];
  tmenus: TMenu[];

  user: SocialUser;

  angForm_2: FormGroup;

  constructor(private fb: FormBuilder,
    private router: Router,
    private _userService: UserService,
    private _sesionService: SesionService,
    private authService: AuthService,
    private _snackBar: MatSnackBar,
    private rolservice: RolService,
    private userclasservice: UserClasService,
    private tmenuservice: TMenuService

  ) {

    this.angForm_2 = this.fb.group({
      s_username: ['', [Validators.required]],
      s_clave: ['', [Validators.required, Validators.minLength(12)]],
      confirmPassword: ['', [this.confirmValidator]],
      s_name: "",
      s_surname: "",
      s_email: ['', [Validators.required, Validators.email]],
      id_face: "",
      id_google: "",
      rol: "",
      clase: "",
      tmenu: "",
      s_imagen:"assets/images/usuario.png"
    });

    this.authService.authState.subscribe(user => {
      this.user = user;
      this.rolservice.get().subscribe((data: Rol[]) => {
        this.roles = data;
        this.userclasservice.get().subscribe((data: UserClass[]) => {
          this.userclases = data;
          this.tmenuservice.get().subscribe((data: TMenu[]) => {
            this.tmenus = data;
            this.angForm_2.get("rol").setValue(this.roles[0]._id);
            this.angForm_2.get("clase").setValue(this.userclases[1]._id);
            this.angForm_2.get("tmenu").setValue(this.tmenus[0]._id);
          });
        });
      });
    });

  }

  ngOnInit() { }


  confirmValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== this.angForm_2.controls.s_clave.value) {
      return { error: true, confirm: true };
    }
    return {};
  };

  onRegister(event: Event) {
    event.preventDefault();
    this.angForm_2.value.s_username = this.angForm_2.value.s_username.toLowerCase();
    this._userService.add(this.angForm_2.value).subscribe(
      response => {
        this.router.navigateByUrl("/auth/login");
      },
      error => {
        var errorMessage = <any>error;
        if (errorMessage != null) {
          this._sesionService.mensaje(errorMessage.error.message);
        }
      }
    );
  }

  Registro_interno() {
    this.angForm_2.value.s_username = this.angForm_2.value.s_username.toLowerCase();
    this._userService.add(this.angForm_2.value).subscribe(
      response => {
        this.router.navigateByUrl("/auth/login");
      },
      error => {
        var errorMessage = <any>error;
        if (errorMessage != null) {
          this._sesionService.mensaje(errorMessage.error.message);
        }
      }
    );
  }



  crear_face(event: Event): void {
    event.preventDefault();
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(x => {
      if (x) {
        // ACA TENEMOS QUE BUSCAR SI YA LA CUENTA DE FACE SU USO
        this.angForm_2.get("s_username").setValue(x.id);
        this.angForm_2.get("s_clave").setValue(x.id);
        this.angForm_2.get("confirmPassword").setValue(x.id);
        this.angForm_2.get("s_name").setValue(x.firstName);
        this.angForm_2.get("s_surname").setValue(x.lastName);
        this.angForm_2.get("s_email").setValue(x.email);
        this.angForm_2.get("id_face").setValue(x.id);
        this.Registro_interno();
      } else {
        this._sesionService.mensaje("No pudiste Iniciar sesión con Facebook");
      }
    });
  }

  crear_google(event: Event): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(x => {
      if (x) {
        this.angForm_2.get("s_username").setValue(x.id);
        this.angForm_2.get("s_clave").setValue(x.id);
        this.angForm_2.get("s_name").setValue(x.firstName);
        this.angForm_2.get("s_surname").setValue(x.lastName);
        this.angForm_2.get("s_email").setValue(x.email);
        this.angForm_2.get("id_google").setValue(x.id);
        this.Registro_interno();
      } else {
        this._sesionService.mensaje("No pudiste Iniciar sesión con Google");
      }

    });
  }


}
