import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
 import * as CryptoJS from 'crypto-js';
// import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
 import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { User } from "@shared";

import { CLAVES } from "@shared";

import { SesionService } from "@shared/services/sesion.service";
import { UserService } from "@shared/services/user.service";



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {

  logo_aplicacion ="assets/images/sonriente.jpg";
  titulo_aplicacion ="Somos Facta";
  version_aplicacion="Versión 1.0";

  angForm: FormGroup;  
  public identity;
  public token;
 // facebook = faFacebook;
 // google = faGoogle;
  user: SocialUser;
  public errorMessage;


  constructor(private fb: FormBuilder, private router: Router,
    private _userService: UserService,
    private _sesionService: SesionService,
    private authService: AuthService,
    private _snackBar: MatSnackBar

    ) {
    this.angForm = this.fb.group({
      s_username: ['', [Validators.required]],
      s_clave: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    if (localStorage.getItem('isLoggedin')) {
   this.identity = this._sesionService.getIdentity();
   this.token = this._sesionService.getToken();
    }
 
    this.authService.authState.subscribe(user => {
      this.user = user;
    });
  }


  public login(event: Event): void {
    event.preventDefault();
    this.angForm.get("s_username").setValue(this.angForm.value.s_username.toLowerCase());

    this._sesionService.signup(this.angForm.value).subscribe(
      response => {
        let identity = JSON.stringify(response.user);
        this.identity = JSON.parse(identity);
        let id_ident = JSON.stringify(response.user._id);
        if (!id_ident) {
          this._sesionService.mensaje("No pudimos identificar el Usuario");
        } else {
          // Crear elemento en el localstorage para tener al usuario en sesion
          let identity_c = CryptoJS.AES.encrypt(identity.trim(), CLAVES.localstore.toString()).toString();
          localStorage.setItem("identity", identity_c);
          // Conseguir el token para enviarse a cada peticion http
          this._sesionService.signup(this.angForm.value, "true").subscribe(
            response => {
              let token = response.token;
              this.token = token;
              if (this.token.length < 1) {
                this._sesionService.mensaje("El token no se ha generado");
              } else {
                // Crear elemento en el localstorage para tener token disponible
                localStorage.setItem("isLoggedin", "true");
                localStorage.setItem("token", token);
                this.sale_login();
              }
            },
            error => {
              var errorMessage = <any>error;
              if (errorMessage != null) {
                this.errorMessage = error;
                this._sesionService.mensaje(this.errorMessage.error.message);
              }
            }
          );
        }
      },
      error => {
        var errorMessage = <any>error;
        if (errorMessage != null) {
          this.errorMessage = error;
          this._sesionService.mensaje(this.errorMessage.error.message);
        }
      }
    );
  }

  signInWithFB(event: Event): void {
    event.preventDefault();
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(x => {
      if (!x) {
        this._sesionService.mensaje("Usuario de Facebook no Registrado");
        this.signOut();
        return;
      }
      var datos = {
        id_face: x.id
      };
      this._sesionService.signup_face(datos).subscribe(
        response => {
          this.signOut();
          let identity = JSON.stringify(response.user);
          this.identity = JSON.parse(identity);
          let id_ident = JSON.stringify(response.user._id);

          if (!id_ident) {
            this._sesionService.mensaje("No se ha identificado al Usuario");
          } else {
            // Crear elemento en el localstorage para tener al usuario en sesion
            let identity_c = CryptoJS.AES.encrypt(identity.trim(), CLAVES.localstore.toString()).toString();
            localStorage.setItem("identity", identity_c);

            // Conseguir el token para enviarse a cada peticion http
            this._sesionService.signup_face(datos, "true").subscribe(
              response => {
                let token = response.token;
                this.token = token;
                if (this.token.length < 1) {
                  this._sesionService.mensaje("El token no se ha generado");
                } else {
                  // Crear elemento en el localstorage para tener token disponible
                  localStorage.setItem("isLoggedin", "true");
                  localStorage.setItem("token", token);
                  this.signOut();
                  this.sale_login();
                }
              },
              error => {
                var errorMessage = <any>error;
                if (errorMessage != null) {
                  this.errorMessage = error;
                  this._sesionService.mensaje(this.errorMessage.error.message);
                  this.signOut();
                }
              }
            );
          }
        },
        error => {
          var errorMessage = <any>error;
          if (errorMessage != null) {
            this.errorMessage = error;
            this._sesionService.mensaje(this.errorMessage.error.message);
            this.signOut();
          }
        }
      );
    });
  }

  signInWithGoogle(event: Event): void {
    event.preventDefault();
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(x => {
      if (!x) {
        this._sesionService.mensaje("Usuario de Google no Registrado");
        this.signOut();
        return;
      }
      var datos = {
        id_google: x.id
      };
      this._sesionService.signup_google(datos).subscribe(
        response => {
          this.signOut();
          let identity = JSON.stringify(response.user);
          this.identity = JSON.parse(identity);
          let id_ident = JSON.stringify(response.user._id);

          if (!id_ident) {
            this._sesionService.mensaje("No pudimos identificar el Usuario");
          } else {
            // Crear elemento en el localstorage para tener al usuario en sesion
            let identity_c = CryptoJS.AES.encrypt(identity.trim(), CLAVES.localstore.toString()).toString();
            localStorage.setItem("identity", identity_c);
            // Conseguir el token para enviarse a cada peticion http
            this._sesionService.signup_google(datos, "true").subscribe(
              response => {
                let token = response.token;
                this.token = token;
                if (this.token.length < 1) {
                  this._sesionService.mensaje("Token no se ha generado");
                } else {
                  // Crear elemento en el localstorage para tener token disponible
                  localStorage.setItem("isLoggedin", "true");
                  localStorage.setItem("token", token);
                  this.signOut();
                  this.sale_login();
                }
              },
              error => {
                var errorMessage = <any>error;
                if (errorMessage != null) {
                  this.errorMessage = error;
                  this._sesionService.mensaje(this.errorMessage.error.message);
                  this.signOut();
                }
              }
            );
          }
        },
        error => {
          var errorMessage = <any>error;
          if (errorMessage != null) {
            this.errorMessage = error;

            this._sesionService.mensaje(this.errorMessage.error.message);
            this.signOut();
          }
        }
      );
    });
  }

  signOut(): void {
    this.authService.signOut();
  }

 
  sale_login(){
 //   window.location.reload(true);
 this.router.navigateByUrl('/');
  }    









}
